using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblGisannex
    {
        public int Aeffyear { get; set; }
        public string Acounty { get; set; } = null!;
        public string Adesc { get; set; } = null!;
        public string Adisttype { get; set; } = null!;
        public int Aannex { get; set; }
        public string? Adistname { get; set; }
        public string? Aordinance { get; set; }
        public string? Aprojection { get; set; }
        public string? Afolder { get; set; }
        public string? Aview1 { get; set; }
        public string? Aview2 { get; set; }
        public string? Aview3 { get; set; }
        public string? Ameta1 { get; set; }
        public string? Ameta2 { get; set; }
        public string? Ameta3 { get; set; }
        public string? Adown1 { get; set; }
        public string? Adown2 { get; set; }
        public string? Adown3 { get; set; }
        public string? Afmt1 { get; set; }
        public string? Afmt2 { get; set; }
        public string? Afmt3 { get; set; }
    }
}
