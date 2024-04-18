using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class User
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int UserId { get; set; }

		public string? ClerkId { get; set; }

		[MaxLength(50)]
		public string FirstName { get; set; } = null!;

		[MaxLength(50)]
		public string LastName { get; set; } = null!;

		[MaxLength(50)]
		public string? MiddleName { get; set; }

		[EmailAddress]
		public string Email { get; set; } = null!;

		[MaxLength(50)]
		public string Employer { get; set; } = null!;

		[MaxLength(50)]
		public string JobTitle { get; set; } = null!;	

		public bool IsAdmin { get; set; }

		public bool IsStudent { get; set; }

		public virtual Student Student { get; set; } = new Student();

		public virtual Contact? Contact { get; set; }
	}
}
