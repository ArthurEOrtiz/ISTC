using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CertificationController : ControllerBase
  {
    private readonly EducationProgramContext _educationProgramContext;
    private readonly ILogger<CertificationController> _logger;

    public CertificationController(EducationProgramContext educationProgramContext, ILogger<CertificationController> logger)
    {
      _educationProgramContext = educationProgramContext;
      _logger = logger;
    }

    [HttpGet("GetAllCertifications")]
    public async Task<ActionResult<List<Certification>>> GetAllCertifications()
    {
      try
      {
        var certs = await _educationProgramContext.Certifications
          .ToListAsync();

        _logger.LogInformation("GetAllCertifications(), called.");
        return Ok(certs);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "GetAllCourses(): {Message}", ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpGet("GetCertificationById/{certificationId}")]
    public async Task<ActionResult<Certification>> GetCertificationById(int certificationId)
    {
      try
      {
        var certification = await _educationProgramContext.Certifications
          .FirstOrDefaultAsync(c => c.CertificationId == certificationId);

        if (certification == null)
        {
          _logger.LogError("GetCertificationById({CertificationId}), certification not found", certificationId);
          return NotFound();
        }

        _logger.LogInformation("GetCertificationById({CertificationId}), called", certificationId);
        return Ok(certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "GetCertificationById({CertificationId}): {Message}", certificationId, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpGet("GetCertificationsByUserId/{userId}")]
    public async Task<ActionResult<List<Certification>>> GetCertificationsByUserId(int userId)
    {
      try
      {
        var user = await _educationProgramContext.Users
          .Include(u => u.Student)
            .ThenInclude(s => s.Certifications)
          .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null)
        {
          _logger.LogError("GetCertificationsByUserId({UserId}), user not found", userId);
          return NotFound();
        }

        _logger.LogInformation("GetCertificationsByUserId({UserId}), called", userId);
        return Ok(user.Student.Certifications);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "GetCertificationsByUserId({UserId}): {Message}", userId, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpPost("PostCertification")]
    [ProducesResponseType((int)HttpStatusCode.Created)]
    public async Task<ActionResult<Certification>> PostCertification(Certification certification)
    {
      try
      {
        await _educationProgramContext.AddAsync(certification);
        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("PostCertification({Certification}), called", certification);
        return Created(string.Empty, certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "PostCertification({Certification}): {Message}", certification, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpPost("PostCertificationToUser/{userId}")]
    [ProducesResponseType((int)HttpStatusCode.Created)]
    public async Task<ActionResult<Certification>> PostCertificationToUser(int userId, Certification certification)
    {
      try
      {
        var user = await _educationProgramContext.Users
          .Include(u => u.Student)
            .ThenInclude(s => s.Certifications)
          .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null)
        {
          _logger.LogError("PostCertificationToUser({UserId}), user not found", userId);
          return NotFound("User not found.");
        }

        if (user.Student == null)
        {
          _logger.LogError("PostCertificationToUser({UserId}), student not found", userId);
          return NotFound("Student not found.");
        }

        // Determine if there are any duplicate requests for "Mapping" or "Appraiser" certifications
        if (certification.CertificationType == CertificationType.Mapping.ToString() && (user.Student.MappingCertified || user.Student.Certifications.Any(c => c.CertificationType == CertificationType.Mapping.ToString())))
        {
          _logger.LogError("PostCertificationToUser({UserId}), Mapping certification already exists", userId);
          return BadRequest("Mapping certification already exists");
        }

        if (certification.CertificationType == CertificationType.Appraiser.ToString() && (user.Student.AppraisalCertified || user.Student.Certifications.Any(c => c.CertificationType == CertificationType.Appraiser.ToString())))
        {
          _logger.LogError("PostCertificationToUser({UserId}), Appraiser certification already exists", userId);
          return BadRequest("Appraiser certification already exists");
        }

        user.Student.Certifications.Add(certification);

        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("PostCertificationToUser({UserId}), called", userId);
        return Created(string.Empty, certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "PostCertificationToUser({UserId}): {Message}", userId, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpPut("UpdateCertification")]
    public async Task<ActionResult<Certification>> UpdateCertification(Certification certification)
    {
      try
      {
        _educationProgramContext.Update(certification);
        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("UpdateCertification({Certification}), called", certification);
        return Ok(certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "UpdateCertification({Certification}): {Message}", certification, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpPatch("ApproveCertification/{certificationId}/{requestedBy}/{approvedBy}")]
    public async Task<ActionResult<Certification>> ApproveCertification(int certificationId, int requestedBy, int approvedBy)
    {
      try
      {
        var certification = await _educationProgramContext.Certifications
          .FirstOrDefaultAsync(c => c.CertificationId == certificationId);

        if (certification == null)
        {
          _logger.LogError("ApproveCertification({CertificationId}, {RequestedBy}, {ApprovedBy}), certification not found", certificationId, approvedBy, requestedBy);
          return NotFound("Certification not found");
        }

        var student = await _educationProgramContext.Students
          .FirstOrDefaultAsync(s => s.StudentId == requestedBy);

        if (student == null)
        {
          _logger.LogError("ApproveCertification({CertificationId}, {RequestedBy}, {ApprovedBy}), student not found", certificationId, requestedBy, approvedBy);
          return NotFound("certification not found");
        }

        var admin = await _educationProgramContext.Users
          .Include(u => u.Student)
            .ThenInclude(s => s.Certifications)
          .FirstOrDefaultAsync(u => u.UserId == approvedBy);

        if (admin == null)
        {
          _logger.LogError("ApproveCertification({CertificationId}, {RequestedBy}, {ApprovedBy}), admin not found", certificationId, requestedBy, approvedBy);
          return NotFound("Admin not found");
        }

        certification.IsApproved = true;
        certification.ApprovedBy = approvedBy;
        certification.ApprovalDate = DateTime.UtcNow;

        if (certification.CertificationType == CertificationType.Mapping.ToString())
        {
          student.MappingCertified = true;
        }

        if (certification.CertificationType == CertificationType.Appraiser.ToString())
        {
          student.AppraisalCertified = true;
        }

        _educationProgramContext.Update(certification);
        _educationProgramContext.Update(student);
        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("ApproveCertification({CertificationId}, {RequestedBy}, {ApprovedBy}), called", certificationId, requestedBy, approvedBy);
        return Ok(certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "ApproveCertification({CertificationId}, {RequestedBy}, {ApprovedBy}): {Message}", certificationId, requestedBy, approvedBy, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpPatch("RevokeCertification/{certificationId}/{requestedBy}/{revokedBy}")]
    public async Task<ActionResult<Certification>> RevokeCertification(int certificationId, int requestedBy, int revokedBy)
    {
      try
      {
        var certification = await _educationProgramContext.Certifications
          .FirstOrDefaultAsync(c => c.CertificationId == certificationId);

        if (certification == null)
        {
          _logger.LogError("RevokeCertification({CertificationId}, {RequestedBy}, {RevokedBy}), certification not found", certificationId, requestedBy, revokedBy);
          return NotFound("Certification not found");
        }

        var student = await _educationProgramContext.Students
          .FirstOrDefaultAsync(s => s.StudentId == requestedBy);

        if (student == null)
        {
          _logger.LogError("RevokeCertification({CertificationId}, {RequestedBy}, {RevokedBy}), student not found", certificationId, requestedBy, revokedBy);
          return NotFound("Student not found");
        }

        var admin = await _educationProgramContext.Users
          .Include(u => u.Student)
          .FirstOrDefaultAsync(u => u.UserId == revokedBy);

        if (admin == null)
        {
          _logger.LogError("RevokeCertification({CertificationId}, {RequestedBy}, {RevokedBy}), admin not found", certificationId, requestedBy, revokedBy);
          return NotFound("User not found");
        }

        certification.IsApproved = false;
        certification.ApprovedBy = revokedBy;
        certification.ApprovalDate = DateTime.UtcNow;

        if (certification.CertificationType == CertificationType.Mapping.ToString())
        {
          student.MappingCertified = false;
        }

        if (certification.CertificationType == CertificationType.Appraiser.ToString())
        {
          student.AppraisalCertified = false;
        }

        _educationProgramContext.Update(certification);
        _educationProgramContext.Update(student);
        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("RevokeCertification({CertificationId}, {RequestedBy}, {RevokedBy}), called", certificationId, requestedBy, revokedBy);
        return Ok(certification);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "RevokeCertification({CertificationId}, {RequestedBy}, {RevokedBy}): {Message}", certificationId, requestedBy, revokedBy, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }

    [HttpDelete("DeleteCertification/{certificationId}")]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    public async Task<ActionResult> DeleteCertification(int certificationId)
    {
      try
      {
        var certification = await _educationProgramContext.Certifications
          .FirstOrDefaultAsync(c => c.CertificationId == certificationId);

        if (certification == null)
        {
          _logger.LogError("DeleteCertification({CertificationId}), certification not found", certificationId);
          return NotFound();
        }

        _educationProgramContext.Remove(certification);
        await _educationProgramContext.SaveChangesAsync();
        _logger.LogInformation("DeleteCertification({CertificationId}), called", certificationId);
        return NoContent();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "DeleteCertification({CertificationId}): {Message}", certificationId, ex.Message);
        return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
      }
    }



  }
}
