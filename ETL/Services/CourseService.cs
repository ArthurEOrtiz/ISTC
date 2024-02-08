using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;
using Microsoft.EntityFrameworkCore;

namespace ETL.Services
{
	internal class CourseService : ICourseService
	{
		private readonly TransferContext _transferContext;

		public CourseService(TransferContext transferContext) 
		{
			_transferContext = transferContext;
		}

		public List<CourseInfo> tblSchoolCourseToCourseInfo(List<TblSchoolCourse> tblSchoolCourses)
		{
			List<CourseInfo> courseInfoList = new();

			foreach (var tblSchoolCourse in tblSchoolCourses)
			{
				CourseInfo courseInfo = new CourseInfo 
				{ 
					CDateSchool = tblSchoolCourse.CDateSchool,
					CSchoolType = tblSchoolCourse.CSchoolType,
					CSSeq = tblSchoolCourse.CSseq,
					CSeq = tblSchoolCourse.CSeq,
					CName = tblSchoolCourse.CName,
					CRoom = tblSchoolCourse.CRoom,
					CDesc = tblSchoolCourse.CDesc,
					CLink = tblSchoolCourse.CLink,
					CTime = tblSchoolCourse.CTime,
					Cwkday1 = tblSchoolCourse.Cwkday1,
					Cwkday2 = tblSchoolCourse.Cwkday2,
					Cwkday3 = tblSchoolCourse.Cwkday3,
					Cwkday4 = tblSchoolCourse.Cwkday4,
					Cwkday5 = tblSchoolCourse.Cwkday5,
					Cwkday6 = tblSchoolCourse.Cwkday6,
					Cwkday7 = tblSchoolCourse.Cwkday7,
					CAllow = tblSchoolCourse.CAllow,
					CFullCredit = tblSchoolCourse.CFullCredit,
					CAttendCredit = tblSchoolCourse.CAttendCredit,
					CPabclass = tblSchoolCourse.CPabclass,
					CCertType = tblSchoolCourse.CCertType,
					CMaxStudents = tblSchoolCourse.CMaxStudents,
					Cprereq = tblSchoolCourse.Cprereq,
				};

				courseInfoList.Add(courseInfo);
			}
			return courseInfoList;
		}

		public List<CourseInfo> GetAllCoursesBySchoolType(string schoolType)
		{
			if (string.IsNullOrEmpty(schoolType))
			{
				throw new ArgumentNullException(nameof(schoolType));
			}

			if (schoolType != "r" && schoolType != "s" && schoolType != "w")
			{
				throw new ArgumentException("Invalid school type, Allowed values are 'r' 's' or 'w'");
			}

			return _transferContext.CourseInfo
				.Where(record => record.CSchoolType == schoolType)
				.ToList();
		}
	}
}
