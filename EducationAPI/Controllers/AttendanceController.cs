using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
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


	}
}
