using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblSecurity
    {
        public string FstrUserName { get; set; } = null!;
        public string FstrPassword { get; set; } = null!;
        public string? FstrCountyName { get; set; }
    }
}
