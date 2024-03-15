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


		[HttpGet("CheckUserExistsByClerkId/{clerkId}")]
		public async Task<bool> CheckUserExistsByClerkId(string clerkId)
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
				return false;
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
