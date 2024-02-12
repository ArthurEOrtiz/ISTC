using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationAPI.Models
{
	public class User
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int UserId { get; set; }

		public bool IsAdmin { get; set; }

		public bool IsStudent { get; set; }

		public virtual Student? Student { get; set; }
	}
}
