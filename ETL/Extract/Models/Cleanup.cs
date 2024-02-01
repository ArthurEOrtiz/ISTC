using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Cleanup
    {
        public string? County { get; set; }
        public string? FstrDistrict { get; set; }
        public string? FstrDistrictType { get; set; }
        public string? Class { get; set; }
        public string? Category { get; set; }
        public string? FstrDistrictName { get; set; }
        public string? EstPtaxes { get; set; }
        public string? FdblLevy { get; set; }
        public string? FintRecNumber { get; set; }
    }
}
