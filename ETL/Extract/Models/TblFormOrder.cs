using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblFormOrder
    {
        public string Focounty { get; set; } = null!;
        public DateTime Fodate { get; set; }
        public string Fokey { get; set; } = null!;
        public string? FoemailAddr { get; set; }
        public decimal? Foqty { get; set; }
        public string Fomailed { get; set; } = null!;
        public DateTime? FodateMailed { get; set; }
        public decimal? FoqtyMailed { get; set; }
        public string Focomment { get; set; } = null!;
    }
}
