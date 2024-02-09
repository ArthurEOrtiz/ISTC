using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IStudentService
	{
		/// <summary>
		/// Gets a list of all students in the Students table in the Transfer database.
		/// </summary>
		List<Student> GetAllStudents();

		/// <summary>
		/// Gets a list of all student information in <see cref="EnrollInfo"/> table of the Transfer database.
		/// </summary>
		List<EnrollInfo> GetAllEnrollInfo();

		List<CourseHistory> GetAllCourseHistory();

		/// <summary>
		/// Creates a list of unique First and Last Names from <see cref="TblSchoolEnroll"/>
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
		List<Student> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Creates a list of unique contact information per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="ContactInfo"/></returns>
		List<ContactInfo> GetUniqueContactInfo(List<EnrollInfo> studentInfo);

		/// <summary>
		/// Creates a list of unique student history per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseHistory"/></returns>
		List<CourseHistory> GetUniqueCourseHistory(List<EnrollInfo> studentInfo);

		CourseHistory? GetCourseHistoryByID(int id);

		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms
		/// it into a a collection of <see cref="EnrollInfo"/>. 
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <returns><see cref="List{T}}"/> of <see cref="EnrollInfo"/></returns>
		List<EnrollInfo> StudentToEnrollInfo(List<TblSchoolEnroll> tblSchoolEnrolls);

		List<StudentHistory> CourseHistoryToStudentHistory(List<CourseHistory> courseHistory);
	}
}
