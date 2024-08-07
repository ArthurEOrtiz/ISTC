using EducationAPI.Models;

namespace EducationAPI.DTO
{
	public class UserCourseDTO
	{
		public User User { get; set; } = new User();

		public List<Course> Courses { get; set; }	 = [];
	}
}
