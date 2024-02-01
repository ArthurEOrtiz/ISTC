using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Prcformdatum
    {
        public string CntyName { get; set; } = null!;
        public int ChngReq { get; set; }
        public DateTime SubmitDate { get; set; }
        public string ProjName { get; set; } = null!;
        public string Originator { get; set; } = null!;
        public string? ProjMgr { get; set; }
        public bool? PriorityN { get; set; }
        public bool? PriorityU { get; set; }
        public DateTime DateReqU { get; set; }
        public bool? BugReq { get; set; }
        public bool? EnhanceReq { get; set; }
        public bool? NewReq { get; set; }
        public string? Description { get; set; }
        public string? Solution { get; set; }
        public string? AltSolution { get; set; }
        public bool? AsgnTsb { get; set; }
        public DateTime? AsgnDateTsb { get; set; }
        public bool? AsgnManat { get; set; }
        public DateTime? AsgnDateMana { get; set; }
    }
}
