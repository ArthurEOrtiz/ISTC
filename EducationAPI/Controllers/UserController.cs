using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UserController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<UserController> _logger;

		public UserController(EducationProgramContext educationProgramContext, ILogger<UserController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetAllUsers")]
		public async Task<ActionResult<List<User>>> GetAllUsers()
		{
			try
			{
				var users = await _educationProgramContext.Users
				.Include(u => u.Contact)
				.Include(u => u.Student)
				.ToListAsync();

				_logger.LogInformation("GetAllUsers(), called");
				return users;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllUsers()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetUserById/{id}")]
		public async Task<ActionResult<User>> GetUserById(int id)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Contact)
					.Include(u => u.Student)
					.FirstOrDefaultAsync(u => u.UserId == id);

				if (user == null)
				{
					_logger.LogError("GetUserById({Id}), user not found1", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetUserById({Id}), called", id);
				return user;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetUserById({Id}", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetUserByClerkId/{clerkId}")]
		public async Task<ActionResult<User>> GetUserByClerkId(string clerkId)
		{
			try
			{
				// Retrieve the user with the given ClerkId
				var user = await _educationProgramContext.Users
						.Include(u => u.Contact)
						.Include(u => u.Student)
						.FirstOrDefaultAsync(u => u.ClerkId == clerkId);

				if (user == null)
				{
					// If user with the given ClerkId doesn't exist, return 404 Not Found
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetUserByClerkId({ClerkId}), called", clerkId);
				// If user found, return it
				return user;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetUserByClerkId({ClerkId})", clerkId);
				// If an exception occurs, return 500 Internal Server Error
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

		[HttpGet("CheckUserExistsByClerkId/{clerkId}")]
		public async Task<ActionResult<bool>> CheckUserExistsByClerkId(string clerkId)
		{
			try
			{
				var userExists = await _educationProgramContext.Users.AnyAsync(u => u.ClerkId == clerkId);

				_logger.LogInformation("CheckUserExistsByClerkId({ClerkId}), called", clerkId);
				return userExists;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "CheckUserExistsByClerkId({ClerkId})", clerkId);
				// If an exception occurs, return false
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("IsUserEnrolledInCourse/{clerkId}/{courseId}")]
		public async Task<ActionResult<bool>> IsUserEnrolledInCourse(string clerkId, int courseId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Student)
					.ThenInclude(s => s!.Attendances)
					.FirstOrDefaultAsync(u => u.ClerkId == clerkId);

				if (user == null)
				{
					_logger.LogError("IsUserEnrolledInCourse({ClerkId}, {CourseId}), user not found.", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
					.FirstOrDefaultAsync(c => c.CourseId == courseId);

				if (course == null)
				{
					_logger.LogError("IsUserEnrolledInCourse({ClerkId}, {CourseId}), course not found.", clerkId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// Check if there are any attendances for the user and the course
				var isSignedUp = user.Student?.Attendances != null &&
												 user.Student.Attendances.Any(a => a.Class?.CourseId == courseId);


				return isSignedUp;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "IsUserEnrolledInCourse({ClerkId}, {CourseId})", clerkId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpGet("IsUserAdminByClerkId/{clerkId}")]
		public async Task<ActionResult<bool>> IsUserAdminByClerkId(string clerkId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.FirstOrDefaultAsync(u => u.ClerkId == clerkId);

				if (user == null)
				{
					_logger.LogError("IsUserAdminByClerkId({ClerkId}), Record not found!", clerkId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("IsUserAdminByClerkId({ClerkId}), called", clerkId);
				return user.IsAdmin;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "IsUserAdminByClerkId({ClerkId})", clerkId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPost("PostUser")]
		public async Task<ActionResult> PostUser(User user)
		{
			try
			{
				_educationProgramContext.Users.Add(user);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("PostUser({User}), called", user);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostUser({User})", user);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Updates the contact information of a user in the system.
		/// </summary>
		/// <param name="user">
		/// The <see cref="User"/> object with <see cref="Contact"/> information containing the updated contact 
		/// information.
		/// </param>
		/// <returns>
		/// Returns an HTTP status code indicating the result of the update operation:
		/// - 200 Okay: If the contact information is successfully updated.
		/// - 400 Bad Request: If the provided user object does not contain valid contact information.
		/// - 404 Not Found: If the user to be updated is not found in the database.
		/// - 500 Internal Server Error: If an unexpected error occurs during the update process.
		/// </returns>
		[HttpPut("UpdateUserContact")]
		public async Task<ActionResult> UpdateUserContact(User user)
		{
			try
			{
				var userToUpdate = await _educationProgramContext.Users
					.Include(u => u.Contact)
					.FirstOrDefaultAsync(u => u.UserId == user.UserId);

				if (userToUpdate == null)
				{
					_logger.LogError("UpdateUserContact({User}), user not found", user);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (user.Contact != null)
				{
					// Update contact properties 
					_educationProgramContext.Entry(userToUpdate.Contact!).CurrentValues.SetValues(user.Contact);
				}
				else
				{
					_logger.LogError("UpdateUserContact({User}), user has no contact", user);
					return new StatusCodeResult((int)HttpStatusCode.BadRequest);
				}

				// Update user properties


				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateUserContact({User}), called", user);
				return new StatusCodeResult((int)HttpStatusCode.OK);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateContact({User})", user);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpDelete("DeleteUserById/{id}")]
		public async Task<ActionResult> DeleteUserById(int id)
		{
			try
			{
				var existingUser = await _educationProgramContext.Users
						.Include(u => u.Contact)
						.Include(u => u.Student)
						.FirstOrDefaultAsync(u => u.UserId == id);

				if (existingUser == null)
				{
					_logger.LogError("DeleteUserById({Id}), User not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Users.Remove(existingUser);
				await _educationProgramContext.SaveChangesAsync();
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "DeleteUserById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
