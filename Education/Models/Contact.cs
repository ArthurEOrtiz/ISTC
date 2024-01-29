using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	public class Contact
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("contact_ID")]
		public int ContactId { get; set; }

		[Column("email")]
		[MaxLength(255)]
		public string? Email { get; set; }

		[Column("phone")]
		[MaxLength(15)]
		public string? Phone { get; set; }

		[Column("address_line_1")]
		[MaxLength(255)]	
		public string? AddressLine1 { get; set; }

		[Column("address_line_2")]
		[MaxLength(255)]
		public string? AddressLine2 { get; set; }

		[Column("state")]
		[MaxLength(10)]
		public string? State { get; set; }

		[Column("postal_code")]
		[MaxLength(10)]
		public string? Zip { get; set; }
	}
}
