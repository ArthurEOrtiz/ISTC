using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class CourseController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<CourseController> _logger;

		public CourseController(EducationProgramContext educationProgramContext, ILogger<CourseController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet(Name = "GetCourseById")]
		public async Task<ActionResult<Course>> GetCourseById(int id)
		{
			var course = await _educationProgramContext.Courses.FindAsync(id);

			if (course == null)
			{
				return new StatusCodeResult((int)HttpStatusCode.NotFound);
			}

			return course;
		}

		[HttpPost(Name = "PostCourse")]
		public async Task<ActionResult> PostCourse(Course course)
		{
			try
			{
				//Initialize a new instance of a location model 
				Location location = new();
				// Set some default values if needed 
				location.City = "Boise";
				location.State = "Idaho";
				// add the location instance to the parent course. 
				course.Location = location;

				// Initialize a new instance of a class model 
				Class @class = new();
				// Set some default values for non-nullable properties.
				@class.ScheduleStart = DateTime.Now;
				@class.ScheduleEnd = DateTime.Now;

				// add the single class instance to parent course. 
				course.Classes.Add(@class);

				// add the course to the dB context 
				_educationProgramContext.Courses.Add(course);
				await _educationProgramContext.SaveChangesAsync();

				// Should return a 201 status code. 
				return new CreatedAtActionResult(nameof(GetCourseById), "Course", new { id = course.CourseId }, course);
			}
			catch (DbUpdateException ex)
			{
				_logger.LogError($"Database update error: {ex.Message}\n{ex.InnerException}");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred: {ex.Message}\n{ex.InnerException}");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
