using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ClassController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<ClassController> _logger;

		public ClassController(EducationProgramContext educationProgramContext, ILogger<ClassController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetClassById")]
		public async Task<ActionResult<Class>> GetClassById(int id)
		{
			try
			{
				var @class = await _educationProgramContext.Classes
					.FirstOrDefaultAsync(c => c.ClassId == id);

				if (@class != null)
				{
					return @class;
				}
				else
				{
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetClassById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPost("EditClassById")]
		public async Task<ActionResult> EditCourseById(int id, DateTime newScheduleStart, DateTime newScheduleStop)
		{
			try
			{
				var existingClass = await _educationProgramContext.Classes
					.FirstOrDefaultAsync(c => c.ClassId == id);

				if (existingClass == null)
				{
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				existingClass.ScheduleStart = newScheduleStart;
				existingClass.ScheduleEnd = newScheduleStop;

				_educationProgramContext.Update(existingClass);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("EditClassById({Id},{newStartDate},{newEndDate})", id, newScheduleStart, newScheduleStop);
				return new StatusCodeResult((int)HttpStatusCode.OK);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "EditClassById({Id}, {newStartDate}, {newEndDate})", id, newScheduleStart, newScheduleStop);
				return new StatusCodeResult((int)HttpStatusCode.NotModified);
			}
		}


	}
}
