using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblDistrictLevy2017
    {
        public string? County { get; set; }
        public int? FstrDistrict { get; set; }
        public int? FstrDistrictType { get; set; }
        public string? Class { get; set; }
        public string? Category { get; set; }
        public string? FstrDistrictName { get; set; }
        public string? EstPtaxes { get; set; }
        public decimal? FdblLevy { get; set; }
        public int? FintRecNumber { get; set; }
        public int? FstrDistrictTypeSave { get; set; }
    }
}
