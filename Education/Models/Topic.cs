using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Topic
    {
        public Topic()
        {
            Courses = new HashSet<Course>();
        }

        public int TopicId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
