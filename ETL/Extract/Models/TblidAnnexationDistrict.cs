using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidAnnexationDistrict
    {
        public string FstrDistrict { get; set; } = null!;
        public string FstrDistrictType { get; set; } = null!;
        public string FstrCounty { get; set; } = null!;
        public string? FstrDistrictName { get; set; }
        public string FstrCsalutation { get; set; } = null!;
        public string FstrCfirstName { get; set; } = null!;
        public string? FstrCmiddleInitial { get; set; }
        public string FstrClastName { get; set; } = null!;
        public string? FstrCphoneNumber { get; set; }
        public string? FstrCfaxNumber { get; set; }
        public string? FstrCemailAddress { get; set; }
        public string FstrCaddress { get; set; } = null!;
        public string FstrCcity { get; set; } = null!;
        public string FstrCstate { get; set; } = null!;
        public string FstrCzipCode { get; set; } = null!;
        public string FstrCcountry { get; set; } = null!;
        public string? FstrCtitle { get; set; }
        public DateTime FdtmUrcreation { get; set; }
        public int FintUrtermYears { get; set; }
        public DateTime FdtmUrexpiration { get; set; }
        public string FstrUroneAnnexation { get; set; } = null!;
    }
}
