﻿using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AttendanceController : ControllerBase
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
					return NotFound("Attendance not found.");
				}

				_educationProgramContext.Entry(AttendanceToUpdate).CurrentValues.SetValues(attendance);
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("UpdateAttendance({Attendance}), called", attendance);
				return Ok(AttendanceToUpdate);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateAttendance({Attendance})", attendance);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("HasAttended/{attendanceId}")]
		public async Task<ActionResult<bool>> HasAttended(int attendanceId)
		{
			try
			{
				var attendance = await _educationProgramContext.Attendances
					.FirstOrDefaultAsync(a => a.AttendanceId == attendanceId);

				if (attendance == null)
				{
					_logger.LogError("HassAttended({AttendanceId}), attendance not found.", attendanceId);
					return NotFound("Attendance not found.");
				}

				_logger.LogInformation("HasAttended({AttendanceId}) called.", attendanceId);
				return Ok(attendance.Attended);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "HasAttended({AttendanceId})", attendanceId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("HasAttendedByClassIdUserId/{classId}/{userId}")]
		public async Task<ActionResult<bool>> HasAttendedByClassIdUserId(int classId, int userId)
		{
			try
			{
				var user = await _educationProgramContext.Users
					.Include(u => u.Student)
					.FirstOrDefaultAsync(u => u.UserId == userId);

				if (user == null)
				{
					_logger.LogError("HasAttendedByClassIdUserId({ClassId}, {UserId}), user not found.", classId, userId);
					return NotFound("User not found.");
				}

				var attendance = await _educationProgramContext.Attendances
					.FirstOrDefaultAsync(a => a.ClassId == classId && a.StudentId == user.Student.StudentId);

				if (attendance == null)
				{
					_logger.LogError("HasAttendedByClassIdUserId({ClassId}, {UserId}), attendance not found.", classId, userId);
					return NotFound("Attendance not found.");
				}

				_logger.LogInformation("HasAttendedByClassIdUserId({ClassId}, {UserId}) called.", classId, userId);
				return Ok(attendance.Attended);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "HasAttendedByClassIdUserId({ClassId}, {UserId})", classId, userId);
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

		[HttpPut("CalculateStudentCreditHours/{studentId}")]
		public async Task<ActionResult> CalculateStudentCreditHours(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
							.ThenInclude(c => c.Course)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("CalculateStudentCreditHours({StudentId}), student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var attendedCourses = student.Attendances
					.Where(a => a.Attended)
					.Select(a => a.Class.Course)
					.Distinct();

				if (attendedCourses == null)
				{
					_logger.LogError("CalculateStudentCreditHours({StudentId}), error finding attended courses", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				int accumulatedCredit = 0;

				foreach (var course in attendedCourses)
				{
					if (course == null)
					{
						_logger.LogError("CalculateStudentCreditHours({StudentId}), error finding attended course", studentId);
						continue;
					}

					var attendedClassIds = student.Attendances
							.Where(a => a.Attended && a.Class.CourseId == course.CourseId)
							.Select(a => a.ClassId)
							.ToList();

					var totalClassCount = course.Classes.Count;

					var attendedClassCount = await _educationProgramContext.Classes
							.Where(c => attendedClassIds.Contains(c.ClassId))
							.CountAsync();

					if (totalClassCount == attendedClassCount)
					{
						accumulatedCredit += course.AttendanceCredit;
					}
				}

				student.AccumulatedCredit = accumulatedCredit;
				await _educationProgramContext.SaveChangesAsync();
				_logger.LogInformation("CalculateStudentCreditHours({StudentId}), called", studentId);
				return new StatusCodeResult((int)HttpStatusCode.OK);

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "CalculateStudentCreditHours({StudentId})", studentId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

	}
}
