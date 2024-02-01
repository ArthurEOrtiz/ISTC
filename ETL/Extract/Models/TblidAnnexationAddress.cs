using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidAnnexationAddress
    {
        public int FlngDocEffYear { get; set; }
        public int FlngDocNumber { get; set; }
        public int FlngAddressNumber { get; set; }
        public string FstrCounty { get; set; } = null!;
        public string FstrAddresstype { get; set; } = null!;
        public string FstrSalutation { get; set; } = null!;
        public string FstrFirstName { get; set; } = null!;
        public string FstrMiddleInitial { get; set; } = null!;
        public string FstrLastName { get; set; } = null!;
        public string FstrCompanyName { get; set; } = null!;
        public string FstrAddress { get; set; } = null!;
        public string FstrCity { get; set; } = null!;
        public string FstrState { get; set; } = null!;
        public string FstrZipCode { get; set; } = null!;
        public string FstrCountry { get; set; } = null!;
        public string FstrPhoneNumber { get; set; } = null!;
        public string FstrFaxNumber { get; set; } = null!;
        public string FstrEmailAddress { get; set; } = null!;
        public string FstrValid { get; set; } = null!;
        public string FstrTitle { get; set; } = null!;
        public string FstrWho { get; set; } = null!;
        public DateTime FdtmWhen { get; set; }
    }
}
