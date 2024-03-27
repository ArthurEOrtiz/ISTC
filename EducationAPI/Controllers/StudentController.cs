﻿using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class StudentController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<StudentController> _logger;

		public StudentController(EducationProgramContext educationProgramContext, ILogger<StudentController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetStudentById/{studentId}")]
		public async Task<ActionResult<Student>> GetStudentById(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("GetStudentById({StudentId}) student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetStudentById({StudentId}) called", studentId);
				return student;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetStudentById({StudentId})", studentId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetStudentAttendanceById/{studentId}")]
		public async Task<ActionResult<List<Attendance>>> GetStudentAttendanceById(int studentId)
		{
			try
			{
				var student = await _educationProgramContext.Students
					.Include(s => s.Attendances)
						.ThenInclude(a => a.Class)
					.FirstOrDefaultAsync(s => s.StudentId == studentId);

				if (student == null)
				{
					_logger.LogError("GetStudentAttendanceById({Id}), student not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				if (student.Attendances == null)
				{
					_logger.LogError("GetStudentAttendanceById({Id}), attendance not found", studentId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetStudentAttendanceById({Id}), called", studentId);
				return student.Attendances.ToList();
				
			}
			catch (Exception ex)
			{
				_logger.LogError(ex,"GetStudentAttendanceById({Id})", studentId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


	}
}
