using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class Contact
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ContactId { get; set; }

		[EmailAddress]
		public string Email { get; set; } = null!;

		[Phone]
		public string? Phone { get; set; }

		[MaxLength(255)]	
		public string? AddressLine1 { get; set; }

		[MaxLength(255)]
		public string? AddressLine2 { get; set; }

		[MaxLength(10)]
		public string? State { get; set; }

		[MaxLength(10)]
		public string? Zip { get; set; }
	}
}
