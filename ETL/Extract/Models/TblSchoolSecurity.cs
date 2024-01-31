using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblSchoolSecurity
    {
        public string? FstrUserName { get; set; }
        public string? FstrLastName { get; set; }
        public string? FstrFirstName { get; set; }
        public string FstrPassword { get; set; } = null!;
        public string? FstrCountyName { get; set; }
        public string? FstrCountyAdmin { get; set; }
    }
}
