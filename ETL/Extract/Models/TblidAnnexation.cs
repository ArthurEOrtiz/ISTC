using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidAnnexation
    {
        public int FlngDocEffYear { get; set; }
        public int FlngDocNumber { get; set; }
        public int FlngVer { get; set; }
        public int FlngVerLast { get; set; }
        public string FstrCounty { get; set; } = null!;
        public string? FstrDistrict { get; set; }
        public string? FstrDistrictType { get; set; }
        public DateTime? FdtmOrdDate { get; set; }
        public string FstrOrdDescNumber { get; set; } = null!;
        public string? FstrOrdNumber { get; set; }
        public DateTime FdtmDateReceived { get; set; }
        public DateTime? FdtmDateApproved { get; set; }
        public DateTime? FdtmDateReturned { get; set; }
        public DateTime? FdtmDateReceived2 { get; set; }
        public DateTime? FdtmDateReturned2 { get; set; }
        public DateTime? FdtmDateReceived3 { get; set; }
        public DateTime? FdtmDateReturned3 { get; set; }
        public DateTime FdtmDateDue { get; set; }
        public string FstrCurrentStatus { get; set; } = null!;
        public DateTime FdtmCurrentStatus { get; set; }
        public string FstrRecordType { get; set; } = null!;
        public string? FstrStatusCogoDig { get; set; }
        public string? FstrStatusClosed { get; set; }
        public string? FstrStatusProblems { get; set; }
        public string? FstrStatusMatching { get; set; }
        public string? FstrStatusComments { get; set; }
        public string? FstrPdfname { get; set; }
        public string? FstrPdfname2 { get; set; }
        public string? FstrImageName { get; set; }
        public string? FstrStatusInBook { get; set; }
        public string? FstrStatusPaperWork { get; set; }
        public int FlngLastAddress { get; set; }
        public int FlngLastNote { get; set; }
        public int FlngLastLegal { get; set; }
        public string? FstrAnnexComplete { get; set; }
        public string? FstrRegionComp { get; set; }
        public string? FstrGiscomplete { get; set; }
        public string FstrWhoHasIt { get; set; } = null!;
        public string FstrWhoDoneIt { get; set; } = null!;
        public DateTime? FdtmApprovalLtrPrinted { get; set; }
        public string FstrValid { get; set; } = null!;
        public string FstrLocPrinted { get; set; } = null!;
        public string FstrLocMailed { get; set; } = null!;
        public int FlngLastImage { get; set; }
        public string FstrNewOrd { get; set; } = null!;
        public string FstrWho { get; set; } = null!;
        public DateTime FdtmWhen { get; set; }
    }
}
