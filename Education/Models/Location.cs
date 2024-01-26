using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	[Table("Location")]
	public class Location
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("location_ID")]
		public int LocationId { get; set; }

		[Column("description")]
		[MaxLength(255)]
		public string? Description { get; set; }

		[Column("room")]
		[MaxLength(50)]
		public string? Room { get; set; }

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
		public string? PostalCode { get; set; }

	}
}
