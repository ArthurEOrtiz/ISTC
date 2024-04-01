using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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

		[HttpPut("CalculateStudentCreditHours/{studentId}")]
		public async Task<ActionResult> CalculateStudentCreditHours(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("CalculateStudentCreditHours({StudentId}), student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				var attendedClasses = student.Attendances
					.Where(a => a.Attended)
					.ToList();

				// Return and array of ID's of classes attended 
				var attendedClassesIds = student.Attendances
							 .Where(a =>  a.Attended)
							 .Select(a => a.ClassId)
							 .ToList();


				var attendedCoursesIds = await _educationProgramContext.Classes
								.Where(c => attendedClassesIds.Contains(c.ClassId))
								.GroupBy(c => c.CourseId)
								.Where(g => g.All(c => attendedClassesIds.Contains(c.ClassId)))
								.Select(g => g.Key)
								.ToListAsync();

				List<Course> coursesWithAllChildClassesAttended = new();
				int accumulatedCredit = 0;

				foreach (var courseId in attendedCoursesIds)
				{
					var course = await _educationProgramContext.Courses
						.Include(c => c.Classes)
						.FirstOrDefaultAsync(c => c.CourseId == courseId);

					if (course == null)
					{
						_logger.LogError("CalculateStudentCreditHours({StudentId}), course not found", studentId);
						return new StatusCodeResult((int)HttpStatusCode.NotFound);
					}

					int classCount = course.Classes.Count;
					int attendance = 0;

					foreach ( var @class in course.Classes)
					{
						foreach (var attendedClass in attendedClasses)
						{
							if (attendedClass.ClassId == @class.ClassId)
							{
								attendance++;
							}
						}
					}

					if ( attendance == classCount )
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
