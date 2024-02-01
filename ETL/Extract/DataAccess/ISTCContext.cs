using ETL.Extract.Models;
using Microsoft.EntityFrameworkCore;
using Task = ETL.Extract.Models.Task;

namespace ETL.Extract.DataAccess
{
	public partial class ISTCContext : DbContext
	{
		public ISTCContext(DbContextOptions<ISTCContext> options)
				: base(options)
		{
		}

		public virtual DbSet<Cleanup> Cleanups { get; set; } = null!;
		public virtual DbSet<GemPinChg2014> GemPinChg2014s { get; set; } = null!;
		public virtual DbSet<GemPinChg2014a> GemPinChg2014as { get; set; } = null!;
		public virtual DbSet<GnisNational> GnisNationals { get; set; } = null!;
		public virtual DbSet<HoTable> HoTables { get; set; } = null!;
		public virtual DbSet<L2district> L2districts { get; set; } = null!;
		public virtual DbSet<L2districtsBkpKmp20220613> L2districtsBkpKmp20220613s { get; set; } = null!;
		public virtual DbSet<L2levy> L2levies { get; set; } = null!;
		public virtual DbSet<L2levy2> L2levy2s { get; set; } = null!;
		public virtual DbSet<L2levy22021> L2levy22021s { get; set; } = null!;
		public virtual DbSet<L2levyJames20220624> L2levyJames20220624s { get; set; } = null!;
		public virtual DbSet<LanDistricttype> LanDistricttypes { get; set; } = null!;
		public virtual DbSet<Prcformdatum> Prcformdata { get; set; } = null!;
		public virtual DbSet<Prctrandatum> Prctrandata { get; set; } = null!;
		public virtual DbSet<PropertyTaxEstimator06102022> PropertyTaxEstimator06102022s { get; set; } = null!;
		public virtual DbSet<SearchTmp> SearchTmps { get; set; } = null!;
		public virtual DbSet<StudentEmailFix> StudentEmailFixes { get; set; } = null!;
		public virtual DbSet<Task> Tasks { get; set; } = null!;
		public virtual DbSet<Tasktype> Tasktypes { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2008> TblDistrictLevy2008s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2009> TblDistrictLevy2009s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2010> TblDistrictLevy2010s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2011> TblDistrictLevy2011s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2012> TblDistrictLevy2012s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2013> TblDistrictLevy2013s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2014> TblDistrictLevy2014s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2015> TblDistrictLevy2015s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2016> TblDistrictLevy2016s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2017> TblDistrictLevy2017s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2018> TblDistrictLevy2018s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2019> TblDistrictLevy2019s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2020> TblDistrictLevy2020s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2021> TblDistrictLevy2021s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevy2022> TblDistrictLevy2022s { get; set; } = null!;
		public virtual DbSet<TblDistrictLevyActual> TblDistrictLevyActuals { get; set; } = null!;
		public virtual DbSet<TblDownload> TblDownloads { get; set; } = null!;
		public virtual DbSet<TblEnrolled> TblEnrolleds { get; set; } = null!;
		public virtual DbSet<TblFileDownload> TblFileDownloads { get; set; } = null!;
		public virtual DbSet<TblFormDesc> TblFormDescs { get; set; } = null!;
		public virtual DbSet<TblFormOrder> TblFormOrders { get; set; } = null!;
		public virtual DbSet<TblGisannex> TblGisannices { get; set; } = null!;
		public virtual DbSet<TblGisdistrict> TblGisdistricts { get; set; } = null!;
		public virtual DbSet<TblGistca> TblGistcas { get; set; } = null!;
		public virtual DbSet<TblIdAnnexationLetterDesc> TblIdAnnexationLetterDescs { get; set; } = null!;
		public virtual DbSet<TblIdCountyTca> TblIdCountyTcas { get; set; } = null!;
		public virtual DbSet<TblPtrsecurity> TblPtrsecurities { get; set; } = null!;
		public virtual DbSet<TblRequest> TblRequests { get; set; } = null!;
		public virtual DbSet<TblSchoolCertType> TblSchoolCertTypes { get; set; } = null!;
		public virtual DbSet<TblSchoolCourse> TblSchoolCourses { get; set; } = null!;
		public virtual DbSet<TblSchoolEnroll> TblSchoolEnrolls { get; set; } = null!;
		public virtual DbSet<TblSchoolHistory> TblSchoolHistories { get; set; } = null!;
		public virtual DbSet<TblSchoolInfo> TblSchoolInfos { get; set; } = null!;
		public virtual DbSet<TblSchoolSecurity> TblSchoolSecurities { get; set; } = null!;
		public virtual DbSet<TblSecurity> TblSecurities { get; set; } = null!;
		public virtual DbSet<TblSummerSchool> TblSummerSchools { get; set; } = null!;
		public virtual DbSet<TblUcpnew> TblUcpnews { get; set; } = null!;
		public virtual DbSet<Tblgisesriscript> Tblgisesriscripts { get; set; } = null!;
		public virtual DbSet<Tblgisesriscripttitle> Tblgisesriscripttitles { get; set; } = null!;
		public virtual DbSet<TblidAakensRename> TblidAakensRenames { get; set; } = null!;
		public virtual DbSet<TblidAnnexation> TblidAnnexations { get; set; } = null!;
		public virtual DbSet<TblidAnnexationAddress> TblidAnnexationAddresses { get; set; } = null!;
		public virtual DbSet<TblidAnnexationCounty> TblidAnnexationCounties { get; set; } = null!;
		public virtual DbSet<TblidAnnexationDistrict> TblidAnnexationDistricts { get; set; } = null!;
		public virtual DbSet<TblidAnnexationImageDoc> TblidAnnexationImageDocs { get; set; } = null!;
		public virtual DbSet<TblidAnnexationLetterHistory> TblidAnnexationLetterHistories { get; set; } = null!;
		public virtual DbSet<TblidAnnexationOrdDesc> TblidAnnexationOrdDescs { get; set; } = null!;
		public virtual DbSet<TblidAnnexationStatusDesc> TblidAnnexationStatusDescs { get; set; } = null!;
		public virtual DbSet<TblidDistrict> TblidDistricts { get; set; } = null!;
		public virtual DbSet<TblidTaxCodeArea> TblidTaxCodeAreas { get; set; } = null!;
		public virtual DbSet<TblidTcatoDistrict> TblidTcatoDistricts { get; set; } = null!;
		public virtual DbSet<TblrCoName> TblrCoNames { get; set; } = null!;
		public virtual DbSet<TblrCounty> TblrCounties { get; set; } = null!;
		public virtual DbSet<Tbltemptca> Tbltemptcas { get; set; } = null!;
		public virtual DbSet<TempDistCatTca> TempDistCatTcas { get; set; } = null!;
		public virtual DbSet<TowersC> TowersCs { get; set; } = null!;
		public virtual DbSet<TsbvTempDistCatTca> TsbvTempDistCatTcas { get; set; } = null!;
		public virtual DbSet<WfbTest2> WfbTest2s { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Cleanup>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("Cleanup");

				entity.Property(e => e.Category)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<GemPinChg2014>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("GemPinChg2014");

				entity.Property(e => e.NewPin)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("NewPIN");

				entity.Property(e => e.OldPin)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("OldPIN");
			});

			modelBuilder.Entity<GemPinChg2014a>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("GemPinChg2014a");

				entity.Property(e => e.NewPin)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("NewPIN");

				entity.Property(e => e.OldPin)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("OldPIN");
			});

			modelBuilder.Entity<GnisNational>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("GNIS_National");

				entity.Property(e => e.CountyName)
									.HasMaxLength(255)
									.HasColumnName("COUNTY_NAME");

				entity.Property(e => e.CountyNumeric)
									.HasMaxLength(255)
									.HasColumnName("COUNTY_NUMERIC");

				entity.Property(e => e.DateCreated)
									.HasColumnType("datetime")
									.HasColumnName("DATE_CREATED");

				entity.Property(e => e.ElevInFt)
									.HasMaxLength(255)
									.HasColumnName("ELEV_IN_FT");

				entity.Property(e => e.ElevInM)
									.HasMaxLength(255)
									.HasColumnName("ELEV_IN_M");

				entity.Property(e => e.FId)
									.HasMaxLength(255)
									.HasColumnName("F_ID");

				entity.Property(e => e.FeatureClass)
									.HasMaxLength(255)
									.HasColumnName("FEATURE_CLASS");

				entity.Property(e => e.Id).HasColumnName("ID");

				entity.Property(e => e.MapName)
									.HasMaxLength(255)
									.HasColumnName("MAP_NAME");

				entity.Property(e => e.Name)
									.HasMaxLength(255)
									.HasColumnName("NAME");

				entity.Property(e => e.PrimLatDec).HasColumnName("PRIM_LAT_DEC");

				entity.Property(e => e.PrimLongDec).HasColumnName("PRIM_LONG_DEC");

				entity.Property(e => e.SourceLatDec).HasColumnName("SOURCE_LAT_DEC");

				entity.Property(e => e.SourceLongDec).HasColumnName("SOURCE_LONG_DEC");

				entity.Property(e => e.StateAlpha)
									.HasMaxLength(255)
									.HasColumnName("STATE_ALPHA");

				entity.Property(e => e.StateNumeric)
									.HasMaxLength(255)
									.HasColumnName("STATE_NUMERIC");
			});

			modelBuilder.Entity<HoTable>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("HO_Table");

				entity.Property(e => e.CountyName)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.HoappDate)
									.HasColumnType("numeric(8, 0)")
									.HasColumnName("HOAppDate");

				entity.Property(e => e.HoeffDate)
									.HasColumnType("numeric(8, 0)")
									.HasColumnName("HOEffDate");

				entity.Property(e => e.Hoexempt1)
									.HasColumnType("numeric(6, 0)")
									.HasColumnName("HOExempt1");

				entity.Property(e => e.Hoexempt2)
									.HasColumnType("numeric(6, 0)")
									.HasColumnName("HOExempt2");

				entity.Property(e => e.Hoexempt3)
									.HasColumnType("numeric(6, 0)")
									.HasColumnName("HOExempt3");

				entity.Property(e => e.Hoexempt4)
									.HasColumnType("numeric(6, 0)")
									.HasColumnName("HOExempt4");

				entity.Property(e => e.Idnumber)
									.HasColumnType("numeric(7, 0)")
									.HasColumnName("IDNumber");

				entity.Property(e => e.MailAddr1)
									.HasMaxLength(60)
									.IsUnicode(false);

				entity.Property(e => e.MailAddr2)
									.HasMaxLength(60)
									.IsUnicode(false);

				entity.Property(e => e.MailCity)
									.HasMaxLength(30)
									.IsUnicode(false);

				entity.Property(e => e.MailName)
									.HasMaxLength(80)
									.IsUnicode(false);

				entity.Property(e => e.MailState)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.MailZip)
									.HasMaxLength(10)
									.IsUnicode(false);

				entity.Property(e => e.OwnerName1)
									.HasMaxLength(80)
									.IsUnicode(false);

				entity.Property(e => e.OwnerName2)
									.HasMaxLength(80)
									.IsUnicode(false);

				entity.Property(e => e.Pin1)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.Pin2)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.Pin3)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.Pin4)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.SitusAddr)
									.HasMaxLength(80)
									.IsUnicode(false);

				entity.Property(e => e.SitusCity)
									.HasMaxLength(30)
									.IsUnicode(false);

				entity.Property(e => e.SitusSt)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.SitusZip)
									.HasMaxLength(10)
									.IsUnicode(false);

				entity.Property(e => e.Tcanum)
									.HasColumnType("numeric(7, 0)")
									.HasColumnName("TCAnum");

				entity.Property(e => e.TotMkt1).HasColumnType("numeric(10, 0)");

				entity.Property(e => e.TotMkt2).HasColumnType("numeric(10, 0)");

				entity.Property(e => e.TotMkt3).HasColumnType("numeric(10, 0)");

				entity.Property(e => e.TotMkt4).HasColumnType("numeric(10, 0)");

				entity.Property(e => e.Year).HasColumnType("numeric(4, 0)");
			});

			modelBuilder.Entity<L2district>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Districts");

				entity.Property(e => e.Coname)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("coname");

				entity.Property(e => e.DistName)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.Gentaxtype).HasColumnName("gentaxtype");

				entity.Property(e => e.Taxyear).HasColumnName("taxyear");
			});

			modelBuilder.Entity<L2districtsBkpKmp20220613>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Districts_bkp_kmp_20220613");

				entity.Property(e => e.Coname)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("coname");

				entity.Property(e => e.DistName)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.Gentaxtype).HasColumnName("gentaxtype");

				entity.Property(e => e.Taxyear).HasColumnName("taxyear");
			});

			modelBuilder.Entity<L2levy>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Levy");

				entity.Property(e => e.DistName)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.EstLevy).HasColumnType("decimal(10, 9)");

				entity.Property(e => e.L2cat).HasColumnName("L2Cat");

				entity.Property(e => e.L2distNum).HasColumnName("L2DistNum");
			});

			modelBuilder.Entity<L2levy2>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Levy2");

				entity.Property(e => e.Distname)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.Estlevy).HasColumnType("decimal(18, 9)");
			});

			modelBuilder.Entity<L2levy22021>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Levy2_2021");

				entity.Property(e => e.Distname)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.Estlevy).HasColumnType("decimal(18, 9)");
			});

			modelBuilder.Entity<L2levyJames20220624>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("L2Levy_james_20220624");

				entity.Property(e => e.DistName)
									.HasMaxLength(100)
									.IsUnicode(false);

				entity.Property(e => e.EstLevy).HasColumnType("decimal(10, 9)");

				entity.Property(e => e.L2cat).HasColumnName("L2Cat");

				entity.Property(e => e.L2distnum).HasColumnName("L2Distnum");
			});

			modelBuilder.Entity<LanDistricttype>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("lanDISTRICTTYPE");

				entity.Property(e => e.FstrDecode1)
									.HasMaxLength(12)
									.IsUnicode(false)
									.HasColumnName("fstrDecode1");

				entity.Property(e => e.FstrDecode2)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("fstrDecode2");

				entity.Property(e => e.FstrDecode3)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("fstrDecode3");

				entity.Property(e => e.FstrDistrictType)
									.HasMaxLength(6)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrLanguage)
									.HasMaxLength(3)
									.IsUnicode(false)
									.HasColumnName("fstrLanguage")
									.IsFixedLength();
			});

			modelBuilder.Entity<Prcformdatum>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("PRCformdata");

				entity.Property(e => e.AltSolution).HasMaxLength(255);

				entity.Property(e => e.AsgnDateMana).HasColumnType("datetime");

				entity.Property(e => e.AsgnDateTsb)
									.HasColumnType("datetime")
									.HasColumnName("AsgnDateTSB");

				entity.Property(e => e.AsgnTsb).HasColumnName("AsgnTSB");

				entity.Property(e => e.CntyName).HasMaxLength(30);

				entity.Property(e => e.DateReqU).HasColumnType("datetime");

				entity.Property(e => e.Description).HasMaxLength(255);

				entity.Property(e => e.Originator).HasMaxLength(30);

				entity.Property(e => e.ProjMgr).HasMaxLength(30);

				entity.Property(e => e.ProjName).HasMaxLength(30);

				entity.Property(e => e.Solution).HasMaxLength(255);

				entity.Property(e => e.SubmitDate).HasColumnType("datetime");
			});

			modelBuilder.Entity<Prctrandatum>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("PRCtrandata");

				entity.Property(e => e.CntyName).HasMaxLength(30);

				entity.Property(e => e.Description).HasMaxLength(255);

				entity.Property(e => e.Originator).HasMaxLength(30);

				entity.Property(e => e.Solution).HasMaxLength(255);

				entity.Property(e => e.SubmitDate).HasColumnType("datetime");
			});

			modelBuilder.Entity<PropertyTaxEstimator06102022>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("PropertyTaxEstimator06102022");

				entity.Property(e => e.CountyName).HasMaxLength(50);

				entity.Property(e => e.DistName).HasMaxLength(50);

				entity.Property(e => e.EstLevy).HasColumnType("numeric(18, 9)");

				entity.Property(e => e.EstTax).HasColumnType("numeric(18, 0)");
			});

			modelBuilder.Entity<SearchTmp>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("SearchTMP");

				entity.Property(e => e.Id)
									.ValueGeneratedOnAdd()
									.HasColumnName("id");

				entity.Property(e => e.Lvalue)
									.HasColumnType("image")
									.HasColumnName("lvalue");

				entity.Property(e => e.Objectid).HasColumnName("objectid");

				entity.Property(e => e.Property)
									.HasMaxLength(64)
									.IsUnicode(false)
									.HasColumnName("property");

				entity.Property(e => e.Uvalue)
									.HasMaxLength(255)
									.HasColumnName("uvalue");

				entity.Property(e => e.Value)
									.HasMaxLength(255)
									.IsUnicode(false)
									.HasColumnName("value");

				entity.Property(e => e.Version).HasColumnName("version");
			});

			modelBuilder.Entity<StudentEmailFix>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("StudentEmailFix");

				entity.Property(e => e.FEmailAddr)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fEmailAddr");

				entity.Property(e => e.FEmployer)
									.HasMaxLength(50)
									.HasColumnName("fEMPLOYER");

				entity.Property(e => e.FFirstName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fFirstName");

				entity.Property(e => e.FLastName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fLastName");
			});

			modelBuilder.Entity<Task>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TASKS");

				entity.Property(e => e.Agentdate)
									.HasColumnType("datetime")
									.HasColumnName("AGENTDATE");

				entity.Property(e => e.Agentlevel).HasColumnName("AGENTLEVEL");

				entity.Property(e => e.Assndate)
									.HasColumnType("datetime")
									.HasColumnName("ASSNDATE");

				entity.Property(e => e.Attachcount).HasColumnName("ATTACHCOUNT");

				entity.Property(e => e.AwsNum)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("AWS_NUM");

				entity.Property(e => e.Charge).HasColumnName("CHARGE");

				entity.Property(e => e.Clsdby)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("CLSDBY");

				entity.Property(e => e.Clsddate)
									.HasColumnType("datetime")
									.HasColumnName("CLSDDATE");

				entity.Property(e => e.Compflag)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("COMPFLAG");

				entity.Property(e => e.Completed)
									.HasColumnType("datetime")
									.HasColumnName("COMPLETED");

				entity.Property(e => e.Dept)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("DEPT");

				entity.Property(e => e.DeptNum)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("DEPT_NUM");

				entity.Property(e => e.Descript)
									.HasColumnType("text")
									.HasColumnName("DESCRIPT");

				entity.Property(e => e.Duedate)
									.HasColumnType("datetime")
									.HasColumnName("DUEDATE");

				entity.Property(e => e.Elapsemin).HasColumnName("ELAPSEMIN");

				entity.Property(e => e.Elapsetime)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("ELAPSETIME");

				entity.Property(e => e.Emailaddr)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("EMAILADDR");

				entity.Property(e => e.Ft).HasColumnName("FT");

				entity.Property(e => e.Guido)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("GUIDO");

				entity.Property(e => e.Hours).HasColumnName("HOURS");

				entity.Property(e => e.Location)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("LOCATION");

				entity.Property(e => e.Lookup1)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("LOOKUP1");

				entity.Property(e => e.Lookup2)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("LOOKUP2");

				entity.Property(e => e.Modiby)
									.HasMaxLength(255)
									.IsUnicode(false)
									.HasColumnName("MODIBY");

				entity.Property(e => e.Modidate)
									.HasColumnType("datetime")
									.HasColumnName("MODIDATE");

				entity.Property(e => e.Note)
									.HasColumnType("text")
									.HasColumnName("NOTE");

				entity.Property(e => e.Openby)
									.HasMaxLength(255)
									.IsUnicode(false)
									.HasColumnName("OPENBY");

				entity.Property(e => e.Opendate)
									.HasColumnType("datetime")
									.HasColumnName("OPENDATE");

				entity.Property(e => e.Parentwoid).HasColumnName("PARENTWOID");

				entity.Property(e => e.Phone)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("PHONE");

				entity.Property(e => e.PhoneExt)
									.HasMaxLength(8)
									.IsUnicode(false)
									.HasColumnName("PHONE_EXT");

				entity.Property(e => e.Priority)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("PRIORITY");

				entity.Property(e => e.Rate).HasColumnName("RATE");

				entity.Property(e => e.Reqdate)
									.HasColumnType("datetime")
									.HasColumnName("REQDATE");

				entity.Property(e => e.Request)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("REQUEST");

				entity.Property(e => e.Respons)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("RESPONS");

				entity.Property(e => e.Status)
									.HasMaxLength(25)
									.IsUnicode(false)
									.HasColumnName("STATUS");

				entity.Property(e => e.Task1)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("TASK");

				entity.Property(e => e.Type)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("TYPE");

				entity.Property(e => e.Userid).HasColumnName("USERID");

				entity.Property(e => e.WoDate1)
									.HasColumnType("datetime")
									.HasColumnName("WO_DATE1");

				entity.Property(e => e.WoDate2)
									.HasColumnType("datetime")
									.HasColumnName("WO_DATE2");

				entity.Property(e => e.WoInt1).HasColumnName("WO_INT1");

				entity.Property(e => e.WoNum).HasColumnName("WO_NUM");

				entity.Property(e => e.WoNum1).HasColumnName("WO_NUM1");

				entity.Property(e => e.WoText1)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT1");

				entity.Property(e => e.WoText2)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT2");

				entity.Property(e => e.WoText3)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT3");

				entity.Property(e => e.WoText4)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT4");

				entity.Property(e => e.WoText5)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT5");

				entity.Property(e => e.WoText6)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("WO_TEXT6");

				entity.Property(e => e.Woid).HasColumnName("WOID");

				entity.Property(e => e.Wotype2)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("WOTYPE2");

				entity.Property(e => e.Wotype3)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("WOTYPE3");

				entity.Property(e => e.WsNum).HasColumnName("WS_NUM");
			});

			modelBuilder.Entity<Tasktype>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TASKTYPE");

				entity.Property(e => e.Parentid).HasColumnName("PARENTID");

				entity.Property(e => e.Specialist)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("SPECIALIST");

				entity.Property(e => e.Type)
									.HasMaxLength(30)
									.IsUnicode(false)
									.HasColumnName("TYPE");

				entity.Property(e => e.Typeid).HasColumnName("TYPEID");
			});

			modelBuilder.Entity<TblDistrictLevy2008>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2008");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDistrictLevy2009>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2009");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2010>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2010");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(3)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2011>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2011");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2012>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2012");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2013>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2013");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2014>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2014");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2015>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2015");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2016>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2016");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2017>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2017");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2018>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2018");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrDistrictTypeSave).HasColumnName("fstrDistrictTypeSave");
			});

			modelBuilder.Entity<TblDistrictLevy2019>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2019");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDistrictLevy2020>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2020");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDistrictLevy2021>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2021");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDistrictLevy2022>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevy2022");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDistrictLevyActual>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblDistrictLevyActual");

				entity.Property(e => e.Category)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.Class)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.County)
									.HasMaxLength(12)
									.IsUnicode(false);

				entity.Property(e => e.EstPtaxes)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.FdblActualLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblActualLevy");

				entity.Property(e => e.FdblLevy)
									.HasColumnType("numeric(12, 9)")
									.HasColumnName("fdblLevy");

				entity.Property(e => e.FintRecNumber).HasColumnName("fintRecNumber");

				entity.Property(e => e.FstrDistrict).HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(40)
									.IsUnicode(false)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType).HasColumnName("fstrDistrictType");
			});

			modelBuilder.Entity<TblDownload>(entity =>
			{
				entity.HasKey(e => e.Fintkey);

				entity.ToTable("tblDownloads");

				entity.HasIndex(e => new { e.FstrCategory, e.FstrSubCategory, e.FstrLink }, "ix_tblDownloads_Category_SubCategory_Link")
									.HasFillFactor(90);

				entity.Property(e => e.Fintkey).HasColumnName("fintkey");

				entity.Property(e => e.FblnActive).HasColumnName("fblnActive");

				entity.Property(e => e.FdtmDateAvailable)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateAvailable");

				entity.Property(e => e.FdtmDateRemoved)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateRemoved");

				entity.Property(e => e.FstrCategory)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("fstrCategory")
									.IsFixedLength();

				entity.Property(e => e.FstrDescription)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrDescription");

				entity.Property(e => e.FstrDetails)
									.HasMaxLength(240)
									.IsUnicode(false)
									.HasColumnName("fstrDetails");

				entity.Property(e => e.FstrLink)
									.HasMaxLength(120)
									.IsUnicode(false)
									.HasColumnName("fstrLink");

				entity.Property(e => e.FstrSubCategory)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("fstrSubCategory")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblEnrolled>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblEnrolled");

				entity.Property(e => e.AddrCity)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrState)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrSteNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrStreet)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrZip)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AdvCrystal).HasColumnName("adv_crystal");

				entity.Property(e => e.ArcexplorerBoise).HasColumnName("arcexplorer_boise");

				entity.Property(e => e.ArcexplorerCda).HasColumnName("arcexplorer_cda");

				entity.Property(e => e.ArcexplorerIf).HasColumnName("arcexplorer_if");

				entity.Property(e => e.AssessmRndtable).HasColumnName("assessm_rndtable");

				entity.Property(e => e.BasicCrystal).HasColumnName("basic_crystal");

				entity.Property(e => e.CustServ).HasColumnName("cust_serv");

				entity.Property(e => e.DateRegistered).HasColumnType("datetime");

				entity.Property(e => e.EmailAddr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Employer)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.EsriCadastral).HasColumnName("esri_cadastral");

				entity.Property(e => e.FaxAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FaxAC");

				entity.Property(e => e.FaxNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FaxPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FirstName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Geomedia).HasColumnName("geomedia");

				entity.Property(e => e.Geoprocess).HasColumnName("geoprocess");

				entity.Property(e => e.GeoprocessIf).HasColumnName("geoprocess_if");

				entity.Property(e => e.GeoprocessLewiston).HasColumnName("geoprocess_lewiston");

				entity.Property(e => e.Iaao171).HasColumnName("iaao_171");

				entity.Property(e => e.Iaao600).HasColumnName("iaao_600");

				entity.Property(e => e.Iaao601).HasColumnName("iaao_601");

				entity.Property(e => e.Iaao931Seca).HasColumnName("iaao_931_seca");

				entity.Property(e => e.Iaao931Secb).HasColumnName("iaao_931_secb");

				entity.Property(e => e.Iaao937Seca).HasColumnName("iaao_937_seca");

				entity.Property(e => e.Iaao937Secb).HasColumnName("iaao_937_secb");

				entity.Property(e => e.InteroCommun).HasColumnName("intero_commun");

				entity.Property(e => e.IntroArcgis).HasColumnName("intro_arcgis");

				entity.Property(e => e.IntroGeodatab).HasColumnName("intro_geodatab");

				entity.Property(e => e.JobTitle)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.LastName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.LegalIssues).HasColumnName("legal_issues");

				entity.Property(e => e.Metadata).HasColumnName("metadata");

				entity.Property(e => e.Mi)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("MI");

				entity.Property(e => e.Negotiating).HasColumnName("negotiating");

				entity.Property(e => e.ProvalExercises).HasColumnName("proval_exercises");

				entity.Property(e => e.SetSupAchvGoals).HasColumnName("set_sup_achv_goals");

				entity.Property(e => e.TaxPolicyWrkshp).HasColumnName("tax_policy_wrkshp");

				entity.Property(e => e.TelAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("TelAC");

				entity.Property(e => e.TelNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.TelPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.TimeMgmt).HasColumnName("time_mgmt");

				entity.Property(e => e.UrbanRenewal).HasColumnName("urban_renewal");
			});

			modelBuilder.Entity<TblFileDownload>(entity =>
			{
				entity.HasKey(e => e.Fdblseq);

				entity.ToTable("tblFileDownloads");

				entity.Property(e => e.Fdblseq).HasColumnName("fdblseq");

				entity.Property(e => e.FblnActive).HasColumnName("fblnActive");

				entity.Property(e => e.FdtmDateAvailable)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateAvailable");

				entity.Property(e => e.FdtmDateRemoved)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateRemoved");

				entity.Property(e => e.FstrCategory)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("fstrCategory")
									.IsFixedLength();

				entity.Property(e => e.FstrDescription)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrDescription");

				entity.Property(e => e.FstrDetails)
									.HasMaxLength(240)
									.IsUnicode(false)
									.HasColumnName("fstrDetails");

				entity.Property(e => e.FstrFolder)
									.HasMaxLength(120)
									.IsUnicode(false)
									.HasColumnName("fstrFolder");

				entity.Property(e => e.FstrLink)
									.HasMaxLength(120)
									.IsUnicode(false)
									.HasColumnName("fstrLink");

				entity.Property(e => e.FstrSubCategory)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("fstrSubCategory")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblFormDesc>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblFormDesc");

				entity.Property(e => e.Fddept)
									.HasMaxLength(6)
									.IsUnicode(false)
									.HasColumnName("FDDept")
									.IsFixedLength();

				entity.Property(e => e.Fddesc)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("FDDesc")
									.IsFixedLength();

				entity.Property(e => e.Fdkey)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("FDKey")
									.IsFixedLength();

				entity.Property(e => e.FdminQty)
									.HasColumnType("decimal(18, 0)")
									.HasColumnName("FDMinQty");

				entity.Property(e => e.Fdonline)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("FDOnline")
									.IsFixedLength();

				entity.Property(e => e.Fdpdf)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("FDPDF")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblFormOrder>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblFormOrder");

				entity.Property(e => e.Focomment)
									.HasMaxLength(500)
									.IsUnicode(false)
									.HasColumnName("FOComment")
									.HasDefaultValueSql("('')");

				entity.Property(e => e.Focounty)
									.HasMaxLength(12)
									.IsUnicode(false)
									.HasColumnName("FOCounty")
									.IsFixedLength();

				entity.Property(e => e.Fodate)
									.HasColumnType("datetime")
									.HasColumnName("FODate");

				entity.Property(e => e.FodateMailed)
									.HasColumnType("datetime")
									.HasColumnName("FODateMailed");

				entity.Property(e => e.FoemailAddr)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("FOEMailAddr")
									.IsFixedLength();

				entity.Property(e => e.Fokey)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("FOKey")
									.IsFixedLength();

				entity.Property(e => e.Fomailed)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("FOMailed")
									.IsFixedLength();

				entity.Property(e => e.Foqty)
									.HasColumnType("decimal(18, 0)")
									.HasColumnName("FOQty");

				entity.Property(e => e.FoqtyMailed)
									.HasColumnType("decimal(18, 0)")
									.HasColumnName("FOQtyMailed");
			});

			modelBuilder.Entity<TblGisannex>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblGISannex");

				entity.Property(e => e.Aannex).HasColumnName("aannex");

				entity.Property(e => e.Acounty)
									.HasMaxLength(11)
									.IsUnicode(false)
									.HasColumnName("acounty");

				entity.Property(e => e.Adesc)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("adesc");

				entity.Property(e => e.Adistname)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("adistname");

				entity.Property(e => e.Adisttype)
									.HasMaxLength(2)
									.IsUnicode(false)
									.HasColumnName("adisttype");

				entity.Property(e => e.Adown1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("adown1");

				entity.Property(e => e.Adown2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("adown2");

				entity.Property(e => e.Adown3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("adown3");

				entity.Property(e => e.Aeffyear).HasColumnName("aeffyear");

				entity.Property(e => e.Afmt1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("afmt1");

				entity.Property(e => e.Afmt2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("afmt2");

				entity.Property(e => e.Afmt3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("afmt3");

				entity.Property(e => e.Afolder)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("afolder");

				entity.Property(e => e.Ameta1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ameta1");

				entity.Property(e => e.Ameta2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ameta2");

				entity.Property(e => e.Ameta3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ameta3");

				entity.Property(e => e.Aordinance)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("aordinance");

				entity.Property(e => e.Aprojection)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("aprojection");

				entity.Property(e => e.Aview1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("aview1");

				entity.Property(e => e.Aview2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("aview2");

				entity.Property(e => e.Aview3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("aview3");
			});

			modelBuilder.Entity<TblGisdistrict>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblGISdistrict");

				entity.Property(e => e.Dcounty)
									.HasMaxLength(11)
									.IsUnicode(false)
									.HasColumnName("dcounty")
									.IsFixedLength();

				entity.Property(e => e.Ddesc)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("ddesc")
									.IsFixedLength();

				entity.Property(e => e.Ddisttype)
									.HasMaxLength(2)
									.IsUnicode(false)
									.HasColumnName("ddisttype")
									.IsFixedLength();

				entity.Property(e => e.Ddown1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ddown1")
									.IsFixedLength();

				entity.Property(e => e.Ddown2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ddown2")
									.IsFixedLength();

				entity.Property(e => e.Ddown3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("ddown3")
									.IsFixedLength();

				entity.Property(e => e.Deffyear).HasColumnName("deffyear");

				entity.Property(e => e.Dfmt1)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("dfmt1")
									.IsFixedLength();

				entity.Property(e => e.Dfmt2)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("dfmt2")
									.IsFixedLength();

				entity.Property(e => e.Dfmt3)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("dfmt3")
									.IsFixedLength();

				entity.Property(e => e.Dfolder)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("dfolder")
									.IsFixedLength();

				entity.Property(e => e.Dmeta1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dmeta1")
									.IsFixedLength();

				entity.Property(e => e.Dmeta2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dmeta2")
									.IsFixedLength();

				entity.Property(e => e.Dmeta3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dmeta3")
									.IsFixedLength();

				entity.Property(e => e.Dprojection)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("dprojection")
									.IsFixedLength();

				entity.Property(e => e.Dview1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dview1")
									.IsFixedLength();

				entity.Property(e => e.Dview2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dview2")
									.IsFixedLength();

				entity.Property(e => e.Dview3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("dview3")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblGistca>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblGIStca");

				entity.Property(e => e.Tcounty)
									.HasMaxLength(11)
									.IsUnicode(false)
									.HasColumnName("tcounty")
									.IsFixedLength();

				entity.Property(e => e.Tdesc)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("tdesc")
									.IsFixedLength();

				entity.Property(e => e.Tdown1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tdown1")
									.IsFixedLength();

				entity.Property(e => e.Tdown2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tdown2")
									.IsFixedLength();

				entity.Property(e => e.Tdown3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tdown3")
									.IsFixedLength();

				entity.Property(e => e.Teffyear).HasColumnName("teffyear");

				entity.Property(e => e.Tfmt1)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("tfmt1")
									.IsFixedLength();

				entity.Property(e => e.Tfmt2)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("tfmt2")
									.IsFixedLength();

				entity.Property(e => e.Tfmt3)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("tfmt3")
									.IsFixedLength();

				entity.Property(e => e.Tfolder)
									.HasMaxLength(128)
									.IsUnicode(false)
									.HasColumnName("tfolder")
									.IsFixedLength();

				entity.Property(e => e.Tmeta1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tmeta1")
									.IsFixedLength();

				entity.Property(e => e.Tmeta2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tmeta2")
									.IsFixedLength();

				entity.Property(e => e.Tmeta3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tmeta3")
									.IsFixedLength();

				entity.Property(e => e.Tprojection)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("tprojection")
									.IsFixedLength();

				entity.Property(e => e.Trectype)
									.HasMaxLength(2)
									.IsUnicode(false)
									.HasColumnName("trectype")
									.IsFixedLength();

				entity.Property(e => e.Tview1)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tview1")
									.IsFixedLength();

				entity.Property(e => e.Tview2)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tview2")
									.IsFixedLength();

				entity.Property(e => e.Tview3)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("tview3")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblIdAnnexationLetterDesc>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblID_AnnexationLetterDesc");

				entity.Property(e => e.FstrFieldsUsed)
									.HasMaxLength(1200)
									.HasColumnName("fstrFieldsUsed");

				entity.Property(e => e.FstrLetterDescription)
									.HasMaxLength(50)
									.HasColumnName("fstrLetterDescription");

				entity.Property(e => e.FstrLetterId)
									.HasMaxLength(50)
									.HasColumnName("fstrLetterID");

				entity.Property(e => e.FstrLetterType)
									.HasMaxLength(12)
									.HasColumnName("fstrLetterType")
									.IsFixedLength();

				entity.Property(e => e.FstrNoteDefault).HasColumnName("fstrNoteDefault");

				entity.Property(e => e.FstrTemplateName)
									.HasMaxLength(120)
									.HasColumnName("fstrTemplateName");
			});

			modelBuilder.Entity<TblIdCountyTca>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblID_CountyTCA");

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(50)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrCountyTca)
									.HasMaxLength(50)
									.HasColumnName("fstrCountyTCA");

				entity.Property(e => e.FstrTaxCodeArea)
									.HasMaxLength(50)
									.HasColumnName("fstrTaxCodeArea");
			});

			modelBuilder.Entity<TblPtrsecurity>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblPTRSecurity");

				entity.Property(e => e.FstrCountyName)
									.HasMaxLength(13)
									.IsUnicode(false)
									.HasColumnName("fstrCountyName")
									.IsFixedLength();

				entity.Property(e => e.FstrInquiryOnly)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("fstrInquiryOnly")
									.HasDefaultValueSql("('N')")
									.IsFixedLength();

				entity.Property(e => e.FstrPassword)
									.HasMaxLength(300)
									.HasColumnName("fstrPassword");

				entity.Property(e => e.FstrUserName)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("fstrUserName")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblRequest>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblRequests");

				entity.Property(e => e.FdtmWhen)
									.HasColumnType("datetime")
									.HasColumnName("fdtmWhen")
									.HasDefaultValueSql("(getdate())");

				entity.Property(e => e.FstrCountyName)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("fstrCountyName")
									.IsFixedLength();

				entity.Property(e => e.FstrLink)
									.HasMaxLength(120)
									.IsUnicode(false)
									.HasColumnName("fstrLink");

				entity.Property(e => e.FstrUserName)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("fstrUserName")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblSchoolCertType>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblSchoolCertType");

				entity.Property(e => e.CertDesc)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.CertType)
									.HasMaxLength(1)
									.IsUnicode(false);
			});

			modelBuilder.Entity<TblSchoolCourse>(entity =>
			{
				entity.HasKey(e => new { e.CDateSchool, e.CSchoolType, e.CSseq, e.CSeq });

				entity.ToTable("tblSchoolCourses");

				entity.Property(e => e.CDateSchool)
									.HasColumnType("datetime")
									.HasColumnName("cDateSchool");

				entity.Property(e => e.CSchoolType)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cSchoolType");

				entity.Property(e => e.CSseq).HasColumnName("cSSeq");

				entity.Property(e => e.CSeq).HasColumnName("cSeq");

				entity.Property(e => e.CAllow)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cAllow")
									.HasDefaultValueSql("('Y')")
									.IsFixedLength();

				entity.Property(e => e.CAttendCredit).HasColumnName("cAttendCredit");

				entity.Property(e => e.CCertType)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cCertType")
									.HasDefaultValueSql("('B')")
									.IsFixedLength();

				entity.Property(e => e.CDesc)
									.HasMaxLength(256)
									.IsUnicode(false)
									.HasColumnName("cDesc");

				entity.Property(e => e.CFullCredit).HasColumnName("cFullCredit");

				entity.Property(e => e.CLink)
									.HasMaxLength(160)
									.IsUnicode(false)
									.HasColumnName("cLink");

				entity.Property(e => e.CMaxStudents).HasColumnName("cMaxStudents");

				entity.Property(e => e.CName)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("cName");

				entity.Property(e => e.CPabclass)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cPABclass")
									.HasDefaultValueSql("('Y')")
									.IsFixedLength();

				entity.Property(e => e.CRoom)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("cRoom");

				entity.Property(e => e.CTime)
									.HasMaxLength(20)
									.IsUnicode(false)
									.HasColumnName("cTime");

				entity.Property(e => e.Cprereq)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("cprereq")
									.HasDefaultValueSql("('')");

				entity.Property(e => e.Cwkday1)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday1")
									.IsFixedLength();

				entity.Property(e => e.Cwkday2)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday2")
									.IsFixedLength();

				entity.Property(e => e.Cwkday3)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday3")
									.IsFixedLength();

				entity.Property(e => e.Cwkday4)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday4")
									.IsFixedLength();

				entity.Property(e => e.Cwkday5)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday5")
									.IsFixedLength();

				entity.Property(e => e.Cwkday6)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday6")
									.IsFixedLength();

				entity.Property(e => e.Cwkday7)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("cwkday7")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblSchoolEnroll>(entity =>
			{
				entity.HasKey(e => new { e.LastName, e.FirstName, e.EmailAddr, e.DateSchool, e.SchoolType, e.Seq });

				entity.ToTable("tblSchoolEnroll");

				entity.Property(e => e.LastName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FirstName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.EmailAddr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.DateSchool).HasColumnType("datetime");

				entity.Property(e => e.SchoolType)
									.HasMaxLength(1)
									.IsUnicode(false);

				entity.Property(e => e.AddrCity)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrState)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrSteNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrStreet)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrZip)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.C01).HasColumnName("c01");

				entity.Property(e => e.C02).HasColumnName("c02");

				entity.Property(e => e.C03).HasColumnName("c03");

				entity.Property(e => e.C04).HasColumnName("c04");

				entity.Property(e => e.C05).HasColumnName("c05");

				entity.Property(e => e.C06).HasColumnName("c06");

				entity.Property(e => e.C07).HasColumnName("c07");

				entity.Property(e => e.C08).HasColumnName("c08");

				entity.Property(e => e.C09).HasColumnName("c09");

				entity.Property(e => e.C10).HasColumnName("c10");

				entity.Property(e => e.C11).HasColumnName("c11");

				entity.Property(e => e.C12).HasColumnName("c12");

				entity.Property(e => e.C13).HasColumnName("c13");

				entity.Property(e => e.C14).HasColumnName("c14");

				entity.Property(e => e.C15).HasColumnName("c15");

				entity.Property(e => e.C16).HasColumnName("c16");

				entity.Property(e => e.C17).HasColumnName("c17");

				entity.Property(e => e.C18).HasColumnName("c18");

				entity.Property(e => e.C19).HasColumnName("c19");

				entity.Property(e => e.C20).HasColumnName("c20");

				entity.Property(e => e.C21).HasColumnName("c21");

				entity.Property(e => e.C22).HasColumnName("c22");

				entity.Property(e => e.C23).HasColumnName("c23");

				entity.Property(e => e.C24).HasColumnName("c24");

				entity.Property(e => e.C25).HasColumnName("c25");

				entity.Property(e => e.C26).HasColumnName("c26");

				entity.Property(e => e.C27).HasColumnName("c27");

				entity.Property(e => e.C28).HasColumnName("c28");

				entity.Property(e => e.C29).HasColumnName("c29");

				entity.Property(e => e.C30).HasColumnName("c30");

				entity.Property(e => e.C31).HasColumnName("c31");

				entity.Property(e => e.C32).HasColumnName("c32");

				entity.Property(e => e.C33).HasColumnName("c33");

				entity.Property(e => e.C34).HasColumnName("c34");

				entity.Property(e => e.C35).HasColumnName("c35");

				entity.Property(e => e.C36).HasColumnName("c36");

				entity.Property(e => e.C37).HasColumnName("c37");

				entity.Property(e => e.C38).HasColumnName("c38");

				entity.Property(e => e.C39).HasColumnName("c39");

				entity.Property(e => e.C40).HasColumnName("c40");

				entity.Property(e => e.DateRegistered).HasColumnType("datetime");

				entity.Property(e => e.Employer)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FaxAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FaxAC");

				entity.Property(e => e.FaxNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FaxPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.JobTitle)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Mi)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("MI");

				entity.Property(e => e.TelAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("TelAC");

				entity.Property(e => e.TelNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.TelPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);
			});

			modelBuilder.Entity<TblSchoolHistory>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblSchoolHistory");

				entity.Property(e => e.Appraiser).HasColumnName("APPRAISER");

				entity.Property(e => e.CertNo).HasColumnName("CERT_NO");

				entity.Property(e => e.Certified)
									.HasColumnType("datetime")
									.HasColumnName("CERTIFIED");

				entity.Property(e => e.Course)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("COURSE");

				entity.Property(e => e.HCertType)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("hCertType");

				entity.Property(e => e.HDateSchool)
									.HasColumnType("datetime")
									.HasColumnName("hDateSchool");

				entity.Property(e => e.HEmailAddr)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("hEmailAddr");

				entity.Property(e => e.HEmployer)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("hEMPLOYER");

				entity.Property(e => e.HFirstName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("hFirstName");

				entity.Property(e => e.HLastName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("hLastName");

				entity.Property(e => e.HName)
									.HasMaxLength(50)
									.HasColumnName("hNAME");

				entity.Property(e => e.HSchoolType)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("hSchoolType");

				entity.Property(e => e.HSeq).HasColumnName("hSeq");

				entity.Property(e => e.HSseq).HasColumnName("hSSeq");

				entity.Property(e => e.Hours).HasColumnName("HOURS");

				entity.Property(e => e.MNo).HasColumnName("M_NO");

				entity.Property(e => e.Mapper).HasColumnName("MAPPER");

				entity.Property(e => e.Nc).HasColumnName("NC");

				entity.Property(e => e.Rowid)
									.ValueGeneratedOnAdd()
									.HasColumnName("rowid");

				entity.Property(e => e.Yearx).HasColumnName("YEARx");
			});

			modelBuilder.Entity<TblSchoolInfo>(entity =>
			{
				entity.HasKey(e => new { e.SschoolType, e.SdateSchool, e.Sseq });

				entity.ToTable("tblSchoolInfo");

				entity.Property(e => e.SschoolType)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("SSchoolType");

				entity.Property(e => e.SdateSchool)
									.HasColumnType("datetime")
									.HasColumnName("SDateSchool");

				entity.Property(e => e.Sseq).HasColumnName("SSeq");

				entity.Property(e => e.Scity)
									.HasMaxLength(60)
									.IsUnicode(false)
									.HasColumnName("SCity");

				entity.Property(e => e.Sdeadline)
									.HasColumnType("datetime")
									.HasColumnName("SDeadline");

				entity.Property(e => e.Slocation1)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("SLocation1");

				entity.Property(e => e.Slocation2)
									.HasMaxLength(80)
									.IsUnicode(false)
									.HasColumnName("SLocation2");
			});

			modelBuilder.Entity<TblSchoolSecurity>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblSchoolSecurity");

				entity.Property(e => e.FstrCountyAdmin)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("fstrCountyAdmin")
									.IsFixedLength();

				entity.Property(e => e.FstrCountyName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrCountyName");

				entity.Property(e => e.FstrFirstName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrFirstName");

				entity.Property(e => e.FstrLastName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrLastName");

				entity.Property(e => e.FstrPassword)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("fstrPassword");

				entity.Property(e => e.FstrUserName)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrUserName");
			});

			modelBuilder.Entity<TblSecurity>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblSecurity");

				entity.HasIndex(e => new { e.FstrUserName, e.FstrCountyName }, "ix_tblSecutiry_County_User")
									.HasFillFactor(90);

				entity.Property(e => e.FstrCountyName)
									.HasMaxLength(10)
									.IsUnicode(false)
									.HasColumnName("fstrCountyName")
									.IsFixedLength();

				entity.Property(e => e.FstrPassword)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("fstrPassword");

				entity.Property(e => e.FstrUserName)
									.HasMaxLength(15)
									.IsUnicode(false)
									.HasColumnName("fstrUserName")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblSummerSchool>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblSummerSchool");

				entity.Property(e => e.AddrCity)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrState)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrSteNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrStreet)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.AddrZip)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.DateRegistered).HasColumnType("datetime");

				entity.Property(e => e.EmailAddr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Employer)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FaxAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FaxAC");

				entity.Property(e => e.FaxNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FaxPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.FirstName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.JobTitle)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.LastName)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Mi)
									.HasMaxLength(1)
									.IsUnicode(false)
									.HasColumnName("MI");

				entity.Property(e => e.TelAc)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("TelAC");

				entity.Property(e => e.TelNmbr)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.TelPrfx)
									.HasMaxLength(50)
									.IsUnicode(false);
			});

			modelBuilder.Entity<TblUcpnew>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblUCPnew");

				entity.Property(e => e.Amount)
									.HasMaxLength(25)
									.IsUnicode(false);

				entity.Property(e => e.City)
									.HasMaxLength(20)
									.IsUnicode(false);

				entity.Property(e => e.Fname)
									.HasMaxLength(46)
									.IsUnicode(false);

				entity.Property(e => e.Lname)
									.HasMaxLength(46)
									.IsUnicode(false);

				entity.Property(e => e.State)
									.HasMaxLength(2)
									.IsUnicode(false);
			});

			modelBuilder.Entity<Tblgisesriscript>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblgisesriscript");

				entity.Property(e => e.Fblnonoff)
									.IsRequired()
									.HasColumnName("fblnonoff")
									.HasDefaultValueSql("(1)");

				entity.Property(e => e.Fdtmadded)
									.HasColumnType("datetime")
									.HasColumnName("fdtmadded")
									.HasDefaultValueSql("(2000 - 1 - 1)");

				entity.Property(e => e.Flngid)
									.ValueGeneratedOnAdd()
									.HasColumnName("flngid");

				entity.Property(e => e.Fstrcexam)
									.HasMaxLength(200)
									.IsUnicode(false)
									.HasColumnName("fstrcexam");

				entity.Property(e => e.Fstrcexpl)
									.HasMaxLength(1000)
									.IsUnicode(false)
									.HasColumnName("fstrcexpl");

				entity.Property(e => e.Fstrcfmt)
									.HasMaxLength(200)
									.IsUnicode(false)
									.HasColumnName("fstrcfmt");

				entity.Property(e => e.Fstrcontrib)
									.HasMaxLength(250)
									.IsUnicode(false)
									.HasColumnName("fstrcontrib");

				entity.Property(e => e.Fstrimgpth)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrimgpth");

				entity.Property(e => e.Fstrlgdesc)
									.HasMaxLength(3000)
									.IsUnicode(false)
									.HasColumnName("fstrlgdesc");

				entity.Property(e => e.Fstrshdesc)
									.HasMaxLength(250)
									.IsUnicode(false)
									.HasColumnName("fstrshdesc");

				entity.Property(e => e.Fstrstret)
									.HasMaxLength(300)
									.IsUnicode(false)
									.HasColumnName("fstrstret");

				entity.Property(e => e.Fstrtitle)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("fstrtitle");
			});

			modelBuilder.Entity<Tblgisesriscripttitle>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblgisesriscripttitles");

				entity.Property(e => e.Flngid)
									.ValueGeneratedOnAdd()
									.HasColumnName("flngid");

				entity.Property(e => e.Fstrtitle)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrtitle");
			});

			modelBuilder.Entity<TblidAakensRename>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tblid_aakens_renames");

				entity.Property(e => e.Kens)
									.HasMaxLength(10)
									.HasColumnName("kens")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblidAnnexation>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_Annexation");

				entity.Property(e => e.FdtmApprovalLtrPrinted)
									.HasColumnType("datetime")
									.HasColumnName("fdtmApprovalLtrPrinted");

				entity.Property(e => e.FdtmCurrentStatus)
									.HasColumnType("datetime")
									.HasColumnName("fdtmCurrentStatus");

				entity.Property(e => e.FdtmDateApproved)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateApproved");

				entity.Property(e => e.FdtmDateDue)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateDue");

				entity.Property(e => e.FdtmDateReceived)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReceived");

				entity.Property(e => e.FdtmDateReceived2)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReceived2");

				entity.Property(e => e.FdtmDateReceived3)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReceived3");

				entity.Property(e => e.FdtmDateReturned)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReturned");

				entity.Property(e => e.FdtmDateReturned2)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReturned2");

				entity.Property(e => e.FdtmDateReturned3)
									.HasColumnType("datetime")
									.HasColumnName("fdtmDateReturned3");

				entity.Property(e => e.FdtmOrdDate)
									.HasColumnType("datetime")
									.HasColumnName("fdtmOrdDate");

				entity.Property(e => e.FdtmWhen)
									.HasColumnType("datetime")
									.HasColumnName("fdtmWhen");

				entity.Property(e => e.FlngDocEffYear).HasColumnName("flngDocEffYear");

				entity.Property(e => e.FlngDocNumber).HasColumnName("flngDocNumber");

				entity.Property(e => e.FlngLastAddress).HasColumnName("flngLastAddress");

				entity.Property(e => e.FlngLastImage).HasColumnName("flngLastImage");

				entity.Property(e => e.FlngLastLegal).HasColumnName("flngLastLegal");

				entity.Property(e => e.FlngLastNote).HasColumnName("flngLastNote");

				entity.Property(e => e.FlngVer).HasColumnName("flngVer");

				entity.Property(e => e.FlngVerLast).HasColumnName("flngVerLast");

				entity.Property(e => e.FstrAnnexComplete)
									.HasMaxLength(1)
									.HasColumnName("fstrAnnexComplete")
									.IsFixedLength();

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(6)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrCurrentStatus)
									.HasMaxLength(1)
									.HasColumnName("fstrCurrentStatus")
									.IsFixedLength();

				entity.Property(e => e.FstrDistrict)
									.HasMaxLength(6)
									.HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictType)
									.HasMaxLength(6)
									.HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrGiscomplete)
									.HasMaxLength(1)
									.HasColumnName("fstrGISComplete")
									.IsFixedLength();

				entity.Property(e => e.FstrImageName)
									.HasMaxLength(120)
									.HasColumnName("fstrImageName");

				entity.Property(e => e.FstrLocMailed)
									.HasMaxLength(1)
									.HasColumnName("fstrLOC_Mailed")
									.IsFixedLength();

				entity.Property(e => e.FstrLocPrinted)
									.HasMaxLength(1)
									.HasColumnName("fstrLOC_Printed")
									.IsFixedLength();

				entity.Property(e => e.FstrNewOrd)
									.HasMaxLength(1)
									.HasColumnName("fstrNew_Ord")
									.IsFixedLength();

				entity.Property(e => e.FstrOrdDescNumber)
									.HasMaxLength(10)
									.HasColumnName("fstrOrdDescNumber");

				entity.Property(e => e.FstrOrdNumber)
									.HasMaxLength(60)
									.HasColumnName("fstrOrdNumber");

				entity.Property(e => e.FstrPdfname)
									.HasMaxLength(120)
									.HasColumnName("fstrPDFName");

				entity.Property(e => e.FstrPdfname2)
									.HasMaxLength(120)
									.HasColumnName("fstrPDFName2");

				entity.Property(e => e.FstrRecordType)
									.HasMaxLength(15)
									.HasColumnName("fstrRecordType");

				entity.Property(e => e.FstrRegionComp)
									.HasMaxLength(1)
									.HasColumnName("fstrRegionComp")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusClosed)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusClosed")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusCogoDig)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusCogoDig")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusComments)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusComments")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusInBook)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusInBook")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusMatching)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusMatching")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusPaperWork)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusPaperWork")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusProblems)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusProblems")
									.IsFixedLength();

				entity.Property(e => e.FstrValid)
									.HasMaxLength(1)
									.HasColumnName("fstrValid")
									.IsFixedLength();

				entity.Property(e => e.FstrWho)
									.HasMaxLength(10)
									.HasColumnName("fstrWho");

				entity.Property(e => e.FstrWhoDoneIt)
									.HasMaxLength(10)
									.HasColumnName("fstrWhoDoneIt");

				entity.Property(e => e.FstrWhoHasIt)
									.HasMaxLength(10)
									.HasColumnName("fstrWhoHasIt");
			});

			modelBuilder.Entity<TblidAnnexationAddress>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationAddresses");

				entity.Property(e => e.FdtmWhen)
									.HasColumnType("datetime")
									.HasColumnName("fdtmWhen");

				entity.Property(e => e.FlngAddressNumber).HasColumnName("flngAddressNumber");

				entity.Property(e => e.FlngDocEffYear).HasColumnName("flngDocEffYear");

				entity.Property(e => e.FlngDocNumber).HasColumnName("flngDocNumber");

				entity.Property(e => e.FstrAddress)
									.HasMaxLength(120)
									.HasColumnName("fstrAddress");

				entity.Property(e => e.FstrAddresstype)
									.HasMaxLength(1)
									.HasColumnName("fstrAddresstype")
									.IsFixedLength();

				entity.Property(e => e.FstrCity)
									.HasMaxLength(30)
									.HasColumnName("fstrCity");

				entity.Property(e => e.FstrCompanyName)
									.HasMaxLength(40)
									.HasColumnName("fstrCompanyName");

				entity.Property(e => e.FstrCountry)
									.HasMaxLength(10)
									.HasColumnName("fstrCountry");

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(6)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrEmailAddress)
									.HasMaxLength(80)
									.HasColumnName("fstrEmailAddress");

				entity.Property(e => e.FstrFaxNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrFaxNumber");

				entity.Property(e => e.FstrFirstName)
									.HasMaxLength(20)
									.HasColumnName("fstrFirstName");

				entity.Property(e => e.FstrLastName)
									.HasMaxLength(20)
									.HasColumnName("fstrLastName");

				entity.Property(e => e.FstrMiddleInitial)
									.HasMaxLength(1)
									.HasColumnName("fstrMiddleInitial")
									.IsFixedLength();

				entity.Property(e => e.FstrPhoneNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrPhoneNumber");

				entity.Property(e => e.FstrSalutation)
									.HasMaxLength(10)
									.HasColumnName("fstrSalutation");

				entity.Property(e => e.FstrState)
									.HasMaxLength(20)
									.HasColumnName("fstrState");

				entity.Property(e => e.FstrTitle)
									.HasMaxLength(40)
									.HasColumnName("fstrTitle");

				entity.Property(e => e.FstrValid)
									.HasMaxLength(1)
									.HasColumnName("fstrValid")
									.IsFixedLength();

				entity.Property(e => e.FstrWho)
									.HasMaxLength(10)
									.HasColumnName("fstrWho");

				entity.Property(e => e.FstrZipCode)
									.HasMaxLength(10)
									.HasColumnName("fstrZipCode");
			});

			modelBuilder.Entity<TblidAnnexationCounty>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationCounty");

				entity.Property(e => e.FstrAaddress)
									.HasMaxLength(120)
									.HasColumnName("fstrAAddress");

				entity.Property(e => e.FstrAcity)
									.HasMaxLength(30)
									.HasColumnName("fstrACity");

				entity.Property(e => e.FstrAcountry)
									.HasMaxLength(10)
									.HasColumnName("fstrACountry");

				entity.Property(e => e.FstrAemailAddress)
									.HasMaxLength(80)
									.HasColumnName("fstrAEmailAddress");

				entity.Property(e => e.FstrAfaxNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrAFaxNumber");

				entity.Property(e => e.FstrAfirstName)
									.HasMaxLength(20)
									.HasColumnName("fstrAFirstName");

				entity.Property(e => e.FstrAlastName)
									.HasMaxLength(20)
									.HasColumnName("fstrALastName");

				entity.Property(e => e.FstrAmiddleName)
									.HasMaxLength(1)
									.HasColumnName("fstrAMiddleName")
									.IsFixedLength();

				entity.Property(e => e.FstrAphoneNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrAPhoneNumber");

				entity.Property(e => e.FstrAsalutation)
									.HasMaxLength(10)
									.HasColumnName("fstrASalutation");

				entity.Property(e => e.FstrAstate)
									.HasMaxLength(20)
									.HasColumnName("fstrAState");

				entity.Property(e => e.FstrAzipCode)
									.HasMaxLength(10)
									.HasColumnName("fstrAZipCode");

				entity.Property(e => e.FstrCaddress)
									.HasMaxLength(120)
									.HasColumnName("fstrCAddress");

				entity.Property(e => e.FstrCcity)
									.HasMaxLength(30)
									.HasColumnName("fstrCCity");

				entity.Property(e => e.FstrCcountry)
									.HasMaxLength(10)
									.HasColumnName("fstrCCountry");

				entity.Property(e => e.FstrCemailAddress)
									.HasMaxLength(80)
									.HasColumnName("fstrCEmailAddress");

				entity.Property(e => e.FstrCfaxNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrCFaxNumber");

				entity.Property(e => e.FstrCfirstName)
									.HasMaxLength(20)
									.HasColumnName("fstrCFirstName");

				entity.Property(e => e.FstrClastName)
									.HasMaxLength(20)
									.HasColumnName("fstrCLastName");

				entity.Property(e => e.FstrCmiddleInitial)
									.HasMaxLength(1)
									.HasColumnName("fstrCMiddleInitial")
									.IsFixedLength();

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(6)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrCountyName)
									.HasMaxLength(20)
									.HasColumnName("fstrCountyName");

				entity.Property(e => e.FstrCphoneNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrCPhoneNumber");

				entity.Property(e => e.FstrCsalutation)
									.HasMaxLength(10)
									.HasColumnName("fstrCSalutation");

				entity.Property(e => e.FstrCstate)
									.HasMaxLength(20)
									.HasColumnName("fstrCState");

				entity.Property(e => e.FstrCzipCode)
									.HasMaxLength(10)
									.HasColumnName("fstrCZipCode");
			});

			modelBuilder.Entity<TblidAnnexationDistrict>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationDistrict");

				entity.Property(e => e.FdtmUrcreation)
									.HasColumnType("datetime")
									.HasColumnName("fdtmURCreation");

				entity.Property(e => e.FdtmUrexpiration)
									.HasColumnType("datetime")
									.HasColumnName("fdtmURExpiration");

				entity.Property(e => e.FintUrtermYears).HasColumnName("fintURTermYears");

				entity.Property(e => e.FstrCaddress)
									.HasMaxLength(120)
									.HasColumnName("fstrCAddress");

				entity.Property(e => e.FstrCcity)
									.HasMaxLength(30)
									.HasColumnName("fstrCCity");

				entity.Property(e => e.FstrCcountry)
									.HasMaxLength(10)
									.HasColumnName("fstrCCountry");

				entity.Property(e => e.FstrCemailAddress)
									.HasMaxLength(80)
									.HasColumnName("fstrCEmailAddress");

				entity.Property(e => e.FstrCfaxNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrCFaxNumber");

				entity.Property(e => e.FstrCfirstName)
									.HasMaxLength(20)
									.HasColumnName("fstrCFirstName");

				entity.Property(e => e.FstrClastName)
									.HasMaxLength(20)
									.HasColumnName("fstrClastName");

				entity.Property(e => e.FstrCmiddleInitial)
									.HasMaxLength(1)
									.HasColumnName("fstrCMiddleInitial")
									.IsFixedLength();

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(6)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrCphoneNumber)
									.HasMaxLength(20)
									.HasColumnName("fstrCPhoneNumber");

				entity.Property(e => e.FstrCsalutation)
									.HasMaxLength(10)
									.HasColumnName("fstrCSalutation");

				entity.Property(e => e.FstrCstate)
									.HasMaxLength(20)
									.HasColumnName("fstrCState");

				entity.Property(e => e.FstrCtitle)
									.HasMaxLength(40)
									.HasColumnName("fstrCTitle");

				entity.Property(e => e.FstrCzipCode)
									.HasMaxLength(10)
									.HasColumnName("fstrCZipCode");

				entity.Property(e => e.FstrDistrict)
									.HasMaxLength(6)
									.HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(46)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType)
									.HasMaxLength(6)
									.HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrUroneAnnexation)
									.HasMaxLength(1)
									.HasColumnName("fstrUROneAnnexation");
			});

			modelBuilder.Entity<TblidAnnexationImageDoc>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationImageDoc");

				entity.Property(e => e.FlngDocEffYear).HasColumnName("flngDocEffYear");

				entity.Property(e => e.FlngDocNumber).HasColumnName("flngDocNumber");

				entity.Property(e => e.FlngImageNumber).HasColumnName("flngImageNumber");

				entity.Property(e => e.FstrImageFldr)
									.HasMaxLength(120)
									.HasColumnName("fstrImageFldr");

				entity.Property(e => e.FstrImageName)
									.HasMaxLength(120)
									.HasColumnName("fstrImageName");

				entity.Property(e => e.FstrImageType)
									.HasMaxLength(1)
									.HasColumnName("fstrImageType")
									.IsFixedLength();

				entity.Property(e => e.FstrImageValid)
									.HasMaxLength(1)
									.HasColumnName("fstrImageValid")
									.IsFixedLength();
			});

			modelBuilder.Entity<TblidAnnexationLetterHistory>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationLetterHistory");

				entity.Property(e => e.FdtmWhen)
									.HasColumnType("datetime")
									.HasColumnName("fdtmWhen");

				entity.Property(e => e.FlngDocEffYear).HasColumnName("flngDocEffYear");

				entity.Property(e => e.FlngDocNumber).HasColumnName("flngDocNumber");

				entity.Property(e => e.FlngNoteNumber).HasColumnName("flngNoteNumber");

				entity.Property(e => e.FstrAddressType)
									.HasMaxLength(1)
									.HasColumnName("fstrAddressType")
									.IsFixedLength();

				entity.Property(e => e.FstrCompanyName)
									.HasMaxLength(100)
									.HasColumnName("fstrCompanyName");

				entity.Property(e => e.FstrFirstName)
									.HasMaxLength(20)
									.HasColumnName("fstrFirstName");

				entity.Property(e => e.FstrLastName)
									.HasMaxLength(20)
									.HasColumnName("fstrLastName");

				entity.Property(e => e.FstrLetterId)
									.HasMaxLength(10)
									.HasColumnName("fstrLetterID");

				entity.Property(e => e.FstrLetterName)
									.HasMaxLength(120)
									.HasColumnName("fstrLetterName");

				entity.Property(e => e.FstrLetterValid)
									.HasMaxLength(1)
									.HasColumnName("fstrLetterValid")
									.IsFixedLength();

				entity.Property(e => e.FstrMiddleInitial)
									.HasMaxLength(1)
									.HasColumnName("fstrMiddleInitial")
									.IsFixedLength();

				entity.Property(e => e.FstrSalutation)
									.HasMaxLength(10)
									.HasColumnName("fstrSalutation");
			});

			modelBuilder.Entity<TblidAnnexationOrdDesc>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationOrdDesc");

				entity.Property(e => e.FstrOrdDescNumber)
									.HasMaxLength(10)
									.HasColumnName("fstrOrdDescNumber");

				entity.Property(e => e.FstrOrdDescription)
									.HasMaxLength(30)
									.HasColumnName("fstrOrdDescription");
			});

			modelBuilder.Entity<TblidAnnexationStatusDesc>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_AnnexationStatusDesc");

				entity.Property(e => e.FstrStatusCode)
									.HasMaxLength(1)
									.HasColumnName("fstrStatusCode")
									.IsFixedLength();

				entity.Property(e => e.FstrStatusDesc)
									.HasMaxLength(20)
									.HasColumnName("fstrStatusDesc");
			});

			modelBuilder.Entity<TblidDistrict>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_District");

				entity.Property(e => e.FblnActive).HasColumnName("fblnActive");

				entity.Property(e => e.FdblLevy).HasColumnName("fdblLevy");

				entity.Property(e => e.FdtmCease)
									.HasColumnType("datetime")
									.HasColumnName("fdtmCease");

				entity.Property(e => e.FdtmCommence)
									.HasColumnType("datetime")
									.HasColumnName("fdtmCommence");

				entity.Property(e => e.FdtmWhen)
									.HasColumnType("datetime")
									.HasColumnName("fdtmWhen");

				entity.Property(e => e.FlngDistrictKey).HasColumnName("flngDistrictKey");

				entity.Property(e => e.FlngVer).HasColumnName("flngVer");

				entity.Property(e => e.FlngVerLast).HasColumnName("flngVerLast");

				entity.Property(e => e.FstrDistrict)
									.HasMaxLength(4)
									.HasColumnName("fstrDistrict");

				entity.Property(e => e.FstrDistrictName)
									.HasMaxLength(50)
									.HasColumnName("fstrDistrictName");

				entity.Property(e => e.FstrDistrictType)
									.HasMaxLength(4)
									.HasColumnName("fstrDistrictType");

				entity.Property(e => e.FstrWho)
									.HasMaxLength(10)
									.HasColumnName("fstrWho");
			});

			modelBuilder.Entity<TblidTaxCodeArea>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_TaxCodeArea");

				entity.Property(e => e.Fblnactive).HasColumnName("FBLNACTIVE");

				entity.Property(e => e.Fblncity).HasColumnName("FBLNCITY");

				entity.Property(e => e.Fdtmactionyear)
									.HasColumnType("datetime")
									.HasColumnName("FDTMACTIONYEAR");

				entity.Property(e => e.Fdtmwhen)
									.HasColumnType("datetime")
									.HasColumnName("FDTMWHEN");

				entity.Property(e => e.Flngver).HasColumnName("FLNGVER");

				entity.Property(e => e.Flngverlast).HasColumnName("FLNGVERLAST");

				entity.Property(e => e.Fstractions)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FSTRACTIONS");

				entity.Property(e => e.Fstrcounty)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FSTRCOUNTY");

				entity.Property(e => e.Fstrtaxcodearea)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FSTRTAXCODEAREA");

				entity.Property(e => e.Fstrwho)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FSTRWHO");
			});

			modelBuilder.Entity<TblidTcatoDistrict>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TBLID_TCAToDistrict");

				entity.Property(e => e.FblnActive)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fblnActive");

				entity.Property(e => e.FdtmCease)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fdtmCease");

				entity.Property(e => e.FdtmCommence)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fdtmCommence");

				entity.Property(e => e.FdtmWhen)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fdtmWhen");

				entity.Property(e => e.FlngDistrictKey)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("flngDistrictKey");

				entity.Property(e => e.FlngVer)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("flngVer");

				entity.Property(e => e.FlngVerLast)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("flngVerLast");

				entity.Property(e => e.Flngverri)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FLNGVERRI");

				entity.Property(e => e.FstrCounty)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrCounty");

				entity.Property(e => e.FstrTaxCodeArea)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrTaxCodeArea");

				entity.Property(e => e.FstrWho)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrWho");
			});

			modelBuilder.Entity<TblrCoName>(entity =>
			{
				entity.HasKey(e => e.County);

				entity.ToTable("tblrCoName");

				entity.Property(e => e.County)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.Name)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.ReAdt)
									.HasMaxLength(2)
									.IsUnicode(false);
			});

			modelBuilder.Entity<TblrCounty>(entity =>
			{
				entity.HasKey(e => new { e.County, e.Ttl });

				entity.ToTable("tblrCounty");

				entity.Property(e => e.County)
									.HasMaxLength(2)
									.IsUnicode(false);

				entity.Property(e => e.Ttl)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Addr1)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Addr2)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.City)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.CountyName)
									.HasMaxLength(15)
									.IsUnicode(false);

				entity.Property(e => e.CountyOpen)
									.HasMaxLength(1)
									.IsUnicode(false)
									.IsFixedLength();

				entity.Property(e => e.Fname)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("FName");

				entity.Property(e => e.Lname)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("LName");

				entity.Property(e => e.Par15)
									.HasMaxLength(1)
									.IsUnicode(false)
									.IsFixedLength();

				entity.Property(e => e.St)
									.HasMaxLength(50)
									.IsUnicode(false);

				entity.Property(e => e.Zip)
									.HasMaxLength(9)
									.IsUnicode(false);
			});

			modelBuilder.Entity<Tbltemptca>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("tbltemptca");

				entity.Property(e => e.CountyTca)
									.HasMaxLength(100)
									.IsUnicode(false)
									.HasColumnName("CountyTCA");

				entity.Property(e => e.FstrTaxCodeArea)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrTaxCodeArea");

				entity.Property(e => e.Fstrcounty)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("fstrcounty");
			});

			modelBuilder.Entity<TempDistCatTca>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("TempDistCatTCA");

				entity.Property(e => e.City).HasColumnName("CITY");

				entity.Property(e => e.County)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("COUNTY");

				entity.Property(e => e.Distcat)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("DISTCAT");

				entity.Property(e => e.Distnum)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("DISTNUM");

				entity.Property(e => e.Name)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("NAME");

				entity.Property(e => e.Tca)
									.HasMaxLength(50)
									.IsUnicode(false)
									.HasColumnName("TCA");

				entity.Property(e => e.Yr).HasColumnName("YR");
			});

			modelBuilder.Entity<TowersC>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("Towers_c");

				entity.Property(e => e.CallSign)
									.HasMaxLength(254)
									.HasColumnName("Call_Sign");

				entity.Property(e => e.Height).HasMaxLength(254);

				entity.Property(e => e.Name).HasMaxLength(254);

				entity.Property(e => e.Name1)
									.HasMaxLength(11)
									.HasColumnName("NAME_1");

				entity.Property(e => e.Tca)
									.HasMaxLength(7)
									.HasColumnName("TCA");

				entity.Property(e => e.Tcanum)
									.HasMaxLength(8)
									.HasColumnName("TCANUM");

				entity.Property(e => e.Type).HasMaxLength(254);
			});

			modelBuilder.Entity<TsbvTempDistCatTca>(entity =>
			{
				entity.HasNoKey();

				entity.ToView("tsbv_TempDistCatTCA");

				entity.Property(e => e.City).HasColumnName("CITY");

				entity.Property(e => e.County)
									.HasMaxLength(6)
									.HasColumnName("COUNTY");

				entity.Property(e => e.Distcat)
									.HasMaxLength(4)
									.HasColumnName("DISTCAT");

				entity.Property(e => e.Distnum)
									.HasMaxLength(4)
									.HasColumnName("DISTNUM");

				entity.Property(e => e.Name)
									.HasMaxLength(50)
									.HasColumnName("NAME");

				entity.Property(e => e.Tca)
									.HasMaxLength(10)
									.HasColumnName("TCA");

				entity.Property(e => e.Yr).HasColumnName("YR");
			});

			modelBuilder.Entity<WfbTest2>(entity =>
			{
				entity.HasNoKey();

				entity.ToTable("wfb_test2");

				entity.Property(e => e.Asdfasf)
									.HasMaxLength(10)
									.HasColumnName("asdfasf")
									.IsFixedLength();

				entity.Property(e => e.Fdfdggfd)
									.HasMaxLength(10)
									.HasColumnName("fdfdggfd")
									.IsFixedLength();
			});

			OnModelCreatingPartial(modelBuilder);
		}

		partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
	}
}
