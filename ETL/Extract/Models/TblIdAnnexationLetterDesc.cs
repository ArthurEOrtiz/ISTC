using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblIdAnnexationLetterDesc
    {
        public string FstrLetterId { get; set; } = null!;
        public string FstrLetterDescription { get; set; } = null!;
        public string FstrTemplateName { get; set; } = null!;
        public string FstrLetterType { get; set; } = null!;
        public string? FstrNoteDefault { get; set; }
        public string? FstrFieldsUsed { get; set; }
    }
}
