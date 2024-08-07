using EducationAPI.DataAccess;
using EducationAPI.DTO;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ReportController : ControllerBase
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<ReportController> _logger;

		public ReportController(EducationProgramContext educationProgramContext, ILogger<ReportController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetEmployers")]
		public async Task<ActionResult<List<string>>> GetEmployers()
		{
			try
			{
				List<string> employers = await _educationProgramContext.Users
				.Select(x => x.Employer)
				.Distinct()
				.ToListAsync();


				return Ok(employers);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error getting employers");
				return StatusCode(500);
			}
		}

		[HttpGet("GetUserEnrollment/{employer}/{startDate}/{endDate}")]
		public async Task<ActionResult<List<EmployerUserDTO>>> GetUserEnrollment(string employer, DateTime startDate, DateTime endDate)
		{
			try
			{
				// First let's get all the users for the employer
				// Include the user's child student, then include the child attendance, then include the
				// child `class`. This will give us all the data we need to find the user's courses.
				List<User> users = await _educationProgramContext.Users
					.Include(u => u.Student)
						.ThenInclude(s => s.Attendances)
							.ThenInclude(a => a.Class)
					.Where(x => x.Employer == employer)
					.ToListAsync();

				// If there are no users, return an empty list
				if (users.Count == 0)
				{
					return Ok(new List<EmployerUserDTO>());
				}

				// Now we need to get the courses for each user by taking the `class`es from the attendance
				// records and then getting the course from the `courseId` on the `class`.
				EmployerUserDTO employerUserDTO = new()
				{
					Employer = employer,
					Users = []
				};

				foreach (User user in users)
				{
					UserCourseDTO userCourseDTO = new()
					{
						User = user,
						Courses = []
					};

					// I need to find the courses for this user
					// I need to loop through each attendance record, check the child `class` and get the course
					// But only include distinct courses that have child `class`es that are between the start and
					// end date
					var distinctCourseIds = new HashSet<int>();
					foreach (Attendance attendance in user.Student.Attendances)
					{
						// I'm kinda guessing here, but I think I need to filter through each child `class` and
						// collect distinct `courseId`s that i'll later use to get the courses
						if (attendance.Class != null)
						{
							//first make sure that the courseId hasn't been added to the list
							if (!distinctCourseIds.Contains(attendance.Class.CourseId))
							{
								// then add the courseId to the list
								distinctCourseIds.Add(attendance.Class.CourseId);
							}

						}
					}

					// Now that I have all the distinct course ids, I can get the courses that have child `class`es
					// that are within the start and end date
					foreach (int courseId in distinctCourseIds)
					{
						Course? course = await _educationProgramContext.Courses
							.Include(c => c.Classes)
							.Where(c => c.CourseId == courseId)
							.Where(c => c.Classes.Any(cl => cl.ScheduleStart >= startDate && cl.ScheduleEnd <= endDate))
							.FirstOrDefaultAsync();

						if (course != null)
						{
							userCourseDTO.Courses.Add(course);
						}
					}

					// Now add this user to the employerUserDTO
					employerUserDTO.Users.Add(userCourseDTO);
				}

				return Ok(employerUserDTO);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error getting user enrollment");
				return StatusCode(500);
			}
		}




	}
}
