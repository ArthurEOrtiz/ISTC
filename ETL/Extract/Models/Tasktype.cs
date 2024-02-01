using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Tasktype
    {
        public int Typeid { get; set; }
        public string Type { get; set; } = null!;
        public string? Specialist { get; set; }
        public int Parentid { get; set; }
    }
}
