using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class HoTable
    {
        public string? CountyName { get; set; }
        public decimal? Year { get; set; }
        public decimal? Idnumber { get; set; }
        public string? OwnerName1 { get; set; }
        public string? OwnerName2 { get; set; }
        public string? MailName { get; set; }
        public string? MailAddr1 { get; set; }
        public string? MailAddr2 { get; set; }
        public string? MailCity { get; set; }
        public string? MailState { get; set; }
        public string? MailZip { get; set; }
        public decimal? HoeffDate { get; set; }
        public decimal? HoappDate { get; set; }
        public string? Pin1 { get; set; }
        public string? Pin2 { get; set; }
        public string? Pin3 { get; set; }
        public string? Pin4 { get; set; }
        public string? SitusAddr { get; set; }
        public string? SitusCity { get; set; }
        public string? SitusSt { get; set; }
        public string? SitusZip { get; set; }
        public decimal? TotMkt1 { get; set; }
        public decimal? Hoexempt1 { get; set; }
        public decimal? TotMkt2 { get; set; }
        public decimal? Hoexempt2 { get; set; }
        public decimal? TotMkt3 { get; set; }
        public decimal? Hoexempt3 { get; set; }
        public decimal? TotMkt4 { get; set; }
        public decimal? Hoexempt4 { get; set; }
        public decimal? Tcanum { get; set; }
    }
}
