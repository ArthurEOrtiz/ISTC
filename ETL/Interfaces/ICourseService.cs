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

		/// <summary>
		/// Return a <see cref="List{T}"/> of <see cref="CourseInfo"/> school type, which 
		/// is either "r" for regional, "w" for winter, or "s" for summer. 
		/// </summary>
		/// <param name="schoolType"><see cref="string"/> of a single character "r", "w", or "s"</param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseInfo"/></returns>
		/// <exception cref="ArgumentNullException"> If <paramref name="schoolType"/> is null</exception>
		/// <exception cref="ArgumentException"> Invalid <paramref name="schoolType"/></exception>
		List<CourseInfo> GetAllCoursesBySchoolType(string schoolType);
	}
}
