using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class L2levy
    {
        public int Cnty { get; set; }
        public int Sort { get; set; }
        public int L2cat { get; set; }
        public int L2distNum { get; set; }
        public string DistName { get; set; } = null!;
        public int EstTax { get; set; }
        public decimal EstLevy { get; set; }
    }
}
