using System;
using System.Collections.Generic;

namespace Education.Models
{
    public partial class Contact
    {
        public Contact()
        {
            Students = new HashSet<Student>();
        }

        public int ContactId { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? State { get; set; }
        public string? Zip { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}
