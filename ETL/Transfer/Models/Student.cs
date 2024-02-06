using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class Student
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("student_ID")]
		public int StudentID { get; set; }

		[Column("first_name")]
		public string? FirstName { get; set; }

		[Column("last_name")]
		public string? LastName { get; set; }

		// one-to-many relationships 
		public List<StudentInfo> StudentInfo { get; set; } = null!;
		public List<ContactInfo> ContactInfo { get; set; } = null!;
		public List<StudentCourseHistory> StudentCourseHistory { get; set; } = null!;
	}
}
