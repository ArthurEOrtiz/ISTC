﻿using EducationAPI.DataAccess;
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

				_logger.LogInformation("GetAllWaitLists(), called");
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
					_logger.LogError("GetWaitListByID({Id}), no wait list found", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetWaitListById({Id}), called", id);
				return waitList;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetWaitListById({Id})", id);
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

				_logger.LogInformation("PostWaitList({WaitList}) called", waitList);
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
					_logger.LogError("UpdateWaitList({WaitList}), wait list not found", waitList);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Entry(waitListToUpdate).CurrentValues.SetValues(waitList);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateWaitList({WaitList}), called", waitList);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateWaitList({WaitList})", waitList);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpDelete("DeleteWaitListById/{id}")]
		public async Task<ActionResult> DeleteWaitListById(int id)
		{
			try
			{
				var waitList = await _educationProgramContext.WaitLists
					.FirstOrDefaultAsync(w => w.WaitListId == id);

				if (waitList == null)
				{
					_logger.LogError("DeleteWaitListByID({Id}), wait list not found", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.WaitLists.Remove(waitList);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("DeleteWaitListById({Id}) called", id);
				return new StatusCodeResult((int)HttpStatusCode.OK);
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

	}
}
