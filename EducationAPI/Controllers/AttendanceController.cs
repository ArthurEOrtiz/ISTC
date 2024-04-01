using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

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

				int accumulatedCredit = 0;

				foreach (var course in attendedCourses)
				{
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
