using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class EnrollStudent
	{
		public EnrollStudent() 
		{
			EnrollInfo = new HashSet<EnrollInfo>();
			EnrollContacts = new HashSet<EnrollContact>();
			EnrollHistory = new HashSet<EnrollHistory>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("enroll_student_ID")]
		public int EnrollStudentID { get; set; }

		[Column("first_name")]
		public string FirstName { get; set; } = null!;

		[Column("last_name")]
		public string LastName { get; set; } = null!;

		// one-to-many relationships 
		public ICollection<EnrollInfo>? EnrollInfo { get; set; }
		public ICollection<EnrollContact>? EnrollContacts { get; set; }
		public ICollection<EnrollHistory>? EnrollHistory { get; set; }
	}
}
