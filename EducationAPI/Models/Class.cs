using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class Class
	{
		public Class()
		{
			Attendances = new HashSet<Attendance>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ClassId { get; set; }

		[Required]
		public int CourseId { get; set; }

		public DateTime ScheduleStart { get; set; }

		public DateTime ScheduleEnd { get; set; }

		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
