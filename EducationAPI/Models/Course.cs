using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	/// <summary>
	/// Represent a course that are available for the user to sign up for. 
	/// A Course has properties that give it a title and description.
	/// It also tracks attendance and completion credits. 
	/// If the admin assigns this course to a topic, it should have 
	/// a topic id, null if otherwise. 
	/// The admin can assign an location to the course.
	/// A course can have one or many classes that represent day, or 
	/// days the class is being held. 
	/// </summary>
	public class Course
	{
		public Course()
		{
			Location = new Location();
			Classes = new HashSet<Class>();
			Topics = new HashSet<Topic>();	
			Exams = new HashSet<Exam>();
			WaitLists = new HashSet<WaitList>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int CourseId { get; set; }

		[Required]
		[MaxLength(50)]
		public string Title { get; set; } = null!;

		[MaxLength(500)]
		public string? Description { get; set; }

		[Range(0, 100)]
		public int AttendanceCredit { get; set; }

		public bool HasExam { get; set; }

		[Range(0, 100)]
		public int? ExamCredit { get; set; }

		public int MaxAttendance { get; set; }

		public DateTime EnrollmentDeadline { get; set; }

		[MaxLength(50)]
		public string? InstructorName { get; set; }

		[EmailAddress]
		public string? InstructorEmail { get; set; }

		public int? PDFId { get; set; }

		public int LocationId { get; set; }

		[ForeignKey("LocationId")]
		public virtual Location Location { get; set; }

		[ForeignKey("PDFId")]
		public virtual PDF? PDF { get; set; }

		public virtual ICollection<Topic> Topics { get; set; }

		public virtual ICollection<Class> Classes { get; set; }

		public virtual ICollection<Exam> Exams { get; set; }
		
		public virtual ICollection<WaitList> WaitLists { get; set; }
	}
}
