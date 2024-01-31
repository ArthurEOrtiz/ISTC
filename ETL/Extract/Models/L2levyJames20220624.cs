using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class L2levyJames20220624
    {
        public int Cnty { get; set; }
        public int Sort { get; set; }
        public int L2cat { get; set; }
        public int? L2distnum { get; set; }
        public string DistName { get; set; } = null!;
        public int EstTax { get; set; }
        public decimal EstLevy { get; set; }
    }
}
