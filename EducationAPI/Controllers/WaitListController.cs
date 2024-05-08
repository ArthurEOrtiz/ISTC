using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class WaitListController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<UserController> _logger;

		public WaitListController(EducationProgramContext educationProgramContext, ILogger<UserController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetAllWaitLists")]
		public async Task<ActionResult<List<WaitList>>> GetAllWaitLists()
		{
			try
			{
				var waitLists = await _educationProgramContext.WaitLists.ToListAsync();

				_logger.LogInformation("GetAllWaitLists(), called.");
				return waitLists;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllWaitLists()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetWaitListById/{id}")]
		public async Task<ActionResult<WaitList>> GetWaitListById(int id)
		{
			try
			{
				var waitList = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.WaitListId == id);
				if (waitList == null)
				{
					_logger.LogError("GetWaitListByID({Id}), no wait list found.", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetWaitListById({Id}), called.", id);
				return waitList;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetWaitListById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetCourseWaitList/{courseId}")]
		public async Task<ActionResult<List<User>>> GetCourseWaitList(int courseId)
		{
			try
			{
				bool doesCourseExist = await _educationProgramContext.Courses
					.AnyAsync(c => c.CourseId == courseId);

				if (!doesCourseExist)
				{
					_logger.LogError("GetCourseWaitList({CourseId}), course not found.", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var waitLists = await _educationProgramContext.WaitLists
					.Where(w => w.CourseId == courseId)
					.ToListAsync();

				//Get the user ids from the wait list
				var userIds = waitLists.Select(wl => wl.UserId).ToList();

				// Fetch the users with those IDs
				var users = await _educationProgramContext.Users
					.Where(u => userIds.Contains(u.UserId))
					.ToListAsync();

				_logger.LogInformation("GetCourseWaitList({CourseId}), called.", courseId);
				return users;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetCourseWaitList({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPost("PostWaitList")]
		[ProducesResponseType((int)HttpStatusCode.Created)]
		public async Task<ActionResult> PostWaitList(WaitList waitList)
		{
			try
			{
				_educationProgramContext.WaitLists.Add(waitList);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("PostWaitList({WaitList}) called.", waitList);
				return new CreatedAtActionResult(nameof(GetWaitListById), "WaitList", new { id = waitList.WaitListId}, waitList);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostWaitList({WaitList})", waitList);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("UpdateWaitList")]
		public async Task<ActionResult> UpdateWaitList(WaitList waitList)
		{
			try
			{
				var waitListToUpdate = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.WaitListId == waitList.WaitListId);

				if (waitListToUpdate == null)
				{
					_logger.LogError("UpdateWaitList({WaitList}), wait list not found.", waitList);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Entry(waitListToUpdate).CurrentValues.SetValues(waitList);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateWaitList({WaitList}), called.", waitList);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateWaitList({WaitList})", waitList);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("DeleteWaitListById/{id}")]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		public async Task<ActionResult> DeleteWaitListById(int id)
		{
			try
			{
				var waitList = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.WaitListId == id);

				if (waitList == null)
				{
					_logger.LogError("DeleteWaitListByID({Id}), wait list not found.", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.WaitLists.Remove(waitList);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("DeleteWaitListById({Id}) called.", id);
				return new StatusCodeResult((int)HttpStatusCode.NoContent);
			}
			catch(Exception ex)
			{
				_logger.LogError(ex, "DeleteWaitListById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("IsUserWaitListed/{courseId}/{userId}")]
		public async Task<ActionResult<bool>> IsUserWaitListed(int courseId, int userId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.WaitLists)
					.FirstOrDefaultAsync(c => c.CourseId == courseId);

				if (course == null)
				{
					_logger.LogError("IsUserWaitListed({CourseId},{UserId}), course not found.", courseId, userId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var user = await _educationProgramContext.Users
					.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("IsUserWaitListed({CourseId},{UserId}), user not found.", courseId, userId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("IsUserWaitListed({CourseId},{UserId}), called", courseId, userId);
				return course.WaitLists.Any(wl => wl.UserId == userId);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"IsUserWaitListed({CourseId},{UserId})", courseId, userId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetWaitListByUserIdCourseId/{userId}/{courseId}")]
		public async Task<ActionResult<WaitList>> GetWaitListByUserIdCourseId(int userId, int courseId)
		{
			try
			{
				var waitList = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.UserId == userId && w.CourseId == courseId);

				if (waitList == null)
				{
					_logger.LogError("GetWaitListByUserIdCourseId({UserId},{CourseId}), wait list not found.", userId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetWaitListByUserIdCourseId({UserId},{CourseId}), called.", userId, courseId);
				return waitList;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetWaitListByUserIdCourseId({UserId},{CourseId})", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetEnrollmentQueue/{courseId}")]
		public async Task<ActionResult<List<User>>> GetEnrollmentQueue(int courseId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.WaitLists)
					.FirstOrDefaultAsync(c => c.CourseId == courseId);

				if (course == null)
				{
					_logger.LogError("GetEnrollmentQueue({CourseId}), course not found.", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// get the wait list for the course where ToEnroll is true
				var enrollmentQue = course.WaitLists
					.Where(wl => wl.ToEnroll == true)
					.ToList();

				// using the enrollment queue, get the user ids and return the list of users
				
				List<User> users = new ();
				
				foreach (var waitList in enrollmentQue)
				{
					var user = await _educationProgramContext.Users
						.FirstOrDefaultAsync(u => u.UserId == waitList.UserId);

					if (user != null)
					{
						users.Add(user);
					}
				}

				_logger.LogInformation("GetEnrollmentQueue({CourseId}), called.", courseId);
				return users;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetEnrollmentQueue({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetDropQueue/{courseId}")]
		public async Task<ActionResult<List<User>>> GetDropQueue(int courseId)
		{
			try
			{
				var course = await _educationProgramContext.Courses
					.Include(c => c.WaitLists)
					.FirstOrDefaultAsync(c => c.CourseId == courseId);

				if (course == null)
				{
					_logger.LogError("GetDropQueue({CourseId}), course not found.", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				// get the wait list for the course where ToEnroll is false
				var dropQueue = course.WaitLists
					.Where(wl => wl.ToEnroll == false)
					.ToList();

				// using the drop queue, get the user ids and return the list of users
				List<User> users = new ();

				foreach (var waitList in dropQueue)
				{
					var user = await _educationProgramContext.Users
						.FirstOrDefaultAsync(u => u.UserId == waitList.UserId);

					if (user != null)
					{
						users.Add(user);
					}
				}

				_logger.LogInformation("GetDropQueue({CourseId}), called.", courseId);
				return users;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetDropQueue({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("DeleteWaitListByUserIdCourseId/{userId}/{courseId}")]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		public async Task<ActionResult> DeleteWaitListByUserIdCourseId(int userId, int courseId)
		{
			try
			{
				var waitList = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.UserId == userId && w.CourseId == courseId);

				if (waitList == null)
				{
					_logger.LogError("DeleteWaitListByUserIdCourseId({UserId},{CourseId}), wait list not found.", userId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.WaitLists.Remove(waitList);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("DeleteWaitListByUserIdCourseId({UserId},{CourseId}), called.", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.NoContent);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "DeleteWaitListByUserIdCourseId({UserId},{CourseId})", userId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}



	}
}
