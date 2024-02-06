using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	internal class CourseSeq
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("course_seq_ID")]
		public int CourseSeqID { get; set; }
		public int StudentID { get; set; }
		public DateTime DateSchool {  get; set; }
		public string SchoolType { get; set; } = null!;
		public int Seq {  get; set; }
		public int CSeq { get; set; }	
	}
}
