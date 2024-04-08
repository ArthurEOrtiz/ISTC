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
		/// A <see cref="List{Course}"/> of <see cref="Course"/> with a <see cref="List{T}"/> of children 
		/// <see cref="Class"/>, a <see cref="List{T}"/> of children <see cref="Topic"/>, and the linked 
		/// <see cref="Location"/>		
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

		[HttpGet("GetAllEnrollableCourses")]
		public async Task<ActionResult<List<Course>>> GetAllEnrollableCourses()
		{
			try
			{
				var today = DateTime.Today;
				var enrollableCourses = new List<Course>();

				var courses = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
					.Include(c => c.Topics)
					.Include(c => c.Location)
					.Where(c => c.EnrollmentDeadline >= today)
					.ToListAsync();

				if (courses == null)
				{
					_logger.LogError("GetAllEnrollableCourse(), could not find courses.");
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				foreach (Course course in courses)
				{
					int MaxAttendance = course.MaxAttendance;
					var firstClass = course.Classes.FirstOrDefault();
					if (firstClass == null)
					{
						_logger.LogError("GetAllEnrollableCourse(), could not find class");
						return new StatusCodeResult((int)HttpStatusCode.NotFound);
					}

					if (firstClass.Attendances.Count < MaxAttendance)
					{
						enrollableCourses.Add(course);
					}
				}

				_logger.LogInformation("GetAllEnrollableCourse(), called");
				return enrollableCourses;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllEnrollableCourses()");
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

		/// <summary>
		/// Retrieves a list of courses enrolled by a user identified by the specified user ID.
		/// </summary>
		/// <param name="userId">The ID of the user whose enrolled courses are to be retrieved. <see cref="User.UserId"/></param>
		/// <returns>
		/// <list type="bullet">
		///   <item>
		///     <description>200 OK: A list of Course objects representing the courses enrolled by the user.</description>
		///   </item>
		///   <item>
		///     <description>404 Not Found: If the specified user is not found.</description>
		///   </item>
		///   <item>
		///     <description>500 Internal Server Error: If an unexpected error occurs during the retrieval process.</description>
		///   </item>
		/// </list>
		/// </returns>
		[HttpGet("GetUserEnrolledCoursesById/{userId}")]
		public async Task<ActionResult<List<Course>>> GetUserEnrolledCoursesById(int userId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Student)
						.ThenInclude(s => s.Attendances)
							.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("GetUserEnrolledCoursesById/({UserId})", userId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var classes = user.Student.Attendances
					.Select(a => a.Class)
					.GroupBy(c => c.CourseId)
					.Select(g => g.First())
					.ToList();
				
				List<Course> courses = new();

				if (classes.Count == 0)
				{
					_logger.LogInformation("GetUserEnrolledCoursesById/({UserId}), called", userId);
					return courses;
				}

				foreach (var @class in classes)
				{
					var course = await _educationProgramContext.Courses
						.Include(c => c.Classes)
						.Include(c => c.Location)
						.Include(c => c.Topics)
						.FirstOrDefaultAsync(c => c.CourseId == @class.CourseId);
					if (course != null)
					{
						courses.Add(course);
					}
				}

				_logger.LogInformation("GetUserEnrolledCoursesById/({UserId}), called", userId);
				return courses;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"GetUserEnrolledCoursesById/({UserId})", userId);
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
		[ProducesResponseType((int)HttpStatusCode.Created)]
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

				// Set the Course property for each Class in the Course
				foreach ( var @class in course.Classes)
				{
					@class.Course = course;
				}

				_educationProgramContext.Courses.Add(course);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("PostCourse {Course} called", course);
				// Should return a 201 status code. 
				return new StatusCodeResult((int)HttpStatusCode.Created);
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

		/// <summary>
		/// Enrolls a student in a course based on the clerk ID and course ID.
		/// </summary>
		/// <param name="clerkId">The clerk ID of the user performing the enrollment.</param>
		/// <param name="courseId">The ID of the course in which the student will be enrolled.</param>
		/// <returns>
		///   <list type="bullet">
		///     <item>
		///       <description>201 Created: The student was successfully enrolled in the course.</description>
		///     </item>
		///     <item>
		///       <description>404 Not Found: If the specified course, user, or student is not found.</description>
		///     </item>
		///     <item>
		///       <description>409 Conflict: If the student is already enrolled in the course.</description>
		///     </item>
		///     <item>
		///       <description>500 Internal Server Error: If an unexpected error occurs during the enrollment process.</description>
		///     </item>
		///   </list>
		/// </returns>
		[HttpPost("EnrollStudentByClerkId/{clerkId}/{courseId}")]
		public async Task<ActionResult> EnrollStudentToCourse(string clerkId, int courseId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
					.Where(c => c.CourseId == courseId)
					.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("EnrollStudentToCourse({StudentId},{CourseId}), Course not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Fetch the student
				var user = await _educationProgramContext.Users
						.Include(u => u.Student)
						.ThenInclude(s => s!.Attendances)
						.FirstOrDefaultAsync(u => u.ClerkId == clerkId);

				if (user == null || user.Student == null)
				{
					_logger.LogError("EnrollStudentToCourse({ClerkId},{CourseId}), User or student not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var student = user.Student;

				if (student == null)
				{
					_logger.LogError("EnrollStudentToCourse({ClerkId},{CourseId}), Student not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Check if the student is already enroll in the course
				if (student.Attendances != null && student.Attendances.Any(a => a.Class != null && a.Class.CourseId == courseId))
				{
					_logger.LogError("EnrollStudentToCourse({ClerkId},{CourseId}), Student already enrolled in course!", clerkId, courseId);
					return new ObjectResult("Student is already enrolled in course")
					{
						StatusCode = (int)HttpStatusCode.Conflict
					};
				}

				foreach (var @class in course.Classes)
				{
					var attendance = new Attendance
					{
						StudentId = student.StudentId,
						ClassId = @class.ClassId,
						Attended = false
					};

					_educationProgramContext.Attendances.Add(attendance);
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("EnrollStudentToCourse({ClerkId},{CourseId}), called.", clerkId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.Created);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "EnrollStudentToCourse({ClerkId},{CourseId})", clerkId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Unenrolls a student from a course based on the clerk ID and course ID.
		/// </summary>
		/// <param name="clerkId">The clerk ID of the user performing the unenrollment.</param>
		/// <param name="courseId">The ID of the course from which the student will be unenrolled.</param>
		/// <returns>
		///   <list type="bullet">
		///     <item>
		///       <description>200 OK: The student was successfully unenrolled from the course.</description>
		///     </item>
		///     <item>
		///       <description>404 Not Found: If the specified course or student is not found.</description>
		///     </item>
		///     <item>
		///       <description>500 Internal Server Error: If an unexpected error occurs during the unenrollment process.</description>
		///     </item>
		///   </list>
		/// </returns>
		[HttpDelete("UnenrollStudentByClerkId/{clerkId}/{courseId}")]
		public async Task<ActionResult> UnenrollStudentFromCourse(string clerkId, int courseId)
		{
			try
			{
				// Fetch the course
				var course = await _educationProgramContext.Courses
						.Include(c => c.Classes)
						.Where(c => c.CourseId == courseId)
						.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("UnenrollStudentFromCourse({ClerkId},{CourseId}), Course not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Fetch the student
				var user = await _educationProgramContext.Users
						.Include(u => u.Student)
						.ThenInclude(s => s!.Attendances)
						.FirstOrDefaultAsync(u => u.ClerkId == clerkId);

				if (user == null || user.Student == null)
				{
					_logger.LogError("UnenrollStudentFromCourse({ClerkId},{CourseId}), User or student not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var student = user.Student;

				if (student == null)
				{
					_logger.LogError("UnenrollStudentFromCourse({ClerkId},{CourseId}), Student not found!", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Remove the attendances for the specified course
				var attendancesToRemove = student.Attendances?
						.Where(a => a.Class != null && a.Class.CourseId == courseId)
						.ToList();

				if (attendancesToRemove != null && attendancesToRemove.Any())
				{
					_educationProgramContext.Attendances.RemoveRange(attendancesToRemove);
					await _educationProgramContext.SaveChangesAsync();
				}

				_logger.LogInformation("UnenrollStudentFromCourse({ClerkId},{CourseId}), called.", clerkId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UnenrollStudentFromCourse({ClerkId},{CourseId})", clerkId, courseId);
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
