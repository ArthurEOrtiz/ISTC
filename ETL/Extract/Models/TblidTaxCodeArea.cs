using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidTaxCodeArea
    {
        public string Fstrcounty { get; set; } = null!;
        public string Fstrtaxcodearea { get; set; } = null!;
        public int Flngver { get; set; }
        public int Flngverlast { get; set; }
        public string Fstractions { get; set; } = null!;
        public DateTime Fdtmactionyear { get; set; }
        public byte Fblncity { get; set; }
        public byte Fblnactive { get; set; }
        public string Fstrwho { get; set; } = null!;
        public DateTime Fdtmwhen { get; set; }
    }
}
