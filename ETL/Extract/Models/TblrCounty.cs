using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblrCounty
    {
        public string County { get; set; } = null!;
        public string? CountyName { get; set; }
        public string? Addr1 { get; set; }
        public string? Addr2 { get; set; }
        public string? City { get; set; }
        public string? St { get; set; }
        public string? Zip { get; set; }
        public string? Lname { get; set; }
        public string? Fname { get; set; }
        public string Ttl { get; set; } = null!;
        public string? CountyOpen { get; set; }
        public string? Par15 { get; set; }
    }
}
