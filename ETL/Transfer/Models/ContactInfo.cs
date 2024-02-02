using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class ContactInfo
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("contact_info_ID")]
		public int ContactInfoID { get; set; }

		[ForeignKey("Student")]
		[Column("student_ID")]
		public int StudentID { get; set; }

		public string? JobTitle { get; set; }
		public string? Employer { get; set; }
		public string EmailAddr { get; set; } = null!;
		public string? AddrStreet { get; set; }
		public string? AddrSteNmbr { get; set; }
		public string? AddrCity { get; set; }
		public string? AddrState { get; set; }
		public string? AddrZip { get; set; }
		public string? TelAc { get; set; }
		public string? TelPrfx { get; set; }
		public string? TelNmbr { get; set; }
		public string? FaxAc { get; set; }
		public string? FaxPrfx { get; set; }
		public string? FaxNmbr { get; set; }

		// Navigation property to student 
		public Student student { get; set; } = null!;

	}
}
