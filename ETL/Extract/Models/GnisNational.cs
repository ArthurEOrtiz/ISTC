using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class GnisNational
    {
        public int Id { get; set; }
        public string? FId { get; set; }
        public string? FeatureClass { get; set; }
        public string? Name { get; set; }
        public string? CountyName { get; set; }
        public string? StateAlpha { get; set; }
        public string? StateNumeric { get; set; }
        public string? CountyNumeric { get; set; }
        public double? PrimLatDec { get; set; }
        public double? PrimLongDec { get; set; }
        public string? ElevInM { get; set; }
        public double? SourceLatDec { get; set; }
        public double? SourceLongDec { get; set; }
        public DateTime? DateCreated { get; set; }
        public string? ElevInFt { get; set; }
        public string? MapName { get; set; }
    }
}
