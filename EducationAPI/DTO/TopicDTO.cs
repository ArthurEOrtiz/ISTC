using EducationAPI.Models;

namespace EducationAPI.DTO
{
	public class TopicDTO
	{
		public int TopicId { get; set; }
		public string Title { get; set; } = null!;
		public string Description { get; set; } = null!;
		public List<Course>? Courses { get; set; }
	}
}
