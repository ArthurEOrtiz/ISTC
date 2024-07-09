using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
  public class Certification
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CertificationId { get; set; }

    [Required]
    [EnumDataType(typeof(CertificationType), ErrorMessage = "Invalid certification type")]
    public string CertificationType { get; set; } = null!;

    [Required]
    public DateTime RequestDate { get; set; }

    public DateTime? ApprovalDate {  get; set; }

    public bool IsApproved { get; set; } = false;

    public int? ApprovedBy { get; set; }

  }
}
