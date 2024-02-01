using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblDownload
    {
        public string FstrCategory { get; set; } = null!;
        public string FstrSubCategory { get; set; } = null!;
        public string FstrDescription { get; set; } = null!;
        public string FstrDetails { get; set; } = null!;
        public DateTime FdtmDateAvailable { get; set; }
        public string FstrLink { get; set; } = null!;
        public DateTime? FdtmDateRemoved { get; set; }
        public byte FblnActive { get; set; }
        public long Fintkey { get; set; }
    }
}
