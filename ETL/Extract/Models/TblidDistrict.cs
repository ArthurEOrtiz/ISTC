using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidDistrict
    {
        public int FlngDistrictKey { get; set; }
        public int FlngVer { get; set; }
        public int FlngVerLast { get; set; }
        public DateTime FdtmCommence { get; set; }
        public DateTime FdtmCease { get; set; }
        public string FstrDistrict { get; set; } = null!;
        public string FstrDistrictType { get; set; } = null!;
        public string FstrDistrictName { get; set; } = null!;
        public double FdblLevy { get; set; }
        public byte FblnActive { get; set; }
        public string FstrWho { get; set; } = null!;
        public DateTime FdtmWhen { get; set; }
    }
}
