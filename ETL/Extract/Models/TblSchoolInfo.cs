using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblSchoolInfo
    {
        public string SschoolType { get; set; } = null!;
        public DateTime SdateSchool { get; set; }
        public int Sseq { get; set; }
        public string? Scity { get; set; }
        public string? Slocation1 { get; set; }
        public string? Slocation2 { get; set; }
        public DateTime? Sdeadline { get; set; }
    }
}
