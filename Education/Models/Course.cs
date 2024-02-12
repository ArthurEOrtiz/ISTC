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
		public int CourseId { get; set; }

		[MaxLength(50)]
		public string? Title { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		[Range(0,100)]
		public int AttendanceCredit { get; set; }

		[Range(0,100)]	
		public int CompletionCredit { get; set; }

		public DateTime? EnrollmentDeadline { get; set; }

		[EmailAddress]
		public string InstructorEmail { get; set; } = null!;

		[Url]
		public string pdf { get; set; } = null!;

		public int LocationId { get; set; }

		public int? TopicId { get; set; }

		[ForeignKey("LocationId")]
		public virtual Location Location { get; set; } = null!;

		[ForeignKey("TopicId")]
		public Topic? Topic { get; set; }
		
		public virtual ICollection<Class> Classes { get; set; }
	}
}
