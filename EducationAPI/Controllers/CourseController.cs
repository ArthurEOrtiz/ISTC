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

		[HttpGet("GetAllCoursesWithClasses")]
		public async Task<ActionResult<List<Course>>> GetAllCoursesWithClasses()
		{
			try
			{
				var courses =  await _educationProgramContext.Courses
					.Include(c => c.Classes)
					.ToListAsync();
				return courses;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllCourses()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetCourseById")]
		public async Task<ActionResult<Course>> GetCourseById(int id)
		{
			try
			{
				var course = await _educationProgramContext.Courses
						.Include(c => c.Classes)
						.Include(c => c.Location)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (course == null)
				{
					_logger.LogInformation(0, "GetCourseById({Id}), Called", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				return course;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpPost("PostCourse")]
		public async Task<ActionResult> PostCourse(Course course)
		{
			try
			{
				_educationProgramContext.Courses.Add(course);
				await _educationProgramContext.SaveChangesAsync();

				// Should return a 201 status code. 
				return new CreatedAtActionResult(nameof(GetCourseById), "Course", new { id = course.CourseId }, course);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostCourse({Course})", course);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
