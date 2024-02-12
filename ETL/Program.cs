using ETL.Extract.DataAccess;
using ETL.Interfaces;
using ETL.Services;
using ETL.Transfer.DataAccess;
using ETL.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Diagnostics;

class Program
{
	static void Main()
	{
		var host = new HostBuilder()
			.ConfigureAppConfiguration((context, config) =>
			{
				// Set up configuration sources 
				// Right now this gets the connection strings from the appsettings.json file
				config.SetBasePath(Directory.GetCurrentDirectory())
					.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
			})
			.ConfigureServices((context, services) =>
			{
				// Set up dependency injection
				// This is how we get the connection strings to the data access/ dbContext classes.
				services.AddDbContext<ISTCContext>(options =>
					options.UseSqlServer(context.Configuration.GetConnectionString("ISTCDatabase")));

				services.AddDbContext<TransferContext>(options =>
					options.UseSqlServer(context.Configuration.GetConnectionString("TransferDatabase")));

				// Use Direct Injection to register classes. 
				services.AddTransient<IExtractService, ExtractService>();
				services.AddTransient<ITransferService, TransferService>();
				services.AddTransient<IEnrollStudentService, EnrollStudentService>();
				services.AddTransient<IEnrollInfoService, EnrollInfoService>();
				services.AddTransient<IEnrollContactService, EnrollContactService>();
				services.AddTransient<IEnrollHistoryService, EnrollHistoryService>();
				services.AddTransient<ICourseInfoService, CourseInfoService>();
			})
			.Build();

		if (Debugger.IsAttached) // If you're running this in debug mode.
		{
			Console.WriteLine("Application Started!");
			using var scope = host.Services.CreateScope();
			var serviceProvider = scope.ServiceProvider;
			var transferContext = serviceProvider.GetRequiredService<TransferContext>();
			var extractService = serviceProvider.GetRequiredService<IExtractService>();
			var transferService = serviceProvider.GetRequiredService<ITransferService>();
			var studentService = serviceProvider.GetRequiredService<IEnrollStudentService>();
			var enrollInfoService = serviceProvider.GetRequiredService<IEnrollInfoService>();
			var enrollContactService = serviceProvider.GetRequiredService<IEnrollContactService>();
			var enrollHistoryService = serviceProvider.GetRequiredService<IEnrollHistoryService>();
			var courseService = serviceProvider.GetRequiredService<ICourseInfoService>();
			var processLogger = new ProgressLogger();

			//Step 0: Start with a clean slate when needed. 
			// I'm gonna un-comment and comment this out as I'm developing. 
			Console.WriteLine("Deleting all records in the Transfer database.");
			transferService.DeleteAllRecords(transferContext.EnrollStudents);
			transferService.DeleteAllRecords(transferContext.EnrollInfo);
			transferService.DeleteAllRecords(transferContext.EnrollContacts);
			transferService.DeleteAllRecords(transferContext.EnrollHistory);
			transferService.DeleteAllRecords(transferContext.CourseInfo);


			// Step 1: Get all records from tblSchoolInfo and lower case and trim the records.
			// tblSchoolInfo *should* have all records of every person enrollment history.
			var tblSchoolEnrolls = extractService.GetTblSchoolEnrolls();

			// Let the user know the count of records. 
			Console.WriteLine($"{tblSchoolEnrolls.Count} rows in tblSchoolEnrolls, press enter to lowercase and trim records.");

			// Stop for user input.
			Console.ReadLine();

			var lowerCasedAndTrimmedEnrolls = transferService.LowerCaseAndTrimRecords(tblSchoolEnrolls);
			Console.WriteLine($"{lowerCasedAndTrimmedEnrolls.Count} enrolls trimmed and lowercased.");

			// Step 2: Get all the unique first and last names of tblSchoolEnroll and save them
			// to the EnrollStudent table. 
			var uniqueStudents = studentService.GetUniqueFirstAndLastName(lowerCasedAndTrimmedEnrolls);
			Console.WriteLine($"Press enter to write {uniqueStudents.Count} unique first and last name combinations to the EnrollStudents table...");

			// Stop for user input.
			Console.ReadLine();

			// Save the records.
			/*
			This process can take a moment so I set up a progress logger with exception handling so the
			end user doesn't think something went wrong, and if there is an error, they should be updated with
			relevant information.
			TODO: Have the ability for the user to do something about the error. ie, Cancel, Return, Inspect?
			*/

			transferService.AddRecordsRange(uniqueStudents, processLogger.RecordsProcessed);

			// Step 3: Lets take tblSchoolEnroll table and create a version of it with the the first middle and
			// last names removed and replaced with the student id value. Then from here we'll process the data
			// further. We'll call this EnrollInfo. 
			var enrollStudents = studentService.GetAllEnrollStudents();
			var studentsToEnrollInfo = enrollInfoService.tblSchoolEnrollToEnrollInfo(lowerCasedAndTrimmedEnrolls, enrollStudents);

			Console.WriteLine($"Press enter to write {studentsToEnrollInfo.Count} records to the EnrollInfo Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// Save the records
			transferService.AddRecordsRange(studentsToEnrollInfo, processLogger.RecordsProcessed);

			// Step 4: Now lets find all the unique Contact information for each user. 

			// User will have many contact info rows, I think this is because every time the user signs up 
			// for a class, they have to type everything in again, allowing for so many anomalies. 

			var enrollInfoRecords = enrollInfoService.GetAllEnrollInfo();
			var uniqueEnrollContact = enrollContactService.GetUniqueContacts(enrollInfoRecords);

			Console.WriteLine($"Press enter to write {uniqueEnrollContact.Count} records to the EnrollContacts Table, this could take a moment...");

			// Stop for user input
			Console.ReadLine();

			// Save the records
			transferService.AddRecordsRange(uniqueEnrollContact, processLogger.RecordsProcessed);

			// Step 5: Separate the columns affiliated with course Identification. 

			/* Im currently working under the assumption that courses can be identified with DateSchool, 
			 * SchoolType seq and the columns C01 through C40. Now im also assuming that if have a row with say 
			 * C23 being true ten then they took a course with a cSeq of 23. The following will transform C01-C40
			 * into cSeq number. If C01-C40 are all false, it will return a null. 
			 */
			var enrollHistory = enrollHistoryService.EnrollInfoToEnrollHistory(enrollInfoRecords);

			Console.WriteLine($"Press enter to write {enrollHistory.Count} records to the EnrollHistory Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// Save the records
			transferService.AddRecordsRange(enrollHistory, processLogger.RecordsProcessed);

			// Step 6: Import Courses and prepare the data.

			/*
			 * So far in my observation, there is 16575 instances of students enrolled in courses, however, 
			 * In tblSchoolHistory there is 24769 records of students completing courses. Also, SchoolType can be
			 * 'r' for regional 's' for summer, and 'w' for winter. An anomaly in tblSchoolCourses, there are 4
			 * rows of '1'. Also, the way tables are joined in the ColdFusion application, it changes the values
			 * oc sSeq/seq can change in a way i might not understand or unpredictable. I'll have to import the 
			 * rest of the tables lower case and trim them, and try to emulate what the previous application 
			 * did. 
			 */

			// First, lets get tblSchoolCourse data in here and lowercase and trim it. 
			var tblSchoolCourses = extractService.GetTblSchoolCourse();
			Console.WriteLine($"{tblSchoolCourses.Count} rows in tblSchoolCourses, press enter to lowercase and trim records.");

			// Stop for user input
			Console.ReadLine();

			var tblSchoolCoursesLowerCasedAndTrimmed = transferService.LowerCaseAndTrimRecords(tblSchoolCourses);
			Console.WriteLine($"{tblSchoolCoursesLowerCasedAndTrimmed.Count} records trimmed and lowercased!");

			// Second, add that to a table in the Transfer database for further processing. 
			Console.WriteLine($"Press enter to write {tblSchoolCoursesLowerCasedAndTrimmed.Count} records to the CourseInfo Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// Convert that object so AddRecordsRange knows where to put that information.
			var CourseInfo = courseService.tblSchoolCourseToCourseInfo(tblSchoolCoursesLowerCasedAndTrimmed);

			// Save the records
			transferService.AddRecordsRange(CourseInfo, processLogger.RecordsProcessed);

			

			//Console.WriteLine("**** NEW LOGIC ****");



			Console.WriteLine("Success!");
		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
