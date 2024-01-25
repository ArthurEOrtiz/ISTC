using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Location
    {
        public Location()
        {
            Courses = new HashSet<Course>();
        }

        public int LocationId { get; set; }
        public string? Description { get; set; }
        public string? Room { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
