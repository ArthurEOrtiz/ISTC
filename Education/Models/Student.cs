﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Models
{
	public class Student
	{
		public Student()
		{
			Attendances = new HashSet<Attendance>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int StudentId { get; set; }

		[MaxLength(50)]
		public string FirstName { get; set; } = null!;

		[MaxLength(50)]
		public string LastName { get; set; } = null!;

		[MaxLength(50)]
		public string? MiddleName { get; set; }

		public int AccumulatedCredit { get; set; } = 0;

		public bool AppraisalCertified { get; set; } = false;

		public bool MappingCertified { get; set; } = false;

		public int ContactId { get; set; }

		[ForeignKey("ContactId")]
		public virtual Contact? Contact { get; set; }

		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
