using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ETL.Transfer.Models
{
	internal class Student
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column("student_ID")]
		public int Id { get; set; }

		[Column("first_name")]
		public string FirstName { get; set; } = null!;

		[Column("last_name")]
		public string LastName { get; set; } = null!;
	}
}
