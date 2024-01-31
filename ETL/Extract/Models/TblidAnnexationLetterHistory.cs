using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidAnnexationLetterHistory
    {
        public int FlngDocEffYear { get; set; }
        public int FlngDocNumber { get; set; }
        public int FlngNoteNumber { get; set; }
        public string FstrAddressType { get; set; } = null!;
        public string FstrSalutation { get; set; } = null!;
        public string FstrFirstName { get; set; } = null!;
        public string FstrMiddleInitial { get; set; } = null!;
        public string FstrLastName { get; set; } = null!;
        public string FstrCompanyName { get; set; } = null!;
        public string FstrLetterId { get; set; } = null!;
        public string FstrLetterName { get; set; } = null!;
        public string FstrLetterValid { get; set; } = null!;
        public DateTime FdtmWhen { get; set; }
    }
}
