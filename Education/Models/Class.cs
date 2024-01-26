using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	public class Class
	{
		public Class() 
		{ 
			Attendances = new HashSet<Attendance>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("class_ID")]
		public int ClassId { get; set; }

		[Required]
		[Column("course_id")]
		public int CourseId { get; set; }

		[Column("schedule_start")]
		public DateTime? ScheduleStart { get; set; }

		[Column("schedule_end")]
		public DateTime? ScheduleEnd { get; set; }


		[ForeignKey("CourseId")]
		public virtual Course? Course { get; set; }
	
		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
