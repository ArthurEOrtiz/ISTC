﻿using ETL.Extract.DataAccess;
using ETL.Services;
using ETL.Transfer.DataAccess;
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
			using var scope = host.Services.CreateScope();
			var serviceProvider = scope.ServiceProvider;
			var extractService = serviceProvider.GetRequiredService<IExtractServices>();
			var transferService = serviceProvider.GetRequiredService<ITransferService>();

			//Step 0: Lets make sure we start with a clean slate.
			// I'm gonna un-comment and comment this out as I'm developing. 
			//transferService.DeleteAllStudents();

			// Step 1: Display count and list of unique student names 
			int uniqueStudentCount = extractService.CountUniqueFirstAndLastNames();
			var studentEnrolls = extractService.GetTblSchoolEnrolls();
			var uniqueStudents = transferService.GetUniqueFirstAndLastName(studentEnrolls);

			foreach (var student in uniqueStudents)
			{
				Console.WriteLine($"Student: {student.FirstName} | {student.LastName}");
			}

			Console.WriteLine($"Unique student count: {uniqueStudentCount}");
			// Stop for user input 
			Console.WriteLine("Press Enter to add data to the Students table...");
			Console.ReadLine();

			// Step 2: When Enter is hit, enter that data into the Students table
			transferService.AddStudentsRange(uniqueStudents);

			Console.WriteLine("Data added to students table.");

			// Step 3: For every unique first and last name that we put into student,
			// we'll put those rows into a student info page. 

		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
