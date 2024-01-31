using System;
using System.Collections.Generic;

namespace ETL.Extract.Models
{
    public partial class TblEnrolled
    {
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Mi { get; set; }
        public string? JobTitle { get; set; }
        public string? Employer { get; set; }
        public string? EmailAddr { get; set; }
        public string? AddrStreet { get; set; }
        public string? AddrSteNmbr { get; set; }
        public string? AddrCity { get; set; }
        public string? AddrState { get; set; }
        public string? AddrZip { get; set; }
        public string? TelAc { get; set; }
        public string? TelPrfx { get; set; }
        public string? TelNmbr { get; set; }
        public string? FaxAc { get; set; }
        public string? FaxPrfx { get; set; }
        public string? FaxNmbr { get; set; }
        public DateTime? DateRegistered { get; set; }
        public bool? ArcexplorerBoise { get; set; }
        public bool? ArcexplorerCda { get; set; }
        public bool? ArcexplorerIf { get; set; }
        public bool? GeoprocessIf { get; set; }
        public bool? GeoprocessLewiston { get; set; }
        public bool? Iaao171 { get; set; }
        public bool? Iaao931Seca { get; set; }
        public bool? Iaao931Secb { get; set; }
        public bool? Iaao937Seca { get; set; }
        public bool? Iaao937Secb { get; set; }
        public bool? TaxPolicyWrkshp { get; set; }
        public bool? UrbanRenewal { get; set; }
        public bool? ProvalExercises { get; set; }
        public bool? AssessmRndtable { get; set; }
        public bool? BasicCrystal { get; set; }
        public bool? AdvCrystal { get; set; }
        public bool? LegalIssues { get; set; }
        public bool? TimeMgmt { get; set; }
        public bool? SetSupAchvGoals { get; set; }
        public bool? CustServ { get; set; }
        public bool? InteroCommun { get; set; }
        public bool? Negotiating { get; set; }
        public bool? Iaao600 { get; set; }
        public bool? Iaao601 { get; set; }
        public bool? IntroArcgis { get; set; }
        public bool? IntroGeodatab { get; set; }
        public bool? Geoprocess { get; set; }
        public bool? Metadata { get; set; }
        public bool? Geomedia { get; set; }
        public bool? EsriCadastral { get; set; }
    }
}
