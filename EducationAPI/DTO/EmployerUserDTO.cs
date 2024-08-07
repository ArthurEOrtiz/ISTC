namespace EducationAPI.DTO
{
	public class EmployerUserDTO
	{
		public string Employer { get; set; } = null!;

		public List<UserCourseDTO> Users { get; set; } = [];
		
	}
}
