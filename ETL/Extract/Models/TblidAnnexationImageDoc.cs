using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblidAnnexationImageDoc
    {
        public int FlngDocEffYear { get; set; }
        public int FlngDocNumber { get; set; }
        public int FlngImageNumber { get; set; }
        public string FstrImageType { get; set; } = null!;
        public string FstrImageFldr { get; set; } = null!;
        public string FstrImageName { get; set; } = null!;
        public string FstrImageValid { get; set; } = null!;
    }
}
