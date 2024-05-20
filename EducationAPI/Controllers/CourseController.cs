using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class CourseController : ControllerBase
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
		/// A <see cref="List{Course}"/> of <see cref="Course"/> with a children 
		/// <see cref="Class"/>, <see cref="Topic"/>, <see cref="Exam"/> and 
		/// <see cref="Location"/>		
		/// </returns>
		[HttpGet("GetAllCourses")]
		public async Task<ActionResult<List<Course>>> GetAllCourses()
		{
			try
			{
				var courses = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
					.Include(c => c.Topics)
					.Include(c => c.Exams)
					.Include(c => c.Location)
					.Include(c => c.PDF)
					.Include(c => c.WaitLists)
					.ToListAsync();

				foreach (var course in courses)
				{
					UpdateCourseStatus(course);
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("GetAllCourses(), called.");
				return courses;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllCourses()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Gets all course who enrollment deadline days are in the future and do not exceed the 
		/// maximum attendance count. 
		/// </summary>
		/// <returns>
		/// A <see cref="List{Course}"/> of <see cref="Course"/> with a children 
		/// <see cref="Class"/>, <see cref="Topic"/>, <see cref="Exam"/> and 
		/// <see cref="Location"/>	
		/// </returns>
		[HttpGet("GetAllEnrollableCourses")]
		public async Task<ActionResult<List<Course>>> GetAllEnrollableCourses()
		{
			try
			{
				var today = DateTime.Today;
				List<Course> enrollableCourses = [];

				// Get all courses, that have an enrollment deadline on or after today
				var courses = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
					.Include(c => c.Topics)
					.Include(c=> c.Exams)
					.Include(c => c.Location)
					.Include (c => c.PDF)
					.Include (c => c.WaitLists)
					.Where(c => c.EnrollmentDeadline >= today)
					.ToListAsync();

				if (courses == null)
				{
					_logger.LogError("GetAllEnrollableCourse(), could not find courses.");
					return NotFound("could not find courses.");
				}

				// FOR EACH course, retrieve the maximum attendance and the record of the first class.
				foreach (Course course in courses)
				{
					int MaxAttendance = course.MaxAttendance;
					var firstClass = course.Classes.FirstOrDefault();
					if (firstClass == null)
					{
						_logger.LogError("GetAllEnrollableCourse(), could not find class.");
						return NotFound("A course did not contain a child class");
					}
					// IF the number of students in attendance is less than the value of max attendance.
					if (firstClass.Attendances.Count < MaxAttendance)
					{
						// THEN add the course to the list of enrollable courses. 
						enrollableCourses.Add(course);
					}
				}

				foreach (Course course in enrollableCourses)
				{
					UpdateCourseStatus(course);
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("GetAllEnrollableCourse(), called.");
				return enrollableCourses;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllEnrollableCourses()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Gets a Course record by Course ID.
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
							.ThenInclude(c => c.Attendances)
						.Include(c => c.Topics)
						.Include(c => c.Exams)
						.Include(c => c.Location)
						.Include(c => c.PDF)
						.Include(c => c.WaitLists)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (course == null)
				{
					_logger.LogError("GetCourseById({Id}), course not found.", id);
					return NotFound("Course not found.");
				}

				UpdateCourseStatus(course);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("GetCourseById({Id}), called", id);
				return Ok(course);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Returns a lists of Course by Topic.
		/// </summary>
		/// <param name="Id">Topic Id of <see cref="Topic"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="Topic"/></returns>
		[HttpGet("GetCoursesByTopicId/{Id}")]
		public async Task<ActionResult<List<Course>>> GetCoursesByTopicId(int Id)
		{
			try
			{
				var topic = await _educationProgramContext.Topics
					.Include(t => t.Courses)
					.FirstOrDefaultAsync(t => t.TopicId == Id);

				if (topic == null)
				{
					_logger.LogError("GetCourseByTopicId({Id}), Topic not found.", Id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				List<Course> courses = topic.Courses.ToList();

				_logger.LogInformation("GetCourseByTopicId({Id}), called.", Id);
				return courses;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseByTopicId({Id})", Id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Retrieves a list of courses enrolled by a user identified their user ID.
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
					_logger.LogInformation("GetUserEnrolledCoursesById/({UserId}), called.", userId);
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

				_logger.LogInformation("GetUserEnrolledCoursesById/({UserId}), called.", userId);
				return courses;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"GetUserEnrolledCoursesById/({UserId})", userId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Returns a list of courses that the user has completed according to attendance. 
		/// </summary>
		/// <param name="userId">User Id of <see cref="User"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="Course"/></returns>
		[HttpGet("GetUserCompletedCourses/{userId}")]
		public async Task<ActionResult<List<Course>>> GetUserCompletedCourses(int userId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Student)
						.ThenInclude(s => s.Attendances)
							.ThenInclude(a => a.Class)
								.ThenInclude(c => c.Course)
					.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("GetUserCompletedCourses({UserId}), user not found.", userId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var attendedCourses = user.Student.Attendances
					.Where(a => a.Attended)
					.Select(a => a.Class.Course)
					.Distinct();

				var completedCourses = new List<Course>();

				// If the user is not even enrolled in anything, just return and empty list.
				// I might run into problems here later, WHAT IF, the course has been deleted?
				if (attendedCourses.Any())
				{
					_logger.LogInformation("GetUserCompletedCourses({UserId}), called.", userId);
					return completedCourses;
				}

				foreach (var course in attendedCourses)
				{
					// If we made it this far, course *should* not be null here, 
					// but I put this in here to handle null warnings on course.
					if (course == null) continue; 

					var attendedClassIds = user.Student.Attendances
							.Where(a => a.Attended && a.Class.CourseId == course.CourseId)
							.Select(a => a.ClassId)
							.ToList();

					var totalClassCount = course.Classes.Count;

					var attendedClassCount = await _educationProgramContext.Classes
							.Where(c => attendedClassIds.Contains(c.ClassId))
							.CountAsync();

					if (totalClassCount == attendedClassCount)
					{
						completedCourses.Add(course);
					}
				}

				_logger.LogInformation("GetUserCompletedCourses({UserId}), called", userId);
				return completedCourses;
			}
			catch(Exception ex)
			{
				_logger.LogError(ex,"GetUserCompletedCourses({UserId}", userId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Returns a list of courses within a date range
		/// </summary>
		/// <param name="startDate"><see cref="DateTime"/> for the start of the search range</param>
		/// <param name="endDate"><see cref="DateTime"/> for the end of the search range</param>
		/// <returns><see cref="List{T}"/> of <see cref="Course"/></returns>
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
					_logger.LogError("GetCoursesByDateRange({StartDate}, {EndDate}), classes not found.", startDate, endDate);
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
									.ThenInclude(c => c.Attendances)
								.Include(c => c.Topics)
								.Include(c => c.Exams)
								.Include(c => c.Location)
								.FirstOrDefaultAsync(c => c.CourseId == @class.CourseId);

						if (parentCourse != null)
						{
							courseInRange.Add(parentCourse);
							courseIds.Add(@class.CourseId);
						}
					}
				}

				_logger.LogInformation("GetCoursesByDateRange({StartDate}, {EndDate}), called.", startDate, endDate);
				return courseInRange;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCoursesByDateRange({StartDate}, {EndDate})", startDate, endDate);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Get a list of Users who are enrolled students of a course. 
		/// </summary>
		/// <param name="courseId">Course Id of <see cref="Course"/></param>
		/// <returns>
		/// <see cref="List{T}"/> of <see cref="User"/>
		/// </returns>
		[HttpGet("GetCourseEnrollment/{courseId}")]
		public async Task<ActionResult<List<User>>> GetCourseEnrollment(int courseId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
							.ThenInclude(a => a.Student)
					.FirstOrDefaultAsync(c => c.CourseId == courseId);

				if (course == null)
				{
					_logger.LogError("GetCourseEnrollment({CourseId}), course not found.", courseId);
					return NotFound("Course not found.");
				}

				var students = course.Classes
					.SelectMany(c => c.Attendances)
					.Where(a => a.Student != null)
					.Select(a => a.Student)
					.Distinct()
					.ToList();

				// then find the user to each student using the student id
				var users = await _educationProgramContext.Users
					.Where(u => students.Select(s => s!.UserId).Contains(u.UserId))
					.ToListAsync();

				_logger.LogInformation("GetCourseEnrollment({CourseId}), called.", courseId);
				return users;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseEnrollment({CourseId})", courseId);
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

				_logger.LogInformation("PostCourse {Course} called.", course);
				return Created();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostCourse({Course})", course);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("UpdateCourse")]
		public async Task<ActionResult<Course>> UpdateCourse(Course updatedCourse)
		{
			try
			{
				var existingCourse = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
					.Include(c => c.Location)
					.Include(c => c.Topics)
					.Include(c => c.Exams)
					.Include(c => c.PDF)
					.FirstOrDefaultAsync(c => c.CourseId == updatedCourse.CourseId);

				if (existingCourse == null)
				{
					_logger.LogError("UpdateCourse({UpdatedCourse}), Course not found!", updatedCourse);
					return NotFound("Course not found.");
				}

				UpdateCourseStatus(updatedCourse);

				// Update scalar properties
				_educationProgramContext.Entry(existingCourse).CurrentValues.SetValues(updatedCourse);

				// Update topics.
				// By first clearing the topics that are already in the existing course.
				existingCourse.Topics.Clear();
				// then get list of topic id's from the in coming course. 
				var topicIds = updatedCourse.Topics.Select(t => t.TopicId).ToList();
				// then find all the existing topics from that list.
				var existingTopics = await _educationProgramContext.Topics
					.Where(t => topicIds.Contains(t.TopicId))
					.ToListAsync();	

				// and add back in the the existing course
				existingCourse.Topics = existingTopics;

				// Update Classes.
				// for each class in the updated course . . . 
				List<Class> classesToAdd = [];
        foreach (var updatedClass in updatedCourse.Classes)
				{
					// see if the class exists in the existing course
					var existingClass = existingCourse.Classes
						.FirstOrDefault(c => c.ClassId == updatedClass.ClassId);

					if (existingClass != null)
					{
						// if it does update the class
						_educationProgramContext.Entry(existingClass).CurrentValues.SetValues(updatedClass);
						// Update Attendance
						foreach (Attendance attendance in updatedClass.Attendances)
						{
							var existingAttendance = existingClass.Attendances
								.FirstOrDefault(a => a.AttendanceId == attendance.AttendanceId);
							if (existingAttendance != null)
							{
                _educationProgramContext.Entry(existingAttendance).CurrentValues.SetValues(attendance);
              }
						}
					}
					else
					{
						
						// if it doesn't, add the class.
						classesToAdd.Add(updatedClass);
					}
				}

				foreach (var classToAdd in classesToAdd)
				{
					existingCourse.Classes.Add(classToAdd);
				}

				// Remove any classes that aren't in the updated course
				List<Class> classesToRemove = [];

				foreach (var existingClass in existingCourse.Classes)
				{
					if (!updatedCourse.Classes.Any(c => c.ClassId == existingClass.ClassId))
					{
						classesToRemove.Add(existingClass);
					}
				}

				foreach (var classToRemove in classesToRemove)
				{
					existingCourse.Classes.Remove(classToRemove);
				}

				// Update PDF.
				// First check if it's even necessary, because PDF can be null. 
				if (updatedCourse.PDF != null && existingCourse.PDF != null)
				{
					_educationProgramContext.Entry(existingCourse.PDF).CurrentValues.SetValues(updatedCourse.PDF);
				}
				else
				{
					existingCourse.PDF = updatedCourse.PDF;
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("UpdateCourse({UpdatedCourse}) called", updatedCourse);
				return existingCourse;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateCourse({UpdatedCourse})", updatedCourse);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Enrolls a user to a course based on the user ID and course ID.
		/// </summary>
		/// <param name="userId">The user ID of the user to be enrolled.</param>
		/// <param name="courseId">The ID of the course in which the user will be enrolled.</param>
		/// <returns>
		///   <list type="bullet">
		///     <item>
		///       <description>201 Created: The user was successfully enrolled in the course.</description>
		///     </item>
		///     <item>
		///       <description>404 Not Found: If the specified course, user, or student is not found.</description>
		///     </item>
		///     <item>
		///       <description>409 Conflict: If the user is already enrolled in the course.</description>
		///     </item>
		///     <item>
		///       <description>500 Internal Server Error: If an unexpected error occurs during the enrollment process.</description>
		///     </item>
		///   </list>
		/// </returns>
		[HttpPost("EnrollUser/{userId}/{courseId}")]
		[ProducesResponseType((int)HttpStatusCode.Created)]
		public async Task<ActionResult> EnrollUser(int userId, int courseId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
							.ThenInclude(a => a.Student)
					.Include(c => c.Exams)
					.Where(c => c.CourseId == courseId)
					.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("EnrollUser({UserId},{CourseId}), Course not found.", userId, courseId);
					return NotFound("Course not found");
				}

				// Check the current enrollment in the course. 
				var enrolledStudents = course.Classes
					.SelectMany(c => c.Attendances)
					.Where(a => a.Student != null)
					.Select(a => a.Student)
					.Distinct()
					.ToList();

				if (enrolledStudents.Count >= course.MaxAttendance)
				{
					_logger.LogError("EnrollUser({UserId}, {CourseId}), Course attandance full.", userId, courseId);
					return BadRequest("Course attandance full.");
				}

				// Fetch the student
				var user = await _educationProgramContext.Users
						.Include(u => u.Student)
						.ThenInclude(s => s.Attendances)
						.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("EnrollUser({UserId},{CourseId}), User not found.", userId, courseId);
					return NotFound("User not found");
				}

				var student = user.Student;

				if (student == null)
				{
					_logger.LogError("EnrollUser({UserId},{CourseId}), student not found!", userId, courseId);
					return NotFound("Student not found.");
				}

				// Check if the student is already enroll in the course
				if (student.Attendances != null && student.Attendances.Any(a => a.Class != null && a.Class.CourseId == courseId))
				{
					_logger.LogError("EnrollUser({UserId},{CourseId}), User is already enrolled in course.", userId, courseId);


					return new ObjectResult("Student is already enrolled in course.")
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

				if (course.HasExam)
				{
					var exam = new Exam()
					{
						CourseId = course.CourseId,
						StudentId = student.StudentId,
						HasPassed = false,
					};

					_educationProgramContext.Exams.Add(exam);
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("EnrollUser({UserId},{CourseId}), called.", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.Created);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "EnrollUser({UserId},{CourseId})", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPost("EnrollUsers/{courseId}")]
		[ProducesResponseType((int)HttpStatusCode.Created)]
		public async Task<ActionResult> EnrollUsers(int courseId, List<int> userIds)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
							.ThenInclude(a => a.Student)
					.Include(c => c.Exams)
					.Where(c => c.CourseId == courseId)
					.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("EnrollUsers({CourseId}), Course not found.", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

        foreach (var userId in userIds)
				{
					// Fetch the student
					var user = await _educationProgramContext.Users
							.Include(u => u.Student)
								.ThenInclude(s => s.Attendances)
							.FirstOrDefaultAsync(u => u.UserId == userId);

					if (user == null)
					{
						_logger.LogError("EnrollUsers({UserId},{CourseId}), User not found.", userId, courseId);
						return new StatusCodeResult((int)HttpStatusCode.NotFound);
					}

					var student = user.Student;

					if (student == null)
					{
						_logger.LogError("EnrollUsers({UserId},{CourseId}), student not found.", userId, courseId);
						return new StatusCodeResult((int)HttpStatusCode.NotFound);
					}

					// Check if the student is already enroll in the course
					if (student.Attendances != null && student.Attendances.Any(a => a.Class != null && a.Class.CourseId == courseId))
					{
						_logger.LogError("EnrollUsers({UserId},{CourseId}), User is already enrolled in course.", userId, courseId);
					  return BadRequest("User already enrolled in course.");
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

					if (course.HasExam)
					{
						var exam = new Exam()
						{
							CourseId = course.CourseId,
							StudentId = student.StudentId,
							HasPassed = false,
						};

						_educationProgramContext.Exams.Add(exam);
					}
					
				}

        // Check the current enrollment in the course. 
        var enrolledStudents = course.Classes
          .SelectMany(c => c.Attendances)
          .Where(a => a.Student != null)
          .Select(a => a.Student)
          .Distinct()
          .ToList();

				if (enrolledStudents.Count > course.MaxAttendance)
				{
					_logger.LogError("EnrollerUsers({CourseId}), Course attendance exceeded.", courseId);
					return BadRequest("Course attendance exceeded.");
				}

        await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("EnrollUsers({CourseId}), called.", courseId);
				return new StatusCodeResult((int)HttpStatusCode.Created);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "EnrollUsers({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Drops a user from a course based on the user ID and course ID.
		/// </summary>
		/// <param name="userId">The user ID of the user to be enrolled.</param>
		/// <param name="courseId">The ID of the course from which the student will be Droped.</param>
		/// <returns>
		///   <list type="bullet">
		///     <item>
		///       <description>200 OK: The user was successfully dropped from the course.</description>
		///     </item>
		///     <item>
		///       <description>404 Not Found: If the specified course, user, or student is not found.</description>
		///     </item>
		///     <item>
		///       <description>500 Internal Server Error: If an unexpected error occurs during the Dropment process.</description>
		///     </item>
		///   </list>
		/// </returns>
		[HttpDelete("DropUser/{userId}/{courseId}")]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		public async Task<ActionResult> DropUser(int userId, int courseId)
		{
			try
			{
				// Fetch the course
				var course = await _educationProgramContext.Courses
						.Include(c => c.Classes)
						.Include(c => c.Exams)
						.Where(c => c.CourseId == courseId)
						.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("DropUser({UserId},{CourseId}), Course not found.", userId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Fetch the student
				var user = await _educationProgramContext.Users
						.Include(u => u.Student)
							.ThenInclude(s => s.Attendances)
						.Include(u => u.Student)
							.ThenInclude(s => s.Exams)
						.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("DropUser({UserId},{CourseId}), User not found.", userId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var student = user.Student;

				if (student == null)
				{
					_logger.LogError("DropUser({UserId},{CourseId}), Student not found.", userId, courseId);
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

				// Remove the exam for the specified course
				var examToRemove = student.Exams
						.Where(e => e.CourseId == courseId && e.StudentId == student.StudentId)
						.FirstOrDefault();
				
				if (examToRemove != null)
				{
					_educationProgramContext.Exams.Remove(examToRemove);
					await _educationProgramContext.SaveChangesAsync();
				}
				

				_logger.LogInformation("DropUser({UserId},{CourseId}), called.", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "DropUser({UserId},{CourseId})", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("DropUsers/{courseId}")]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		public async Task<ActionResult> DropUsers(int courseId, List<int> userIds)
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
					_logger.LogError("DropUsers({CourseId}), Course not found.", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				foreach (var userId in userIds)
				{
					// Fetch the student
					var user = await _educationProgramContext.Users
							.Include(u => u.Student)
								.ThenInclude(s => s.Attendances)
							.Include(u => u.Student)
								.ThenInclude(s => s.Exams)
							.FirstOrDefaultAsync(u => u.UserId == userId);

					if (user == null)
					{
						_logger.LogError("DropUsers({UserId},{CourseId}), User  not found.", userId, courseId);
						return new StatusCodeResult((int)HttpStatusCode.NotFound);
					}

					var student = user.Student;

					if (student == null)
					{
						_logger.LogError("DropUsers({UserId},{CourseId}), Student not found.", userId, courseId);
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

					// Remove the exam for the specified course
					var examToRemove = student.Exams
							.Where(e => e.CourseId == courseId && e.StudentId == student.StudentId)
							.FirstOrDefault();
					
					if (examToRemove != null)
					{
						_educationProgramContext.Exams.Remove(examToRemove);
						await _educationProgramContext.SaveChangesAsync();
					}
				}

				_logger.LogInformation("DropUsers({CourseId}), called.", courseId);
				return new StatusCodeResult((int)HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "DropUsers({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpDelete("DeleteCourseById/{id}")]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		public async Task<ActionResult> DeleteCourseById(int id)
		{
			try
			{
				var existingCourse = await _educationProgramContext.Courses
						.Include(c => c.Location)
						.Include(c => c.PDF)
						.Include(c => c.Exams)
						.FirstOrDefaultAsync(c => c.CourseId == id);

				if (existingCourse == null)
				{
					_logger.LogError("DeleteCourseById({Id}), Course not found.", id);
					return NotFound("Course not found.");
				}

				if (existingCourse.Location != null)
				{
					_educationProgramContext.Locations.Remove(existingCourse.Location);
				}

				if (existingCourse.PDF != null)
				{
					_educationProgramContext.PDFs.Remove(existingCourse.PDF);
				}

				if (existingCourse.Exams != null)
				{
					foreach (var exam in existingCourse.Exams)
					{
						_educationProgramContext.Exams.Remove(exam);
					}
				}

				_educationProgramContext.Courses.Remove(existingCourse);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("DeleteCourseById {Id} called.", id);
				return NoContent();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "RemoveCourseById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// This method assumes that a Course can have multiple Classes, each with its own schedule, and that the
		/// status of the Course is determined by the status of its classes. If a course has at least one class
		/// that is currently in progress, the course is considered in progress. If a course has no classes in 
		/// progress but has at least one class that is scheduled to start in the future, the course is considered
		/// upcoming. If all classes have already ended, the course is considered archived.
		/// </summary>
		/// <param name="course"></param>
		private static void UpdateCourseStatus(Course course)
		{
			if (course.Classes.Count != 0)
			{
				var today = DateTime.Today;

				if (course.Classes.Any(c => c.ScheduleStart.Date <= today) && course.Classes.Any(c => c.ScheduleEnd.Date >= today))
				{
					course.Status = CourseStatus.InProgress.ToString();
				}
				else if (course.Classes.Any(c => c.ScheduleStart.Date > today))
				{
					course.Status = CourseStatus.Upcoming.ToString();
				}
				else
				{
					course.Status = CourseStatus.Archived.ToString();
				}
			} 


		}

	}
}
