using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EducationAPI.Models
{
	public class Attendance
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int AttendanceId { get; set; }

		public bool Attended { get; set; } = false;

		[Required]
		[Column("student_id")]
		public int StudentId { get; set; }

		[Required]
		[Column("class_id")]
		public int ClassId { get; set; }

		[JsonIgnore]
		[ForeignKey("StudentId")]
		public Student Student { get; set; } = null!;

		[JsonIgnore]
		[ForeignKey("ClassId")]
		public Class Class { get; set; } = null!;
	}
}
