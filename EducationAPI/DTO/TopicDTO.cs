﻿using EducationAPI.Models;

namespace EducationAPI.DTO
{
	public class TopicDTO
	{
		public int TopicId { get; set; }
		public string Title { get; set; } = null!;
		public string Description { get; set; } = null!;
		public ICollection<Course>? Courses { get; set; }
	}
}
