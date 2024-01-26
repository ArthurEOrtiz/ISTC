using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	[Table("Topics")]
	public class Topic
	{
		public Topic()
		{
			Courses = new HashSet<Course>();
		}
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("topic_ID")]
		public int TopicId { get; set; }

		[Column("title")]
		[MaxLength(50)]
		public string? Title { get; set; }

		[Column("description")]
		[MaxLength(255)]
		public string? Description { get; set; }

		public virtual ICollection<Course> Courses { get; set; }
	}
}
