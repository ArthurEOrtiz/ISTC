using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblFormDesc
    {
        public string Fddept { get; set; } = null!;
        public string Fdkey { get; set; } = null!;
        public string? Fddesc { get; set; }
        public string? Fdonline { get; set; }
        public string? Fdpdf { get; set; }
        public decimal? FdminQty { get; set; }
    }
}
