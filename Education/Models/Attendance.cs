using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Attendance
    {
        public int AttendanceId { get; set; }
        public int? StudentId { get; set; }
        public int? ClassId { get; set; }
        public bool? Attended { get; set; }

        public virtual Student? Student { get; set; }
    }
}
