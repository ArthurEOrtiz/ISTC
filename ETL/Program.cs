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
				services.AddTransient<IStudentService, StudentService>();
				services.AddTransient<ICourseService, CourseService>();
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
			var studentService = serviceProvider.GetRequiredService<IStudentService>();
			var courseService = serviceProvider.GetRequiredService<ICourseService>();
			var processLogger = new ProgressLogger();

			//Step 0: Start with a clean slate when needed. 
			// I'm gonna un-comment and comment this out as I'm developing. 
			Console.WriteLine("Deleting all records in the Transfer database.");
			transferService.DeleteAllRecords(transferContext.Students);
			transferService.DeleteAllRecords(transferContext.StudentInfo);
			transferService.DeleteAllRecords(transferContext.ContactInfo);
			transferService.DeleteAllRecords(transferContext.CourseHistory);
			transferService.DeleteAllRecords(transferContext.StudentHistory);

			// Step 1: Get all records from tblSchoolInfo and lower case and trim the records.
			// tblSchoolInfo *should* have all records of every person enrollment history.
			// The row count of my current tblSchoolEnroll is 11290
			var tblSchoolEnrolls = extractService.GetTblSchoolEnrolls();

			// Let the user know the count of records. 
			Console.WriteLine($"{tblSchoolEnrolls.Count} rows in tblSchoolEnrolls, press enter to lowercase and trim records.");

			// Stop for user input.
			Console.ReadLine();

			var lowerCasedAndTrimmedEnrolls = transferService.LowerCaseAndTrimRecords(tblSchoolEnrolls);
			Console.WriteLine($"{lowerCasedAndTrimmedEnrolls.Count} enrolls trimmed and lowercased.");

			// Step 2: Get all the unique first and last names of tblSchoolEnroll and save them
			// to the Student table. 
			// This should be 3286 records. 
			var uniqueStudents = studentService.GetUniqueFirstAndLastName(lowerCasedAndTrimmedEnrolls);
			Console.WriteLine($"Press enter to write {uniqueStudents.Count} unique first and last name combinations to the Students table...");

			// Stop for user input.
			Console.ReadLine();

			// Save the records.
			transferService.AddRecordsRange(uniqueStudents, processLogger.RecordsProcessed);

			// Step 3: Take the records from tblSchoolEnroll and create a new table in the transfer database, 
			// called SchoolInfo, that has all the rows from tblSchoolEnroll but with the first and last names
			// replaced with a foreign key to the Student table. 
			var studentEnrollToStudentInfo = studentService.StudentToStudentInfo(lowerCasedAndTrimmedEnrolls);
			Console.WriteLine($"Press enter to write {studentEnrollToStudentInfo.Count} records to the StudentInfo Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// This process does take a moment so I set up a progress logger so the
			// end user doesn't think something went wrong. 
			transferService.AddRecordsRange(studentEnrollToStudentInfo, processLogger.RecordsProcessed);

			// Step 4: Now lets find all the unique Contact information for each user. 
			// User will have many contact info rows, 
			// if a user got married or god forbid changed their email, or typed it different
			// it creates a unique instance of that.
			var studentInfoRecords = studentService.GetAllStudentInfo();
			var uniqueContactInfo = studentService.GetUniqueContactInfo(studentInfoRecords);

			Console.WriteLine($"Press enter to write {uniqueContactInfo.Count} records to the ContactInfo Table, this could take a moment...");

			// Stop for user input
			Console.ReadLine();

			// Save the records
			transferService.AddRecordsRange(uniqueContactInfo, processLogger.RecordsProcessed);

			// Step 5: Now let find all the unique course history for each user
			// the way this is tracked, *I think*,  is with DateRegister, DateSchool, SchoolType,
			// Seq, C01-C40 Columns. 
			var courseHistory = studentService.GetUniqueCourseHistory(studentInfoRecords);

			Console.WriteLine($"Press enter to write {courseHistory.Count} records to the CourseHistory Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// Save the records
			transferService.AddRecordsRange(courseHistory, processLogger.RecordsProcessed);

			// Step 6: Now I need to find a way to link the course history table with 
			// the list of course data (tblSchoolCourses) from the ISTC data base. 

			// The way that the data is slapped together I might have to break
			// up the logic for school types, to make it more manageable. A school
			// type can be R for regional S for summer, W for winter, and there is 4
			// rows of 1. I don't know what 1 is all about, so we'll treat that as an anomaly.

			// First lets get tblSchoolEnroll data in here and lowercase and trim it. 
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

			// Let convert that object so AddRecordsRange knows where to put that information.
			var CourseInfo = courseService.tblSchoolCourseToCourseInfo(tblSchoolCoursesLowerCasedAndTrimmed);

			// Save it 
			transferService.AddRecordsRange(CourseInfo, processLogger.RecordsProcessed);

			// I have observed that cDateSchool, cSchoolType, cSseq, and cSeq, are used to identify the course. 
			// So far as I can tell it corresponds with tblSchoolEnrolls DateSchool, SchoolType, Seq, and 
			// c01 - c40. cSeq, corresponds with c01-c40, if c05 is true, then, I THINK, that means cSeq = 5.
			// I've noted that this relationship might not always be true for other school types, probably due
			// the lack of any meaningful data validation. Let see if I can make a way to to build a query to
			// change c01-40 into a cSeq number. 

			// courseHistory in initialized at line 120.
			//var courseHistory = studentService.GetAllCourseHistory();
			var studentHistory = studentService.CourseHistoryToStudentHistory(courseHistory);

			
			transferService.AddRecordsRange(studentHistory, processLogger.RecordsProcessed);


		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
