using ETL.Extract.Models;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;
using ETL.Utilities;
using Microsoft.EntityFrameworkCore;

namespace ETL.Services
{
	internal class TransferService : ITransferService
	{
		private readonly TransferContext _transferContext;

		public TransferService(TransferContext transferContext) 
		{
			_transferContext = transferContext;
		}

		public void AddStudentsRange(List<Student> students)
		{
			_transferContext.Students.AddRange(students);
			SaveChangesAsync();
		}

		public void AddStudentInfoRange(List<StudentInfo> studentInfo, Action<int, int>? progressCallback)
		{
			int totalRecords = studentInfo.Count();
			int recordsProcessed = 0;

			foreach (var record in studentInfo)
			{
				_transferContext.StudentInfo.Add(record);

				recordsProcessed++;
				progressCallback?.Invoke(totalRecords, recordsProcessed);
			}

			SaveChangesAsync();
		}

		public void AddContactInfoRange(List<ContactInfo> contactInfo, Action<int, int>? progressCallback)
		{
			int totalRecords = contactInfo.Count();
			int recordsProcessed = 0;

			foreach (var record in contactInfo)
			{
				_transferContext.ContactInfo.Add(record);

				recordsProcessed++;
				progressCallback?.Invoke(totalRecords, recordsProcessed);
			}

			SaveChangesAsync();
		}

		public IEnumerable<Student> GetAllStudents()
		{
			return _transferContext.Students.ToList();
		}

		public IEnumerable<StudentInfo> GetAllStudentInfo()
		{
			return _transferContext.StudentInfo.ToList();
		}

		public List<Student> GetUniqueFirstAndLastName(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls)
		{
			return tblSchoolEnrolls
				.GroupBy(enroll => new
				{
					// Since there is no validation in the current system we have to make
					// sure there no spaces before or after the first and last name strings. 
					FirstName = enroll.FirstName.Trim().ToLower(),
					LastName = enroll.LastName.Trim().ToLower()
				})
				.Select(group => new Student
				{
					FirstName = group.Key.FirstName,
					LastName = group.Key.LastName
				})
				.ToList();
		}

		public List<ContactInfo> GetUniqueContactInfo(IEnumerable<StudentInfo> studentInfo)
		{
			return studentInfo
				.GroupBy(si => new
				{
					si.StudentID,
					si.JobTitle,
					si.Employer,
					si.EmailAddr,
					si.AddrStreet,
					si.AddrSteNmbr,
					si.AddrState,
					si.AddrZip,
					si.TelAc,
					si.TelPrfx,
					si.TelNmbr,
					si.FaxAc,
					si.FaxPrfx,
					si.FaxNmbr
				})
				.Select(group => new ContactInfo
				{
					StudentID = group.Key.StudentID,
					JobTitle = group.Key.JobTitle?.ToLower()?.Trim(),
					Employer = group.Key.Employer?.ToLower()?.Trim(),
					EmailAddr = group.Key.EmailAddr.ToLower().Trim(),
					AddrStreet = group.Key.AddrStreet?.ToLower()?.Trim(),
					AddrSteNmbr = group.Key.AddrSteNmbr?.ToLower()?.Trim(),
					AddrState = group.Key.AddrState?.ToLower()?.Trim(),
					AddrZip = group.Key.AddrZip?.ToLower()?.Trim(),
					TelAc = group.Key.TelAc?.ToLower()?.Trim(),
					TelPrfx = group.Key.TelPrfx?.ToLower()?.Trim(),
					TelNmbr = group.Key.TelNmbr?.ToLower()?.Trim(),
					FaxAc = group.Key.FaxAc?.ToLower()?.Trim(),
					FaxPrfx = group.Key.FaxPrfx?.ToLower()?.Trim(),
					FaxNmbr = group.Key.FaxNmbr?.ToLower()?.Trim()
				})
				.ToList();
		}

		public List<StudentInfo> StudentToStudentInfo(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls)
		{
			var students = GetAllStudents();

			var linkedStudents = tblSchoolEnrolls
				.Join(
					students,
					enroll => new 
					{ 
						FirstName = enroll.FirstName.Trim().ToLower(), 
						LastName = enroll.LastName.Trim().ToLower() 
					},
					student => new { 
						FirstName = student.FirstName, 
						LastName = student.LastName 
					},
					(enroll, student) => new StudentInfo
					{
						StudentID = student.StudentID,
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

		public void DeleteAllStudents()
		{
			var allStudents = _transferContext.Students.ToList();

			_transferContext.Students.RemoveRange(allStudents);
			_transferContext.SaveChanges();

			// Reset the Id count back down to zero 
			_transferContext.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Students', RESEED, 0);");
		}

		public void DeleteAllStudentInfo()
		{
			var allStudentEnroll = _transferContext.StudentInfo;

			_transferContext.StudentInfo.RemoveRange(allStudentEnroll);
			_transferContext.SaveChanges();

			// Reset the Id count back down to zero 
			_transferContext.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('StudentInfo', RESEED, 0);");
		}

		private void SaveChangesAsync()
		{
			_transferContext.SaveChangesAsync();

			ProgressLogger progressLogger = new();
			progressLogger.DisplaySavingProgress(_transferContext);
		}


	}
}
