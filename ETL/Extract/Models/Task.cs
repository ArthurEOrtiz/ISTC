using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class Task
    {
        public int WoNum { get; set; }
        public string? Task1 { get; set; }
        public string? Type { get; set; }
        public string? Request { get; set; }
        public DateTime? Reqdate { get; set; }
        public string? Openby { get; set; }
        public DateTime? Opendate { get; set; }
        public string? Modiby { get; set; }
        public DateTime? Modidate { get; set; }
        public string? Clsdby { get; set; }
        public DateTime? Clsddate { get; set; }
        public string? Elapsetime { get; set; }
        public int? Elapsemin { get; set; }
        public string? Priority { get; set; }
        public DateTime? Duedate { get; set; }
        public string? Respons { get; set; }
        public DateTime? Assndate { get; set; }
        public DateTime? Completed { get; set; }
        public double? Hours { get; set; }
        public double? Rate { get; set; }
        public double? Charge { get; set; }
        public int? WsNum { get; set; }
        public string? DeptNum { get; set; }
        public string? Dept { get; set; }
        public string? Phone { get; set; }
        public string? PhoneExt { get; set; }
        public string? Location { get; set; }
        public string? Descript { get; set; }
        public string? WoText1 { get; set; }
        public string? WoText2 { get; set; }
        public string? WoText3 { get; set; }
        public string? WoText4 { get; set; }
        public string? WoText5 { get; set; }
        public string? WoText6 { get; set; }
        public DateTime? WoDate1 { get; set; }
        public DateTime? WoDate2 { get; set; }
        public double? WoNum1 { get; set; }
        public int? WoInt1 { get; set; }
        public string? Note { get; set; }
        public bool? Ft { get; set; }
        public string? Compflag { get; set; }
        public string? Status { get; set; }
        public DateTime? Agentdate { get; set; }
        public byte? Agentlevel { get; set; }
        public string? AwsNum { get; set; }
        public string? Lookup1 { get; set; }
        public string? Lookup2 { get; set; }
        public string? Guido { get; set; }
        public string? Emailaddr { get; set; }
        public int? Userid { get; set; }
        public int? Parentwoid { get; set; }
        public int? Woid { get; set; }
        public string? Wotype2 { get; set; }
        public string? Wotype3 { get; set; }
        public int? Attachcount { get; set; }
    }
}
