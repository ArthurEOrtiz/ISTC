using Education.Configuration;
using Microsoft.AspNetCore.Connections;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configure app settings using the options pattern, Learn more about the options pattern at https://learn.microsoft.com/en-us/dotnet/core/extensions/options




// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
