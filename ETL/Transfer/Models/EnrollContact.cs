using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class EnrollContact
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("enroll_contact_ID")]
		public int EnrollContactID { get; set; }

		[ForeignKey("EnrollStudent")]
		[Column("enroll_student_ID")]
		public int EnrollStudentID { get; set; }

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
		public EnrollStudent EnrollStudent { get; set; } = null!;

	}
}
