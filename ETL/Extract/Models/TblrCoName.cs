using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblrCoName
    {
        public string County { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? ReAdt { get; set; }
    }
}
