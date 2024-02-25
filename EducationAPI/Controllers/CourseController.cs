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

		/// <summary>
		/// Gets all Course records from the data base. 
		/// </summary>
		/// <returns>
		/// <see cref="List{T}"/> of <see cref="Course"/> with a <see cref="List{T}"/> of children 
		/// <see cref="Class"/>
		/// </returns>
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

		/// <summary>
		/// Gets a Course record by Id
		/// </summary>
		/// <param name="id">
		///	<see cref="Course.CourseId"/>
		///	</param>
		/// <returns>
		/// <see cref="Course"/> with a <see cref="List{T}"/> of children <see cref="Class"/> and the child
		/// <see cref="Location"/>
		/// </returns>
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

		/// <summary>
		/// Gives the end user the ability to add a Course record to the database.
		/// </summary>
		/// <param name="course">
		/// A single instance of <see cref="Course"/> 
		/// </param>
		/// <returns>
		/// The instance of <see cref="Course"/> Created. 
		/// </returns>
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

		//[HttpPost("AddClassByCourseId")]
		//public async Task<ActionResult> AddClassByCourseId(int courseId, DateTime newStartDate, DateTime newEndDate)
		//{
		//	try
		//	{
		//		var course = await _educationProgramContext.Courses
		//		.FirstOrDefaultAsync();

		//		if (course == null)
		//		{
		//			_logger.LogError("No Record Found, AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
		//			return new StatusCodeResult((int)HttpStatusCode.NotFound);
		//		}

		//		Class newClass = new()
		//		{
		//			CourseId = courseId,
		//			ScheduleStart = newStartDate,
		//			ScheduleEnd = newEndDate,
		//		};

		//		_educationProgramContext.Classes.Add(newClass);

		//		await _educationProgramContext.SaveChangesAsync();

		//		_logger.LogInformation("AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
		//		return new StatusCodeResult((int)HttpStatusCode.OK);


		//	} 
		//	catch (Exception ex)
		//	{
		//		_logger.LogError(ex, "AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
		//		return new StatusCodeResult((int)(HttpStatusCode.InternalServerError));
		//	}

		//}

	}
}
