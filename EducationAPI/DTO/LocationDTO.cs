using System.ComponentModel.DataAnnotations;

namespace EducationAPI.DTO
{
  public class LocationDTO
  {
    public int LocationId { get; set; }
    [MaxLength(255)]
    public string? Description { get; set; }

    [MaxLength(50)]
    public string? Room { get; set; }

    [Url]
    public string? RemoteLink { get; set; }

    [MaxLength(255)]
    public string? AddressLine1 { get; set; }

    [MaxLength(255)]
    public string? AddressLine2 { get; set; }

    [MaxLength(50)]
    public string? City { get; set; }

    [MaxLength(10)]
    public string? State { get; set; }

    [MaxLength(10)]
    public string? PostalCode { get; set; }
  }
}
