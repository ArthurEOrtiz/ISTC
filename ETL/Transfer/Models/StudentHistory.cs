using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class StudentHistory
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("student_history_ID")]
		public int StudentHistoryID { get; set; }

		[ForeignKey("Student")]
		[Column("student_ID")]
		public int StudentID { get; set; }

		public DateTime? DateRegistered { get; set; }
		public DateTime DateSchool {  get; set; }
		public string SchoolType { get; set; } = null!;
		public int Seq {  get; set; }
		public int? CSeq { get; set; }	

		// Navigation property to student. 
		public Student student { get; set; } = null!;
	}
}
