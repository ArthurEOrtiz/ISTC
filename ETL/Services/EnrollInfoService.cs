using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class EnrollInfoService : IEnrollInfoService
	{
		private readonly TransferContext _transferContext;

		public EnrollInfoService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<EnrollInfo> GetAllEnrollInfo()
		{
			return _transferContext.EnrollInfo.ToList();
		}

		public List<EnrollContact> GetUniqueContactInfo(List<EnrollInfo> studentInfo)
		{
			return studentInfo
				.GroupBy(si => new
				{
					si.EnrollStudentID,
					si.JobTitle,
					si.Employer,
					si.EmailAddr,
					si.AddrStreet,
					si.AddrSteNmbr,
					si.AddrCity,
					si.AddrState,
					si.AddrZip,
					si.TelAc,
					si.TelPrfx,
					si.TelNmbr,
					si.FaxAc,
					si.FaxPrfx,
					si.FaxNmbr
				})
				.Select(group => new EnrollContact
				{
					EnrollStudentID = group.Key.EnrollStudentID,
					JobTitle = group.Key.JobTitle,
					Employer = group.Key.Employer,
					EmailAddr = group.Key.EmailAddr,
					AddrStreet = group.Key.AddrStreet,
					AddrSteNmbr = group.Key.AddrSteNmbr,
					AddrCity = group.Key.AddrCity,
					AddrState = group.Key.AddrState,
					AddrZip = group.Key.AddrZip,
					TelAc = group.Key.TelAc,
					TelPrfx = group.Key.TelPrfx,
					TelNmbr = group.Key.TelNmbr,
					FaxAc = group.Key.FaxAc,
					FaxPrfx = group.Key.FaxPrfx,
					FaxNmbr = group.Key.FaxNmbr
				})
				.ToList();
		}

		public List<EnrollInfo> tblSchoolEnrollToEnrollInfo(List<TblSchoolEnroll> tblSchoolEnrolls, List<EnrollStudent> students)
		{

			var linkedStudents = tblSchoolEnrolls
				.Join(
					students,
					enroll => new
					{
						FirstName = enroll.FirstName,
						LastName = enroll.LastName
					},
					student => new
					{
						FirstName = student.FirstName,
						LastName = student.LastName
					},
					(enroll, student) => new EnrollInfo
					{
						EnrollStudentID = student.EnrollStudentID,
						JobTitle = enroll?.JobTitle,
						Employer = enroll?.Employer,
						EmailAddr = enroll.EmailAddr,
						AddrStreet = enroll?.AddrStreet,
						AddrSteNmbr = enroll?.AddrSteNmbr,
						AddrCity = enroll?.AddrCity,
						AddrState = enroll?.AddrState,
						AddrZip = enroll?.AddrZip,
						TelAc = enroll?.TelAc,
						TelPrfx = enroll?.TelPrfx,
						TelNmbr = enroll?.TelNmbr,
						FaxAc = enroll?.FaxAc,
						FaxPrfx = enroll?.FaxPrfx,
						FaxNmbr = enroll?.FaxNmbr,
						DateRegistered = enroll?.DateRegistered,
						DateSchool = enroll.DateSchool,
						SchoolType = enroll.SchoolType,
						Seq = enroll.Seq,
						C01 = enroll?.C01, // GLENN
						C02 = enroll?.C02, // DID
						C03 = enroll?.C03, // IT
						C04 = enroll?.C04, // FOR
						C05 = enroll?.C05, // THE 
						C06 = enroll?.C06, // NULLS
						C07 = enroll?.C07,
						C08 = enroll?.C08,
						C09 = enroll?.C09,
						C10 = enroll?.C10,
						C11 = enroll?.C11,
						C12 = enroll?.C12,
						C13 = enroll?.C13,
						C14 = enroll?.C14,
						C15 = enroll?.C15,
						C16 = enroll?.C16,
						C17 = enroll?.C17,
						C18 = enroll?.C18,
						C19 = enroll?.C19,
						C20 = enroll?.C20,
						C21 = enroll?.C21,
						C22 = enroll?.C22,
						C23 = enroll?.C23,
						C24 = enroll?.C24,
						C25 = enroll?.C25,
						C26 = enroll?.C26,
						C27 = enroll?.C27,
						C28 = enroll?.C28,
						C29 = enroll?.C29,
						C30 = enroll?.C30,
						C31 = enroll?.C31,
						C32 = enroll?.C32,
						C33 = enroll?.C33,
						C34 = enroll?.C34,
						C35 = enroll?.C35,
						C36 = enroll?.C36,
						C37 = enroll?.C37,
						C38 = enroll?.C38,
						C39 = enroll?.C39,
						C40 = enroll?.C40
					})
			.ToList();

			return linkedStudents;
		}
	}
}
