using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblSchoolHistory
    {
        public int? CertNo { get; set; }
        public int? MNo { get; set; }
        public string? HName { get; set; }
        public string? HLastName { get; set; }
        public string? HFirstName { get; set; }
        public string? HEmailAddr { get; set; }
        public string? HEmployer { get; set; }
        public string? HCertType { get; set; }
        public DateTime? Certified { get; set; }
        public string? Course { get; set; }
        public int? Yearx { get; set; }
        public float? Hours { get; set; }
        public bool Nc { get; set; }
        public bool Appraiser { get; set; }
        public bool Mapper { get; set; }
        public DateTime? HDateSchool { get; set; }
        public string? HSchoolType { get; set; }
        public int? HSseq { get; set; }
        public int? HSeq { get; set; }
        public long Rowid { get; set; }
    }
}
