using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Course
    {
        public Course()
        {
            Classes = new HashSet<Class>();
        }

        public int CourseId { get; set; }
        public string? Description { get; set; }
        public int? AttendanceCredit { get; set; }
        public int? CompletionCredit { get; set; }
        public DateTime? EnrollmentDeadling { get; set; }
        public int? LocationId { get; set; }
        public int? TopicId { get; set; }

        public virtual Location? Location { get; set; }
        public virtual Topic? Topic { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
