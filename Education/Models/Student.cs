using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	public class Student
	{
		public Student()
		{
			Attendances = new HashSet<Attendance>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("student_ID")]
		public int StudentId { get; set; }

		[Column("first_name")]
		[MaxLength(50)]
		public string? FirstName { get; set; }

		[Column("last_name")]
		[MaxLength(50)]
		public string? LastName { get; set; }

		[Column("middle_name")]
		[MaxLength(50)]
		public string? MiddleName { get; set; }

		[Column("appraisal_certified")]
		public bool AppraisalCertified { get; set; } = false;

		[Column("mapping_certified")]
		public bool MappingCertified { get; set; } = false;

		[Column("contact_id")]
		public int? ContactId { get; set; }


		[ForeignKey("ContactId")]
		public virtual Contact? Contact { get; set; }
		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
