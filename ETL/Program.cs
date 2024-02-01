using ETL.Extract.DataAccess;
using ETL.Services;
using ETL.Transfer.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

class Program
{
	static void Main()
	{
		// Configuration builder
		IConfigurationBuilder builder = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


		IConfiguration configuration = builder.Build();

		// Dependency Injection
		// This is used to configure and register services for dependency injection.
		var services = new ServiceCollection();

		// Setup
		// Register classes with Direct Injection 
		services.AddDbContext<ISTCContext>(options =>
			options.UseSqlServer(configuration.GetConnectionString("ISTCDatabase")));

		services.AddDbContext<TransferContext>(options =>
			options.UseSqlServer(configuration.GetConnectionString("TransferDatabase")));

		//Register the services
		services.AddTransient<ISTCServiceInterface, ISTCService>();
		services.AddTransient<ExtractServiceInterface, ExtractService>();

		// Build the service provider 
		var serviceProvider = services.BuildServiceProvider();

		// Retrieve from the service provider 
		var istcContext = serviceProvider.GetRequiredService<ISTCContext>();
		var transferContext = serviceProvider.GetRequiredService<TransferContext>();
		//var istcService = serviceProvider.GetRequiredService<ISTCServiceInterface>();
		var extractService = serviceProvider.GetRequiredService<ExtractServiceInterface>();

		// Query and output the first 5 records 
		//var firstFiveRecords = istcService.GetFirstFiveRecords();

		//foreach( var record in firstFiveRecords )
		//{
		//	Console.WriteLine($"hName {record.HName}");
		//}

		var uniqueStudents = extractService.GetUniqueFistAndLastNames();
		int uniqueStudentCount = extractService.CountUniqueFirstAndLastNames();
		var jsonResult = JsonSerializer.Serialize(uniqueStudents, new JsonSerializerOptions
		{
			WriteIndented = true,
		});

		Console.WriteLine(jsonResult);
		Console.WriteLine(uniqueStudentCount);
		
	}
}
