using EducationAPI.Configuration;
using EducationAPI.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configure app settings using the options pattern, Learn more about the options pattern at https://learn.microsoft.com/en-us/dotnet/core/extensions/options
var options =
	builder.Configuration.GetSection(nameof(EducationProgramDataBaseOptions))
		.Get<EducationProgramDataBaseOptions>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

ConfigureServices(builder, options.ConnectionString);

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
	app.UseCors(policy =>
		policy.WithOrigins("http://localhost:3000")
					.AllowAnyMethod()
					.AllowAnyHeader());
}

app.UseHttpsRedirection();

app.UseAuthentication();
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