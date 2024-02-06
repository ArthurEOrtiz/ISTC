using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface ICourseService
	{
		/// <summary>
		/// Converts a <see cref="List{T}"/> of <see cref="TblSchoolCourse"/> to a <see cref="List{T}"/> of <see cref="CourseInfo"/>
		/// </summary>
		/// <param name="tblSchoolCourses"><see cref="List{T}"/> of <see cref="TblSchoolCourse"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseInfo"/></returns>
		List<CourseInfo> tblSchoolCourseToCourseInfo(List<TblSchoolCourse> tblSchoolCourses);
	}
}
