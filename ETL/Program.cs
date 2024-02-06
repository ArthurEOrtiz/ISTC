using ETL.Extract.DataAccess;
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
				services.AddTransient<IExtractServices, ExtractService>();
				services.AddTransient<ITransferService, TransferService>();
			})
			.Build();

		if (Debugger.IsAttached) // If you're running this in debug mode.
		{
			Console.WriteLine("Application Started!");
			using var scope = host.Services.CreateScope();
			var serviceProvider = scope.ServiceProvider;
			var extractService = serviceProvider.GetRequiredService<IExtractServices>();
			var transferService = serviceProvider.GetRequiredService<ITransferService>();
			var processLogger = new ProgressLogger();

			//Step 0: Start with a clean slate when needed. 
			// I'm gonna un-comment and comment this out as I'm developing. 
			transferService.DeleteAllStudents();
			transferService.DeleteAllStudentInfo();
			transferService.DeleteAllContactInfo();
			transferService.DeleteAllCourseHistory();

			// Step 1: Get all records from tblSchoolInfo and lower case and trim the records.
			// tblSchoolInfo *should* have all records of every person enrollment history.
			// The row count of my current tblSchoolEnroll is 11290
			var enrolls = extractService.GetTblSchoolEnrolls();

			// Let the user know the count of records. 
			Console.WriteLine($"{enrolls.Count} rows in tblSchoolInfo, press enter to lower case and trim records.");
			
			// Stop for user input.
			Console.ReadLine();
 
			var lowerCasedAndTrimmedEnrolls = transferService.LowerCaseAndTrimRecords(enrolls);
			Console.WriteLine($"{lowerCasedAndTrimmedEnrolls.Count} enrolls trimmed and lowercased.");

			// Step 2: Get all the unique first and last names of tblSchoolEnroll and save them
			// to the Student table. 
			// This should be 3286 records. 
			var uniqueStudents = transferService.GetUniqueFirstAndLastName(lowerCasedAndTrimmedEnrolls);
			Console.WriteLine($"Press Enter to write {uniqueStudents.Count} unique first and last name combinations to the Students table...");

			// Stop for user input.
			Console.ReadLine();

			// Save the records.
			transferService.AddStudentsRange(uniqueStudents);

			// Step 3: Take the records from tblSchoolEnroll and create a new table in the transfer database, 
			// called SchoolInfo, that has all the rows from tblSchoolEnroll but with the first and last names
			// replaced with a foreign key to the Student table. 
			var studentEnrollToStudentInfo = transferService.StudentToStudentInfo(lowerCasedAndTrimmedEnrolls);
			Console.WriteLine($"Press Enter to write {studentEnrollToStudentInfo.Count} records to the StudentInfo Table, this could take a moment...");

			// Stop for user input 
			Console.ReadLine();

			// This process does take a moment so I set up a progress logger so the
			// end user doesn't think something went wrong. 
			transferService.AddStudentInfoRange(studentEnrollToStudentInfo, processLogger.RecordsProcessed);

			// Step 4: Now lets find all the unique Contact information for each user. 
			// User will have many contact info rows, 
			// if a user got married or god forbid changed their email, or typed it different
			// it creates a unique instance of that.
			var studentInfoRecords = transferService.GetAllStudentInfo();
			var uniqueContactInfo = transferService.GetUniqueContactInfo(studentInfoRecords);
			
			Console.WriteLine($"Press Enter to write {uniqueContactInfo.Count} records to the ContactInfo Table, this could take a moment...");
			// Stop for user input
			Console.ReadLine();
			
			// Save the records
			transferService.AddContactInfoRange(uniqueContactInfo);

			// Step 5: Now let find all the unique course history for each user
			// the way this is tracked, *I think*,  is with DateRegister, DateSchool, SchoolType,
			// Seq, C01-C40 Columns. 
			var uniqueCourses = transferService.GetUniqueCourseHistory(studentInfoRecords);

			Console.WriteLine($"Press Enter to write {uniqueCourses.Count} records to the CourseHistory Table, this could take a moment...");
			// Stop for user input 
			Console.ReadLine();	

			// Save the records
			transferService.AddCourseHistoryRange(uniqueCourses);

			// Step 6: Now I need to find a way to link the course history table with 
			// the list of course data from the ISTC data base. 

			// The way that the data is slapped together I might have to break
			// up the logic for school type. A school type can be R for regional
			// S for summer, W for winter, and there is 4 rows of 1. I don't know what 1
			// is all about. 

			// First lets get tblSchoolEnroll data in here and lower case and trim it. 
			//var tblSchoolCourse = extractService.GetTblSchoolCourse();
			//var tblSchoolCoursesLowerCasedAndTrimmed = transferService.LowerCaseAndTrimRecords(tblSchoolCourse);

			// Now I'm just gonna worry about school type 'r'



		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
