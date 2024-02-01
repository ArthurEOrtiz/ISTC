using ETL.Extract.DataAccess;
using ETL.Services;
using ETL.Transfer.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Diagnostics;
using System.Text.Json;

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
				services.AddTransient<ISTCServiceInterface, ISTCService>();
				services.AddTransient<ExtractServiceInterface, ExtractService>();
				services.AddTransient<TransferServiceInterface, TransferService>();
			})
			.Build();

		if (Debugger.IsAttached) // If you're running this in debug mode.
		{
			using (var scope = host.Services.CreateScope())
			{
				var serviceProvider = scope.ServiceProvider;
				var extractService = serviceProvider.GetRequiredService<ExtractServiceInterface>();

				// Step 1: Display count and list of unique student names 
				var uniqueStudents = extractService.GetUniqueFistAndLastNames();
				int uniqueStudentCount = extractService.CountUniqueFirstAndLastNames();

				Console.WriteLine($"Unique student count: {uniqueStudentCount}");

				foreach (var student in uniqueStudents)
				{
					Console.WriteLine($"Student: {student.FirstName} | {student.LastName}");
				}
				// Stop for user input 
				Console.WriteLine("Press Enter to add data to the Students table...");
				Console.ReadLine();

				// Step 2: When Enter is hit, enter that data into the Students table
				var transferService = serviceProvider.GetRequiredService<TransferServiceInterface>();

				transferService.AddStudentsRange(uniqueStudents);

				Console.WriteLine("Data added to students table.");
				
				// Step 3: Lets pull tblSchoolEnroll and for every unique first and last name,
				// we'll put those rows into a student info page. 


			}
		}
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
