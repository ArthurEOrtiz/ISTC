using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	public class Topic
	{
		public Topic()
		{
			Courses = new HashSet<Course>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int TopicId { get; set; }

		[MaxLength(50)]
		public string? Title { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		public virtual ICollection<Course> Courses { get; set; }
	}
}
