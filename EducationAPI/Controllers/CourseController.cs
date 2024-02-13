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
			var course = await _educationProgramContext.Courses
				.Include(c => c.Classes)
				.FirstOrDefaultAsync(c => c.CourseId ==id);

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
