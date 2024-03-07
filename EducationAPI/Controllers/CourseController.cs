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
		[HttpGet("GetAllCourses")]
		public async Task<ActionResult<List<Course>>> GetAllCourses()
		{
			try
			{
				var courses = await  _educationProgramContext.Courses
					.Select(c => new Course
					{
						CourseId = c.CourseId,
						Title = c.Title,
						Description = c.Description,
						AttendanceCredit = c.AttendanceCredit,
						CompletionCredit = c.CompletionCredit,
						MaxAttendance = c.MaxAttendance,
						EnrollmentDeadline = c.EnrollmentDeadline,
						InstructorEmail = c.InstructorEmail,
						InstructorName = c.InstructorName,
						Pdf = c.Pdf,
						Location = c.Location,
						Topics = c.Topics.Select(t => new Topic
						{
							TopicId = t.TopicId,
							Title = t.Title,
							Description = t.Description
						}).ToList(),
						Classes = c.Classes.ToList(),
					}).ToListAsync();

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
						.Include(c => c.Topics)
						.Include(c => c.Location)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (course == null)
				{
					_logger.LogError("GetCourseById({Id}), Record not found!", id);
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
				// Create a copy of the topics collection
				var topicsCopy = course.Topics.ToList();

				// Check if any of the topics in the request already exist in the database
				foreach (var topic in topicsCopy)
				{
					var existingTopic = await _educationProgramContext.Topics.FirstOrDefaultAsync(t => t.TopicId == topic.TopicId);
					if (existingTopic != null)
					{
						// If the topic already exists, just link it to the course
						course.Topics.Remove(topic);
						course.Topics.Add(existingTopic);
					}
				}

				_educationProgramContext.Courses.Add(course);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("PostCourse {Course} called", course);
				// Should return a 201 status code. 
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostCourse({Course})", course);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("UpdateCourseById/{id}")]
		public async Task<ActionResult<Course>> UpdateCourseById(int id, Course updatedCourse)
		{
			try
			{
				var existingCourse = await _educationProgramContext.Courses
					.FirstOrDefaultAsync(c => c.CourseId == id);

				if (existingCourse == null)
				{
					_logger.LogError("UpdateCourse({Id}), Course not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Entry(existingCourse).CurrentValues.SetValues(updatedCourse);

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("UpdateCourse {Id} called", id);
				return existingCourse;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateCourse({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("RemoveCourseById/{id}")]
		public async Task<ActionResult> RemoveCourseById(int id)
		{
			try
			{
				var existingCourse = await _educationProgramContext.Courses
						.Include(c => c.Location)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (existingCourse == null)
				{
					_logger.LogError("RemoveCourseById({Id}), Course not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (existingCourse.Location != null)
				{
					_educationProgramContext.Locations.Remove(existingCourse.Location);
				}

				_educationProgramContext.Courses.Remove(existingCourse);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("RemoveCourseById {Id} called", id);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "RemoveCourseById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
