using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class Topic
	{
		public Topic()
		{
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int TopicId { get; set; }

		[MaxLength(50)]
		public string Title { get; set; } = null!;

		[MaxLength(255)]
		public string? Description { get; set; }

	}
}
