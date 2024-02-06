using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class CourseService : ICourseService
	{
		public List<CourseInfo> tblSchoolCourseToCourseInfo(List<TblSchoolCourse> tblSchoolCourses)
		{
			List<CourseInfo> courseInfos = new List<CourseInfo>();

			foreach (var tblSchoolCourse in tblSchoolCourses)
			{
				CourseInfo courseInfo = new CourseInfo 
				{ 
					CDateSchool = tblSchoolCourse.CDateSchool,
					CSchoolType = tblSchoolCourse.CSchoolType,
					CSseq = tblSchoolCourse.CSseq,
					CSeq = tblSchoolCourse.CSseq,
					CName = tblSchoolCourse.CName,
					CRoom = tblSchoolCourse.CRoom,
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

				courseInfos.Add(courseInfo);
			}
			return courseInfos;
		}
	}
}
