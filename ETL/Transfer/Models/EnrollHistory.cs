using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	public class EnrollHistory
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("Enroll_history_ID")]
		public int EnrollHistoryID { get; set; }

		[ForeignKey("EnrollStudent")]
		[Column("enroll_student_ID")]
		public int EnrollStudentID { get; set; }

		public DateTime? DateRegistered { get; set; }
		public DateTime DateSchool {  get; set; }
		public string SchoolType { get; set; } = null!;
		public int Seq {  get; set; }
		public int? CSeq { get; set; }	

		// Navigation property to student. 
		public EnrollStudent EnrollStudent { get; set; } = null!;
	}
}
