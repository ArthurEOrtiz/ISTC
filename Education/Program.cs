using Education.Configuration;
using Education.Models;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configure app settings using the options pattern, Learn more about the options pattern at https://learn.microsoft.com/en-us/dotnet/core/extensions/options

var options =
	builder.Configuration.GetSection(nameof(EducationProgramDataBaseOptions))
		.Get<EducationProgramDataBaseOptions>();

string connectionString = options.ConnectionString;

ConfigureServices(builder, connectionString);

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

static void ConfigureServices(WebApplicationBuilder builder, string connectionString)
{
	// Add services to the container.
	builder.Services.AddControllers();

	// Configure the DbContext with the connection string 
	builder.Services.AddDbContext<EducationProgramContext>(options =>
		options.UseSqlServer(connectionString));

	// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();
}