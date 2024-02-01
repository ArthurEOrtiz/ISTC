using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class PropertyTaxEstimator06102022
    {
        public int? Conum { get; set; }
        public int? Catnum { get; set; }
        public int? Distnum { get; set; }
        public string? CountyName { get; set; }
        public string? DistName { get; set; }
        public decimal? EstTax { get; set; }
        public decimal? EstLevy { get; set; }
    }
}
