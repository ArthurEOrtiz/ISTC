using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblSchoolCourse
    {
        public DateTime CDateSchool { get; set; }
        public string CSchoolType { get; set; } = null!;
        public int CSseq { get; set; }
        public int CSeq { get; set; }
        public string? CName { get; set; }
        public string? CRoom { get; set; }
        public string? CDesc { get; set; }
        public string? CLink { get; set; }
        public string? CTime { get; set; }
        public string? Cwkday1 { get; set; }
        public string? Cwkday2 { get; set; }
        public string? Cwkday3 { get; set; }
        public string? Cwkday4 { get; set; }
        public string? Cwkday5 { get; set; }
        public string? Cwkday6 { get; set; }
        public string? Cwkday7 { get; set; }
        public string CAllow { get; set; } = null!;
        public int CFullCredit { get; set; }
        public int CAttendCredit { get; set; }
        public string CPabclass { get; set; } = null!;
        public string CCertType { get; set; } = null!;
        public int CMaxStudents { get; set; }
        public string? Cprereq { get; set; }
    }
}
