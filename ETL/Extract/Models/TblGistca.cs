using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblGistca
    {
        public int Teffyear { get; set; }
        public string Trectype { get; set; } = null!;
        public string Tcounty { get; set; } = null!;
        public string Tdesc { get; set; } = null!;
        public string? Tprojection { get; set; }
        public string? Tfolder { get; set; }
        public string? Tview1 { get; set; }
        public string? Tview2 { get; set; }
        public string? Tview3 { get; set; }
        public string? Tmeta1 { get; set; }
        public string? Tmeta2 { get; set; }
        public string? Tmeta3 { get; set; }
        public string? Tdown1 { get; set; }
        public string? Tdown2 { get; set; }
        public string? Tdown3 { get; set; }
        public string? Tfmt1 { get; set; }
        public string? Tfmt2 { get; set; }
        public string? Tfmt3 { get; set; }
    }
}
