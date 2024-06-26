using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class StudentController : ControllerBase
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<StudentController> _logger;

		public StudentController(EducationProgramContext educationProgramContext, ILogger<StudentController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetStudentById/{studentId}")]
		public async Task<ActionResult<Student>> GetStudentById(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("GetStudentById({StudentId}) student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetStudentById({StudentId}) called", studentId);
				return student;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetStudentById({StudentId})", studentId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetStudentIdByClerkId/{ClerkId}")]
		public async Task<ActionResult<int>> GetStudentIdByClerkId(string clerkId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Student)
					.FirstOrDefaultAsync();

				if (user == null)
				{
					_logger.LogError("GetStudentByClerkId({ClerkID}), user not found!", clerkId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (user.Student != null)
				{
					_logger.LogInformation("GetStudentByClerkId({ClerkID}) called", clerkId);
					return user.Student.StudentId;
				}
				else
				{
					_logger.LogError("GetStudentByClerkId({ClerkID}), student not found!", clerkId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetStudentByClerkId({ClerkID})", clerkId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpGet("GetStudentAttendanceById/{studentId}")]
		public async Task<ActionResult<List<Attendance>>> GetStudentAttendanceById(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("GetStudentAttendanceById({Id}), student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (student.Attendances == null)
				{
					_logger.LogError("GetStudentAttendanceById({Id}), attendance not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetStudentAttendanceById({Id}), called", studentId);
				return student.Attendances.ToList();
				
			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"GetStudentAttendanceById({Id})", studentId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("CalculateAccumulatedCredit/{userId}")]
		public async Task<ActionResult<int>> CalculateAccumulatedCredit(int userId)
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
					_logger.LogError("CalculateAccumulatedCredit({UserId}), user not found", userId);
					return NotFound("User not found.");
				}

				// This return a list of courses where the user has attended at least one course. 
				var attendedCourses = user.Student.Attendances
					.Where(a => a.Attended && a.Class != null)
					.Select(a => a.Class!.Course)
					.Distinct();

				// If the list is empty then the user has not attended any courses and therefor 
				// has no accumulated credit.
				if (!attendedCourses.Any())
				{
					user.Student.AccumulatedCredit = 0;
					await _educationProgramContext.SaveChangesAsync();
					return Ok(user);
				}

				var accumulatedCredit = user.Student.Attendances
					.Where(a => a.Attended && a.Class != null)
					.Select(a => a.Class!.Course)
					.Distinct()
					.Where(course => course != null)
					.Sum(course =>
					{
						var attendanceCredit = course.Classes
							.Count(c => c.Attendances.Any(a => a.StudentId == user.Student.StudentId && a.Attended)) == course.Classes.Count ? course.AttendanceCredit : 0;
						var examCredit = course.HasExam && course.Exams.Any(e => e.StudentId == user.Student.StudentId && e.HasPassed) ? course.ExamCredit ?? 0 : 0;
						return attendanceCredit + examCredit;
					});

        user.Student.AccumulatedCredit = accumulatedCredit;
        await _educationProgramContext.SaveChangesAsync();

        return Ok(accumulatedCredit);

      }
			catch(Exception ex)
			{
				_logger.LogError(ex, "CalculateAccumulatedCredit({UserId})", userId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
