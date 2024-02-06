using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class StudentCourseHistory
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("course_info_ID")]
		public int CourseInfoID { get; set; }

		[ForeignKey("Student")]
		[Column("student_ID")]
		public int StudentID { get; set; }

		public DateTime? DateRegistered { get; set; }
		public DateTime DateSchool { get; set; }
		public string SchoolType { get; set; } = null!;
		public int Seq { get; set; }
		public bool? C01 { get; set; }
		public bool? C02 { get; set; }
		public bool? C03 { get; set; }
		public bool? C04 { get; set; }
		public bool? C05 { get; set; }
		public bool? C06 { get; set; }
		public bool? C07 { get; set; }
		public bool? C08 { get; set; }
		public bool? C09 { get; set; }
		public bool? C10 { get; set; }
		public bool? C11 { get; set; }
		public bool? C12 { get; set; }
		public bool? C13 { get; set; }
		public bool? C14 { get; set; }
		public bool? C15 { get; set; }
		public bool? C16 { get; set; }
		public bool? C17 { get; set; }
		public bool? C18 { get; set; }
		public bool? C19 { get; set; }
		public bool? C20 { get; set; }
		public bool? C21 { get; set; }
		public bool? C22 { get; set; }
		public bool? C23 { get; set; }
		public bool? C24 { get; set; }
		public bool? C25 { get; set; }
		public bool? C26 { get; set; }
		public bool? C27 { get; set; }
		public bool? C28 { get; set; }
		public bool? C29 { get; set; }
		public bool? C30 { get; set; }
		public bool? C31 { get; set; }
		public bool? C32 { get; set; }
		public bool? C33 { get; set; }
		public bool? C34 { get; set; }
		public bool? C35 { get; set; }
		public bool? C36 { get; set; }
		public bool? C37 { get; set; }
		public bool? C38 { get; set; }
		public bool? C39 { get; set; }
		public bool? C40 { get; set; }

		// Navigation property to student
		public Student student { get; set; } = null!;
	}
}
