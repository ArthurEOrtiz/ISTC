﻿using ETL.Extract.DataAccess;
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

			////Step 0: Start with a clean slate when needed. 
			//// I'm gonna un-comment and comment this out as I'm developing. 
			//Console.WriteLine("Deleting all records in the Transfer database.");
			//transferService.DeleteAllRecords(transferContext.Students);
			//transferService.DeleteAllRecords(transferContext.StudentInfo);
			//transferService.DeleteAllRecords(transferContext.ContactInfo);
			//transferService.DeleteAllRecords(transferContext.CourseInfo);
			//transferService.DeleteAllRecords(transferContext.CourseHistory);
			//transferService.DeleteAllRecords(transferContext.StudentHistory);
		

			//// Step 1: Get all records from tblSchoolInfo and lower case and trim the records.
			//// tblSchoolInfo *should* have all records of every person enrollment history.
			//var tblSchoolEnrolls = extractService.GetTblSchoolEnrolls();

			//// Let the user know the count of records. 
			//Console.WriteLine($"{tblSchoolEnrolls.Count} rows in tblSchoolEnrolls, press enter to lowercase and trim records.");

			//// Stop for user input.
			//Console.ReadLine();

			//var lowerCasedAndTrimmedEnrolls = transferService.LowerCaseAndTrimRecords(tblSchoolEnrolls);
			//Console.WriteLine($"{lowerCasedAndTrimmedEnrolls.Count} enrolls trimmed and lowercased.");

			//// Step 2: Get all the unique first and last names of tblSchoolEnroll and save them
			//// to the Student table. 
			//var uniqueStudents = studentService.GetUniqueFirstAndLastName(lowerCasedAndTrimmedEnrolls);
			//Console.WriteLine($"Press enter to write {uniqueStudents.Count} unique first and last name combinations to the Students table...");

			//// Stop for user input.
			//Console.ReadLine();

			//// Save the records.
			///*
			//	This process can take a moment so I set up a progress logger with exception handling so the
			//	end user doesn't think something went wrong, and if there is an error, they should be updated with
			//	relevant information.
			//	TODO: Have the ability for the user to do something about the error. ie, Cancel, Return, Inspect?
			//*/

			//transferService.AddRecordsRange(uniqueStudents, processLogger.RecordsProcessed);

			//// Step 3: Take the records from tblSchoolEnroll and create a new table in the transfer database, 
			//// called SchoolInfo, that has all the rows from tblSchoolEnroll but with the first and last names
			//// replaced with a foreign key to the Student table. 
			//var studentEnrollToStudentInfo = studentService.StudentToStudentInfo(lowerCasedAndTrimmedEnrolls);
			//Console.WriteLine($"Press enter to write {studentEnrollToStudentInfo.Count} records to the StudentInfo Table, this could take a moment...");

			//// Stop for user input 
			//Console.ReadLine();

			//// Save the records
			//transferService.AddRecordsRange(studentEnrollToStudentInfo, processLogger.RecordsProcessed);
		
			//// Step 4: Now lets find all the unique Contact information for each user. 

			//// User will have many contact info rows, I think this is because every time the user signs up 
			//// for a class, they have to type everything in again, allowing for so many anomalies. 
			
			//var studentInfoRecords = studentService.GetAllStudentInfo();
			//var uniqueContactInfo = studentService.GetUniqueContactInfo(studentInfoRecords);

			//Console.WriteLine($"Press enter to write {uniqueContactInfo.Count} records to the ContactInfo Table, this could take a moment...");

			//// Stop for user input
			//Console.ReadLine();

			//// Save the records
			//transferService.AddRecordsRange(uniqueContactInfo, processLogger.RecordsProcessed);

			//// Step 5: Now let find all the unique course history for each user
			//// the way this is tracked, *I think*,  is with DateRegister, DateSchool, SchoolType,
			//// Seq, C01-C40 Columns. 
			//var courseHistory = studentService.GetUniqueCourseHistory(studentInfoRecords);

			//Console.WriteLine($"Press enter to write {courseHistory.Count} records to the CourseHistory Table, this could take a moment...");

			//// Stop for user input 
			//Console.ReadLine();

			//// Save the records
			//transferService.AddRecordsRange(courseHistory, processLogger.RecordsProcessed);

			//// Step 6: Now I need to find a way to link the course history table with 
			//// the list of course data (tblSchoolCourses) from the ISTC data base. 

			///*
			//	The way that the data is slapped together I might have to break
			//	up the logic for school types, to make it more manageable. A school
			//	type can be R for regional S for summer, W for winter, and there is 4
			//	rows of 1. I don't know what 1 is all about, so we'll treat that as an anomaly.
			//*/

			//// First, lets get tblSchoolEnroll data in here and lowercase and trim it. 
			
			//var tblSchoolCourses = extractService.GetTblSchoolCourse();
			//Console.WriteLine($"{tblSchoolCourses.Count} rows in tblSchoolCourses, press enter to lowercase and trim records.");

			//// Stop for user input
			//Console.ReadLine();

			//var tblSchoolCoursesLowerCasedAndTrimmed = transferService.LowerCaseAndTrimRecords(tblSchoolCourses);
			//Console.WriteLine($"{tblSchoolCoursesLowerCasedAndTrimmed.Count} records trimmed and lowercased!");

			//// Second, add that to a table in the Transfer database for further processing. 
			//Console.WriteLine($"Press enter to write {tblSchoolCoursesLowerCasedAndTrimmed.Count} records to the CourseInfo Table, this could take a moment...");

			//// Stop for user input 
			//Console.ReadLine();

			//// Convert that object so AddRecordsRange knows where to put that information.
			//var CourseInfo = courseService.tblSchoolCourseToCourseInfo(tblSchoolCoursesLowerCasedAndTrimmed);

			//// Save the records
			//transferService.AddRecordsRange(CourseInfo, processLogger.RecordsProcessed);

			///*
			//	I have observed that cDateSchool, cSchoolType, cSSeq, and cSeq, are used to identify the course. 
			//	So far as I can tell it corresponds with tblSchoolEnrolls DateSchool, SchoolType, Seq, and 
			//	c01 - c40. cSeq, corresponds with c01-c40, if c05 is true, then, I THINK, that means cSeq = 5.
			//	I've noted that this relationship might not always be true, due the lack of any meaningful data
			//	validation.
			//*/
	
			//// So then lets make a method to to build a query to change c01-40 into a cSeq number. 

			//// courseHistory in initialized at line 120.
			//var studentHistory = studentService.CourseHistoryToStudentHistory(courseHistory);

			//// Then lets put that in its own table. We might refactor this to happen sooner, and bypassing 
			//// the need for a courseHistory table.
			//Console.WriteLine($"Press enter to write {studentHistory.Count} records to to the StudentHistory Table, this could take a moment...");

			//// Stop for user input 
			//Console.ReadLine();

			//// Save the records 
			//transferService.AddRecordsRange(studentHistory, processLogger.RecordsProcessed);

			/*
				So now I can link Student history with CourseInfo. But there are many anomalies. When 
				SchoolType = s and CSeq is null(24 rows), I cannot establish which summer course the student took. 
				And it should be known that if SchoolType = r and CSeq is null, then I think the Seq value should
				be used as the Cseq, but definitely not in all cases. Also the value of CSSeq in tblSchoolCourses 
				can be between 1-27 while the seq of tblSchoolEnroll, tblSchoolInfo only goes up to 4. This might have something to do with the first anomaly. 
			*/

			Console.WriteLine("**** NEW LOGIC ****");

			// So I'm just going to focus on SchoolType = 'r' for now, since that seams to have the most
			// manageable anomaly. This should be about 4910 rows 
			var regionalStudentHistory = studentService.GetAllStudentHistoryBySchoolType("r");

			// Then get all the CSchoolType = 'r' from  CourseInfo, this should be 326 rows. 
			var regionalCourses = courseService.GetAllCoursesBySchoolType("r");

			// For now, I'm ignoring the Student History rows where SchoolType = 'r' and CSeq is null. That
			// makes up for 56 rows. So with those excluded this should be 4854 rows. At the moment this returns 
			// 4826, so I have to account for 26 rows. I've tried two separate methods, one using linq and another
			// that just uses for each loops, and both create the same results and no difference in performance
			// was detected.
			var regionalHistoryCourse = studentService.CreateRegionalStudentHistory(regionalStudentHistory, regionalCourses);
			/*
			 
			So lets just check if we're mostly right. Ol' Diane Abegglen is right so far. It caught her 2 
			regional courses. Lets try Student ID 36, alexa allen, shes not in tblSchoolHistory, 
			
			Kaytlynn Bardan (student id 155) according to my methods has been to 6 regional courses, but they
			way Gleen records it in tblSchoolHistory she's has been to at least 3 regional course, but I can
			say for certain because Glenn's stupid fucking database has so many fucking nulls everywhere. Oh by
			the way there's an anomaly with her because she entered her name in as Katie Bardan(student_ID 154)
			once. Further evidence of glenns bdumb fucking logic is that in Kaytlynn Bardan's one regional
			class, in tblSchoolEnroll its "property tax assistance programs (ptr) training" with credit hours
			set to 0 and in tblSchoolHistory its "Tax Commission: Property Tax Assistance Programs Training" and 
			she has 7 hours of credit from it. Fuck you Glenn. Fuck you so much. Judging from his ColdFusion 
			application, email is sometimes used as a key. So I might have to try a different approach using	
			email. 

			*/


			Console.WriteLine("ETL Complete!");
		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
