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
					.Include(c => c.Classes)
					.Include(c => c.Topics)
					.Include(c => c.Location)
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

		[HttpGet("GetCoursesByTopicId/{Id}")]
		public async Task<ActionResult<List<Course>>> GetCoursesByTopicId(int Id)
		{
			try
			{
				var topic = await _educationProgramContext.Topics
					.Include(t => t.Courses)
						.ThenInclude(c => c.Location)
					.Include(t => t.Courses)
						.ThenInclude(c => c.Classes)
					.FirstOrDefaultAsync(t => t.TopicId == Id);

				if (topic == null)
				{
					_logger.LogError("GetCourseByTopicId({Id}), Topic not found!", Id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				List<Course> courses = topic.Courses.ToList();

				_logger.LogInformation("GetCourseByTopicId({Id}), called", Id);
				return courses;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseByTopicId({Id})", Id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetCoursesByDateRange")]
		public async Task<ActionResult<List<Course>>> GetCoursesByDateRange(DateTime startDate, DateTime endDate)
		{
			try
			{
				var classesInRange = await _educationProgramContext.Classes
						.Where(c => c.ScheduleStart >= startDate && c.ScheduleEnd <= endDate)
						.ToListAsync();

				if (classesInRange == null)
				{
					_logger.LogError("GetCoursesByDateRange({StartDate}, {EndDate}), classes not found", startDate, endDate);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				HashSet<int> courseIds = new();
				List<Course> courseInRange = new();

				foreach (var @class in classesInRange)
				{
					if (!courseIds.Contains(@class.CourseId))
					{
						Course? parentCourse = await _educationProgramContext.Courses
								.Include(c => c.Classes)
								.FirstOrDefaultAsync(c => c.CourseId == @class.CourseId);

						if (parentCourse != null)
						{
							courseInRange.Add(parentCourse);
							courseIds.Add(@class.CourseId);
						}
					}
				}

				_logger.LogInformation("GetCoursesByDateRange({StartDate}, {EndDate}), called", startDate, endDate);
				return courseInRange;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCoursesByDateRange({StartDate}, {EndDate})", startDate, endDate);
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
					var existingTopic = await _educationProgramContext.Topics
						.FirstOrDefaultAsync(t => t.TopicId == topic.TopicId);

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
					.Include(c => c.Classes)
					.Include(c => c.Location)
					.Include(c => c.Topics)
					.FirstOrDefaultAsync(c => c.CourseId == id);

				if (existingCourse == null)
				{
					_logger.LogError("UpdateCourseById({Id}, {UpdatedCourse}), Course not found!", id, updatedCourse);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Update scalar properties
				_educationProgramContext.Entry(existingCourse).CurrentValues.SetValues(updatedCourse);

				// Update topics. 
				existingCourse.Topics.Clear();

				foreach (var topic in updatedCourse.Topics)
				{
					var existingTopic = await _educationProgramContext.Topics
						.FirstOrDefaultAsync(t => t.TopicId == topic.TopicId);

					if (existingTopic != null)
					{
						existingCourse.Topics.Add(existingTopic);
					}
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("UpdateCourseById({Id}, {UpdatedCourse}) called", id, updatedCourse);
				return existingCourse;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateCourseById({Id}, {UpdatedCourse})", id, updatedCourse);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("DeleteCourseById/{id}")]
		public async Task<ActionResult> DeleteCourseById(int id)
		{
			try
			{
				var existingCourse = await _educationProgramContext.Courses
						.Include(c => c.Location)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (existingCourse == null)
				{
					_logger.LogError("DeleteCourseById({Id}), Course not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (existingCourse.Location != null)
				{
					_educationProgramContext.Locations.Remove(existingCourse.Location);
				}

				_educationProgramContext.Courses.Remove(existingCourse);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("DeleteCourseById {Id} called", id);
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
