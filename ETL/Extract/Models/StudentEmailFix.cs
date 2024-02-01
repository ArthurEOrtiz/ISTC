using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class StudentEmailFix
    {
        public string? FFirstName { get; set; }
        public string? FLastName { get; set; }
        public string? FEmployer { get; set; }
        public string? FEmailAddr { get; set; }
    }
}
