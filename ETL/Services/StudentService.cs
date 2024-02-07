using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class StudentService : IStudentService
	{
		private readonly TransferContext _transferContext;

		public StudentService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<Student> GetAllStudents()
		{
			return _transferContext.Students.ToList();
		}

		public List<StudentInfo> GetAllStudentInfo()
		{
			return _transferContext.StudentInfo.ToList();
		}

		public List<CourseHistory> GetAllCourseHistory()
		{
			return _transferContext.CourseHistory.ToList();
		}

		public List<Student> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls)
		{
			return tblSchoolEnrolls
				.GroupBy(enroll => new
				{
					enroll.FirstName,
					enroll.LastName
				})
				.Select(group => new Student
				{
					FirstName = group.Key.FirstName,
					LastName = group.Key.LastName
				})
				.ToList();
		}

		public List<ContactInfo> GetUniqueContactInfo(List<StudentInfo> studentInfo)
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
				.Select(group => new ContactInfo
				{
					StudentID = group.Key.StudentID,
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

		public List<CourseHistory> GetUniqueCourseHistory(List<StudentInfo> studentInfo)
		{
			return studentInfo
				.GroupBy(si => new
				{
					si.StudentID,
					si.DateRegistered,
					si.DateSchool,
					si.SchoolType,
					si.Seq,
					si.C01,
					si.C02,
					si.C03,
					si.C04,
					si.C05,
					si.C06,
					si.C07,
					si.C08,
					si.C09,
					si.C10,
					si.C11,
					si.C12,
					si.C13,
					si.C14,
					si.C15,
					si.C16,
					si.C17,
					si.C18,
					si.C19,
					si.C20,
					si.C21,
					si.C22,
					si.C23,
					si.C24,
					si.C25,
					si.C26,
					si.C27,
					si.C28,
					si.C29,
					si.C30,
					si.C31,
					si.C32,
					si.C33,
					si.C34,
					si.C35,
					si.C36,
					si.C37,
					si.C38,
					si.C39,
					si.C40
				})
				.Select(group => new CourseHistory
				{
					StudentID = group.Key.StudentID,
					DateRegistered = group.Key.DateRegistered,
					DateSchool = group.Key.DateSchool,
					SchoolType = group.Key.SchoolType,
					Seq = group.Key.Seq,
					C01 = group.Key.C01,
					C02 = group.Key.C02,
					C03 = group.Key.C03,
					C04 = group.Key.C04,
					C05 = group.Key.C05,
					C06 = group.Key.C06,
					C07 = group.Key.C07,
					C08 = group.Key.C08,
					C09 = group.Key.C09,
					C10 = group.Key.C10,
					C11 = group.Key.C11,
					C12 = group.Key.C12,
					C13 = group.Key.C13,
					C14 = group.Key.C14,
					C15 = group.Key.C15,
					C16 = group.Key.C16,
					C17 = group.Key.C17,
					C18 = group.Key.C18,
					C19 = group.Key.C19,
					C20 = group.Key.C20,
					C21 = group.Key.C21,
					C22 = group.Key.C22,
					C23 = group.Key.C23,
					C24 = group.Key.C24,
					C25 = group.Key.C25,
					C26 = group.Key.C26,
					C27 = group.Key.C27,
					C28 = group.Key.C28,
					C29 = group.Key.C29,
					C30 = group.Key.C30,
					C31 = group.Key.C31,
					C32 = group.Key.C32,
					C33 = group.Key.C33,
					C34 = group.Key.C34,
					C35 = group.Key.C35,
					C36 = group.Key.C36,
					C37 = group.Key.C37,
					C38 = group.Key.C38,
					C39 = group.Key.C39,
					C40 = group.Key.C40
				})
				.ToList();
		}

		public CourseHistory? GetCourseHistoryByID(int id)
		{
			return _transferContext.CourseHistory.Find(id);
		}

		public List<StudentInfo> StudentToStudentInfo(List<TblSchoolEnroll> tblSchoolEnrolls)
		{
			var students = GetAllStudents();

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

		public List<StudentHistory> CourseHistoryConverter(CourseHistory courseHistory)
		{
			List<StudentHistory> studentHistoryList = new List<StudentHistory>();

			for (int i = 0; i <=40; i++)
			{
				var cSeqProperty = typeof(CourseHistory).GetProperty($"C{i:D2}");
				if (cSeqProperty != null && cSeqProperty.GetValue(courseHistory) as bool? == true)
				{
					var studentHistory = new StudentHistory
					{
						StudentID = courseHistory.StudentID,
						DateRegistered = courseHistory.DateRegistered,
						DateSchool = courseHistory.DateSchool,
						SchoolType = courseHistory.SchoolType,
						Seq = courseHistory.Seq,
						CSeq = i,
						student = courseHistory.student
					};

					studentHistoryList.Add(studentHistory);

				}
			}
			return studentHistoryList;
		}

		public List<StudentHistory> CourseHistoryToStudentHistory(List<CourseHistory> courseHistory)
		{
			var StudentHistoryList = new List<StudentHistory>();
			foreach (var record  in courseHistory)
			{
				var outputRecords = CourseHistoryConverter(record);
				StudentHistoryList.AddRange(outputRecords);
			}
			return StudentHistoryList;
		}
	}
}
