﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Runtime.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EducationAPI.Models
{
	public class Topic
	{
		public Topic()
		{
			Courses = new HashSet<Course>();
		}

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int TopicId { get; set; }

		[MaxLength(50)]
		public string Title { get; set; } = null!;

		[MaxLength(255)]
		public string? Description { get; set; }

		[JsonIgnore]
		public virtual ICollection<Course> Courses { get; set; }

	}
}
