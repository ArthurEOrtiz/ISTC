using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Class
    {
        public int ClassId { get; set; }
        public int? CourseId { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }

        public virtual Course? Course { get; set; }
    }
}
