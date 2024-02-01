using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class L2levy2
    {
        public int County { get; set; }
        public int Category { get; set; }
        public int DistNum { get; set; }
        public string Distname { get; set; } = null!;
        public decimal Estlevy { get; set; }
    }
}
