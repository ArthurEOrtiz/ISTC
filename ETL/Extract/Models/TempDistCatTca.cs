using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TempDistCatTca
    {
        public string? County { get; set; }
        public byte City { get; set; }
        public string Tca { get; set; } = null!;
        public string Distcat { get; set; } = null!;
        public string Distnum { get; set; } = null!;
        public int? Yr { get; set; }
        public string Name { get; set; } = null!;
    }
}
