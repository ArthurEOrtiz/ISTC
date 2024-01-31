using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class L2districtsBkpKmp20220613
    {
        public int Taxyear { get; set; }
        public int CatNum { get; set; }
        public int DistNum { get; set; }
        public int CoNum { get; set; }
        public string Coname { get; set; } = null!;
        public string DistName { get; set; } = null!;
        public int Gentaxtype { get; set; }
        public int GenTaxNum { get; set; }
    }
}
