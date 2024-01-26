using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	/// <summary>
	/// Represent a course in available for the user to sign up for. 
	/// A Course has properties that give it a title and description.
	/// It also tracks attendance and completion credits. 
	/// If the admin assigns this course to a topic, it should have 
	/// a topic id, null if otherwise. 
	/// The admin can assign an location to the course, or, say in the
	/// instance this course is online, can be null. 
	/// A course can have one or many classes that represent day, or 
	/// days the class is being held. 
	/// </summary>
	public class Course
	{
		public Course()
		{
			Classes = new HashSet<Class>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("course_ID")]
		public int CourseId { get; set; }

		[Column("title")]
		[MaxLength(50)]
		public string? Title { get; set; }

		[Column("description")]
		[MaxLength(255)]
		public string? Description { get; set; }

		[Column("attendance_credit")]
		public int? AttendanceCredit { get; set; }

		[Column("completion_credit")]
		public int? CompletionCredit { get; set; }

		[Column("enrollment_deadline")]
		public DateTime? EnrollmentDeadline { get; set; }

		[Column("location_id")]
		public int? LocationId { get; set; }

		[Column("topic_id")]
		public int? TopicId { get; set; }


		[ForeignKey("LocationId")]
		public virtual Location? Location { get; set; }

		[ForeignKey("TopicId")]
		public virtual Topic? Topic { get; set; }
		
		public virtual ICollection<Class> Classes { get; set; }
	}
}
