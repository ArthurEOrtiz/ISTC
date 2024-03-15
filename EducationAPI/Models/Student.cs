using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class Student
	{
		public Student()
		{
			Attendances = new HashSet<Attendance>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int StudentId { get; set; }

		[Required]
		public int UserId { get; set; }

		public int AccumulatedCredit { get; set; } = 0;

		public bool AppraisalCertified { get; set; } = false;

		public bool MappingCertified { get; set; } = false;

		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
