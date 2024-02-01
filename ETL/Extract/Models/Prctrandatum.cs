using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Prctrandatum
    {
        public string CntyName { get; set; } = null!;
        public int ChngReq { get; set; }
        public DateTime SubmitDate { get; set; }
        public string Originator { get; set; } = null!;
        public string? Description { get; set; }
        public string? Solution { get; set; }
    }
}
