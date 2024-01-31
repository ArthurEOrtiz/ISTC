using ETL.Extract.DataAccess;
using ETL.Extract.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

class Program
{
	static void Main()
	{
		// Configuration builder
		// That last line builds the configuration. That might change later
		// if this application gets more complex. 
		var builder = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
			.Build();


		// Dependency Injection
		// This is used to configure and register services for dependency injection.
		var services = new ServiceCollection();


		// Setup 
		// Get Connection Strings 
		var connectionStrings = builder.GetSection("ConnectionStrings");
		string transferConnectionString = connectionStrings.GetSection("TransferDataBase").Value;
		string istcConnectionString = connectionStrings.GetSection("ISTCDataBase").Value;

		// Register classes with Direct Injection 
		// Register the Data Access layers with the right connection string 
		services.AddDbContext<ISTCContext>(options =>
			options.UseSqlServer(istcConnectionString)
		);

		//Register the services
		services.AddTransient<ISTCServiceInterface, ISTCService>();

		// Build the service provider 
		var serviceProvider = services.BuildServiceProvider();

		// Retrieve ISTCContext from the service provider 
		var istcContext = serviceProvider.GetRequiredService<ISTCContext>();

		// Retrieve ISTCService from the service provider 
		var istcService = serviceProvider.GetRequiredService<ISTCServiceInterface>();

		// Query and output the first 5 records 
		var firstFiveRecords = istcService.GetFirstFiveRecords();

		foreach( var record in firstFiveRecords )
		{
			Console.WriteLine($"hName {record.HName}");
		}

		
	}
}
