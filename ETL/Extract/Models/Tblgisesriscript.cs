using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Tblgisesriscript
    {
        public int Flngid { get; set; }
        public string Fstrtitle { get; set; } = null!;
        public string Fstrshdesc { get; set; } = null!;
        public string Fstrlgdesc { get; set; } = null!;
        public string Fstrimgpth { get; set; } = null!;
        public string Fstrcfmt { get; set; } = null!;
        public string Fstrcexam { get; set; } = null!;
        public string Fstrcexpl { get; set; } = null!;
        public string Fstrstret { get; set; } = null!;
        public DateTime Fdtmadded { get; set; }
        public string Fstrcontrib { get; set; } = null!;
        public bool? Fblnonoff { get; set; }
    }
}
