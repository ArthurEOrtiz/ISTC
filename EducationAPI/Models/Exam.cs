﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EducationAPI.Models
{
	public class Exam
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ExamId { get; set; }

		[Required]
		[Column("course_id")]
		public int CourseId { get; set; }

		[Required]
		[Column("user_id")]
		public int UserId { get; set; }

		public bool HasPassed { get; set; } = false;

		[JsonIgnore]
		[ForeignKey("CourseId")]
		public Course Course { get; set; } = null!;

		[JsonIgnore]
		[ForeignKey("UserId")]
		public User User { get; set; } = null!;

	}
}
