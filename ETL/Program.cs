using ETL.Configuration;
using ETL.Extract.DataAccess;
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

		// Send that connection string to right data access class
		// Remember this is using direct injection. 
		services.AddDbContext<ISTCContext>(options =>
			options.UseSqlServer(istcConnectionString)
		);

		// Build the service provider 
		var serviceProvider = services.BuildServiceProvider();

		// Retrieve ISTCContext from the service provider 
		var istcContext = serviceProvider.GetRequiredService<ISTCContext>();

		// Query and output the first 5 records 
		var firstFiveRecords = istcContext.TblSchoolHistories.Take(5).ToList();

		foreach( var record in firstFiveRecords )
		{
			Console.WriteLine($"hName: {record.HName}");
		}

		
	}
}
