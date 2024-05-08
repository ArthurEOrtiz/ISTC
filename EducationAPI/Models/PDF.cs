using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
  public class PDF
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PDFId { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 1, ErrorMessage ="File name must be between 1 and 50 characters long.")]
    [FileExtensions(Extensions =  "pdf", ErrorMessage = "The file must be a pdf")]
    public string FileName { get; set; } = string.Empty;

    [Required]
    [MinLength(1, ErrorMessage = "The Data property cannot be empty. Please provide valid PDF data.")]
    public byte[] Data { get; set; } = [];

  }
}
