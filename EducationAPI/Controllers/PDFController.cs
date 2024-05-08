using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EducationAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PDFController : ControllerBase
  {
    private readonly EducationProgramContext _educationProgramContext;
    private readonly ILogger _logger;

    public PDFController(EducationProgramContext educationProgramContext, ILogger<UserController> logger)
    {
      _educationProgramContext = educationProgramContext;
      _logger = logger;
    }

    [HttpPost("UploadPDF/{courseId}")]
    public async Task<ActionResult> UploadPDFToCourse(int courseId, IFormFile file)
    {
      if (courseId == 0)
      {
        return BadRequest("Course Id Error.");
      }

      if (file == null || file.Length == 0)
      {
        return  BadRequest("No file received");
        //return new StatusCodeResult((int)HttpStatusCode.BadRequest);
      }

      if (file.ContentType != "application/pdf")
      {
        
        return BadRequest("File must be a .pdf");
      }

      try
      {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        PDF pdf = new()
        {
          FileName = file.FileName,
          Data = memoryStream.ToArray()
        };

        _educationProgramContext.PDFs.Add(pdf);
        await _educationProgramContext.SaveChangesAsync();

        _logger.LogInformation("UploadPDFToCourse({CourseId}, {File})", courseId, file.FileName);
        return new StatusCodeResult((int)HttpStatusCode.OK);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "UploadPDF({CourseId},{File})", courseId, file.Name);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpGet("DownloadPDF/{pDFId}")]
    public async Task<ActionResult> DownloadPDF(int pDFId)
    {
      try
      {
        var pdf = await _educationProgramContext.PDFs.FindAsync(pDFId);

        if (pdf == null)
        {
          return NotFound("PDF not found");
        }

        _logger.LogInformation("DownloadPDF({PDFId}), called", pDFId);
        return File(pdf.Data, "application/pdf", pdf.FileName);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "DownloadPDF({PDFId})", pDFId);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    
  }
}
