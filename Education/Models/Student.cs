using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Student
    {
        public Student()
        {
            Attendances = new HashSet<Attendance>();
        }

        public int StudentId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public bool? AppraisalCertified { get; set; }
        public bool? MappingCertified { get; set; }
        public int? ContactId { get; set; }

        public virtual Contact? Contact { get; set; }
        public virtual ICollection<Attendance> Attendances { get; set; }
    }
}
