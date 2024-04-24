using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EducationAPI.Models
{
	public class WaitList
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int WaitListId { get; set; }

		[Required]
		[Column("course_Id")]
		public int CourseId { get; set; }

		[Required]
		[Column("user_id")]
		public int UserId { get; set; }

		public DateTime DateAdded { get; set; }

		public bool ToEnroll { get; set; }

	}
}
