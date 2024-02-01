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
					config.SetBasePath(Directory.GetCurrentDirectory())
										.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
				})
				.ConfigureServices((context, services) =>
				{
					services.AddDbContext<ISTCContext>(options =>
									options.UseSqlServer(context.Configuration.GetConnectionString("ISTCDatabase")));

					services.AddDbContext<TransferContext>(options =>
									options.UseSqlServer(context.Configuration.GetConnectionString("TransferDatabase")));

					services.AddTransient<ISTCServiceInterface, ISTCService>();
					services.AddTransient<ExtractServiceInterface, ExtractService>();
				})
				.Build();

		if (Debugger.IsAttached) // If you're running this in debug mode.
		{
			using (var scope = host.Services.CreateScope())
			{
				var serviceProvider = scope.ServiceProvider;
				var istcContext = serviceProvider.GetRequiredService<ISTCContext>();
				var transferContext = serviceProvider.GetRequiredService<TransferContext>();
				var extractService = serviceProvider.GetRequiredService<ExtractServiceInterface>();

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
		else
		{
			// this is when you run the console app in something other then debug mode 
		}
	}
}
