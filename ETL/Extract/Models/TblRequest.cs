using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblRequest
    {
        public string FstrUserName { get; set; } = null!;
        public string FstrCountyName { get; set; } = null!;
        public DateTime FdtmWhen { get; set; }
        public string FstrLink { get; set; } = null!;
    }
}
