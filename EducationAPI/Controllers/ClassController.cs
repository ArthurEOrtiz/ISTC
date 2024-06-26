﻿using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ClassController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<ClassController> _logger;

		public ClassController(EducationProgramContext educationProgramContext, ILogger<ClassController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		/// <summary>
		/// Gets a class record by class Id	
		/// </summary>
		/// <param name="id"><see cref="int"/> of <see cref="Class.ClassId"/></param>
		/// <returns>Single instance of <see cref="Class"/></returns>
		[HttpGet("GetClassById")]
		public async Task<ActionResult<Class>> GetClassById(int id)
		{
			try
			{
				var @class = await _educationProgramContext.Classes
					.FirstOrDefaultAsync(c => c.ClassId == id);

				if (@class != null)
				{
					return @class;
				}
				else
				{
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetClassById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetClassesByDateRange")]
		public async Task<ActionResult<List<Class>>> GetClassesByDateRange(DateTime startDate, DateTime endDate)
		{
			try
			{
				var classesInRange = await _educationProgramContext.Classes
					.Where(c => c.ScheduleStart >= startDate && c.ScheduleStart >= endDate)
					.ToListAsync();

				if (classesInRange == null)
				{
					_logger.LogError("GetClassesByDateRange({StartDate}, {EndDate}), record not found.", startDate, endDate);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetClassesByDateRange({StartDate}, {EndDate}), called", startDate, endDate);
				return classesInRange;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetClassesByDateRange({StartDate}, {EndDate})", startDate, endDate);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetClassesByCourseId/{courseId}")]
		public async Task<ActionResult<List<Class>>> GetClassesByCourseId(int courseId)
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
					_logger.LogError("GetClassesByCourseId({CourseId}), course not found", courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetClassesByCourseId({CourseId}) called", courseId);
				return course.Classes.ToList();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"GetClassesByCourseId({CourseId})", courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		/// <summary>
		/// Allows you to change the Schedule Start and Schedule Stop properties of a class. 
		/// </summary>
		/// <param name="id">
		/// <see cref="int"/> of <see cref="Class.ClassId"/>
		/// </param>
		/// <param name="newScheduleStart">
		/// <see cref="DateTime"/> of new <see cref="Class.ScheduleStart"/>
		/// </param>
		/// <param name="newScheduleStop">
		/// <see cref="DateTime"/> of new <see cref="Class.ScheduleEnd"/>
		/// </param>
		/// <returns> Status code 200</returns>
		[HttpPost("EditClassById")]
		public async Task<ActionResult> EditClassById(int id, DateTime newScheduleStart, DateTime newScheduleStop)
		{
			try
			{
				var existingClass = await _educationProgramContext.Classes
					.FirstOrDefaultAsync(c => c.ClassId == id);

				if (existingClass == null)
				{
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				existingClass.ScheduleStart = newScheduleStart;
				existingClass.ScheduleEnd = newScheduleStop;

				_educationProgramContext.Update(existingClass);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("EditClassById({Id},{newStartDate},{newEndDate})", id, newScheduleStart, newScheduleStop);
				return new StatusCodeResult((int)HttpStatusCode.OK);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "EditClassById({Id}, {newStartDate}, {newEndDate})", id, newScheduleStart, newScheduleStop);
				return new StatusCodeResult((int)HttpStatusCode.NotModified);
			}
		}

		/// <summary>
		/// Deletes a single record by class Id 
		/// </summary>
		/// <param name="id"><see cref="int"/> of <see cref="Class.ClassId"/></param>
		/// <returns>Status code 200</returns>
		[HttpDelete("DeleteClassById")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> DeleteClassById(int id)
		{
			try
			{
				var existingClass = await _educationProgramContext.Classes
						.FirstOrDefaultAsync(c => c.ClassId == id);

				if (existingClass == null)
				{
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Classes.Remove(existingClass);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("DeleteClassById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "DeleteClassById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		/// <summary>
		/// Adds a new class to the identified instance of a course by its course Id. 
		/// </summary>
		/// <param name="courseId">
		/// <see cref="Course.CourseId"/>
		/// </param>
		/// <param name="newStartDate">
		/// <see cref="DateTime"/> of the start of class for <see cref="Class.ScheduleStart"/>
		/// </param>
		/// <param name="newEndDate">
		/// <see cref="DateTime"/> of the end of class for <see cref="Class.ScheduleEnd"/>
		/// </param>
		/// <returns>
		/// The <see cref="Class"/> instance created for the <see cref="Course"/>, and status code 201. 
		/// </returns>
		[HttpPost("AddClassByCourseId")]
		[ProducesResponseType(StatusCodes.Status201Created)]
		public async Task<ActionResult> AddClassByCourseId(int courseId, DateTime newStartDate, DateTime newEndDate)
		{
			try
			{
				var course = await _educationProgramContext.Courses
				.FirstOrDefaultAsync();

				if (course == null)
				{
					_logger.LogError("No Record Found, AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				Class newClass = new()
				{
					CourseId = courseId,
					ScheduleStart = newStartDate,
					ScheduleEnd = newEndDate,
				};

				_educationProgramContext.Classes.Add(newClass);

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
				
				return new CreatedAtActionResult(nameof(GetClassById), "Class", new {id = newClass.ClassId }, newClass);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "AddClassByCourseId({CourseId}, {NewStartDate}, {NewEndDate}", courseId, newStartDate, newEndDate);
				return new StatusCodeResult((int)(HttpStatusCode.InternalServerError));
			}
		}

	}
}
