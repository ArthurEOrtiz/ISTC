using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblGisdistrict
    {
        public int Deffyear { get; set; }
        public string Dcounty { get; set; } = null!;
        public string Ddisttype { get; set; } = null!;
        public string Ddesc { get; set; } = null!;
        public string? Dprojection { get; set; }
        public string? Dfolder { get; set; }
        public string? Dview1 { get; set; }
        public string? Dview2 { get; set; }
        public string? Dview3 { get; set; }
        public string? Dmeta1 { get; set; }
        public string? Dmeta2 { get; set; }
        public string? Dmeta3 { get; set; }
        public string? Ddown1 { get; set; }
        public string? Ddown2 { get; set; }
        public string? Ddown3 { get; set; }
        public string? Dfmt1 { get; set; }
        public string? Dfmt2 { get; set; }
        public string? Dfmt3 { get; set; }
    }
}
