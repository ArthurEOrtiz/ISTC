﻿using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Net;
using System.Security.Claims;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AttendanceController 
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<AttendanceController> _logger;

		public AttendanceController(EducationProgramContext educationProgramContext, ILogger<AttendanceController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpPut("UpdateAttendance")]
		public async Task<ActionResult> UpdateAttendance(Attendance attendance)
		{
			try
			{
				var AttendanceToUpdate = await _educationProgramContext.Attendances
				.FirstOrDefaultAsync(a => a.AttendanceId == attendance.AttendanceId);

				if (AttendanceToUpdate == null)
				{
					_logger.LogError("UpdateAttendance({Attendance}), attendance not found.", attendance);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Entry(AttendanceToUpdate).CurrentValues.SetValues(attendance);
				_logger.LogInformation("UpdateAttendance({Attendance}), called", attendance);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateAttendance({Attendance})", attendance);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("UpdateAttendanceById/{attendanceId}/{attended}")]
		public async Task<ActionResult> UpdateAttendanceById(int attendanceId, bool attended)
		{
			try
			{
				var AttendanceToUpdate = await _educationProgramContext.Attendances
				.FirstOrDefaultAsync(a => a.AttendanceId == attendanceId);

				if (AttendanceToUpdate == null)
				{
					_logger.LogError("UpdateAttendanceById({AttendanceId},{attended}), attendance not found.", attendanceId, attended);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				AttendanceToUpdate.Attended = attended;
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateAttendanceById({AttendanceId}, {attended})", attendanceId, attended);
				return new StatusCodeResult((int)HttpStatusCode.OK);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateAttendanceById({AttendanceId},{attended})", attendanceId, attended);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPut("UpdateAttendanceCreditsById/{attendanceId}")]
		public async Task<ActionResult> UpdateAttendanceCreditsById(int attendanceId)
		{
			try
			{
				var attendance = await _educationProgramContext.Attendances
					.Include(a => a.Student)
					.FirstOrDefaultAsync(a => a.AttendanceId == attendanceId);

				if (attendance == null)
				{
					_logger.LogError("UpdateAttendanceCreditsById({attendanceId}), attendance not found", attendanceId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var course = await _educationProgramContext.Courses
					.Include(c => c.Classes)
						.ThenInclude(c => c.Attendances)
							.ThenInclude(a  => a.Student)
					.FirstOrDefaultAsync(c => c.Classes.Any() && c.Classes.Any(cl => cl.ClassId == attendance.ClassId));

				if (course == null)
				{
					_logger.LogError("UpdateAttendanceCreditsById({attendanceId}), course not found", attendanceId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				int classCount = course.Classes.Count;

				//int attended = course.Classes
				//		.SelectMany(cl => cl.Attendances) // Flatten attendances for all classes
				//		.Count(att => att.ClassId == attendance.ClassId && att.StudentId == attendance.StudentId && att.Attended);

				int attended = 0;
				foreach (var @class in course.Classes)
				{
					foreach (var att in @class.Attendances)
					{
						if (att.StudentId == attendance.StudentId && att.Attended)
						{
							attended++;
						}
					}
				}

				if (classCount == attended)
				{
					attendance.Student.AccumulatedCredit += course.AttendanceCredit;
				}
				else if (classCount < attended)
				{
					throw new ArithmeticException("Attendance count higher than class count.");
				}
				
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateAttendanceCreditsById({attendanceId}), called.", attendanceId);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateAttendanceCreditsById({attendanceId})", attendanceId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

	}
}