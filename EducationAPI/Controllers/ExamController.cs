using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EducationAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ExamController : ControllerBase
  {
    private readonly EducationProgramContext _educationProgramContext;
    private readonly ILogger<ExamController> _logger;

    public ExamController(EducationProgramContext educationProgramContext, ILogger<ExamController> logger)
    {
      _educationProgramContext = educationProgramContext;
      _logger = logger;
    }

    [HttpGet("GetExamsByCourseId/{courseId}")]
    public async Task<ActionResult<List<Exam>>> GetExamsByCourseId(int courseId)
    {
      try
      {
        var exams = await _educationProgramContext.Exams
          .Where(e => e.CourseId == courseId).ToListAsync();
        
        _logger.LogInformation("GetExamsByCourseId({courseId}) called.", courseId);
        return Ok(exams);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "GetExamsByCourseId({courseId})", courseId);
        return StatusCode(500);
      }
    }

    [HttpPut("UpdateExam")]
    public async Task<ActionResult<Exam>> UpdateExam(Exam exam)
    {
      try
      {
        _educationProgramContext.Entry(exam).State = EntityState.Modified;
        await _educationProgramContext.SaveChangesAsync();
        
        _logger.LogInformation("UpdateExam({exam}) called.", exam);
        return Ok(exam);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "UpdateExam({exam})", exam);
        return StatusCode(500);
      }
    }
  }
}
