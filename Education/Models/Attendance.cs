using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	[Table("Attendance")]
	public class Attendance
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("attendance_ID")]
		public int AttendanceId { get; set; }

		[Column("attended")]
		public bool Attended { get; set; } = false;

		[Required]
		[Column("student_id")]
		public int StudentId { get; set; }

		[Required]
		[Column("class_id")]
		public int ClassId { get; set; }

		[ForeignKey("StudentId")]
		public Student Student { get; set; } = null!;

		[ForeignKey("ClassId")]
		public Class Class { get; set; } = null!;
	}
}
