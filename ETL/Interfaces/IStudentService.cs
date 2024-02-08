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
		/// Gets a list of all student information in StudentInfo table of the Transfer database.
		/// </summary>
		List<StudentInfo> GetAllStudentInfo();

		List<CourseHistory> GetAllCourseHistory();

		/// <summary>
		/// Creates a list of unique First and Last Names from <see cref="TblSchoolEnroll"/>
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
		List<Student> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Creates a list of unique contact information per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="ContactInfo"/></returns>
		List<ContactInfo> GetUniqueContactInfo(List<StudentInfo> studentInfo);

		/// <summary>
		/// Creates a list of unique student history per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseHistory"/></returns>
		List<CourseHistory> GetUniqueCourseHistory(List<StudentInfo> studentInfo);

		CourseHistory? GetCourseHistoryByID(int id);

		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms
		/// it into a a collection of <see cref="StudentInfo"/>. 
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <returns><see cref="List{T}}"/> of <see cref="StudentInfo"/></returns>
		List<StudentInfo> StudentToStudentInfo(List<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Converts <see cref="CourseHistory"/> records and transforms columns C01 - C40 into 
		/// a CSeq <see cref="int"/> value. For example if a row of CourseHistory has C23 set as true, 
		/// then, it will have a StudentHistory CSeq value of 23. If multiple rows between C01 and C40 
		/// are true, then each instance of a true value will have its own row in StudentHistory. 
		/// </summary>
		/// <param name="courseHistory"><see cref="List{T}"/> of <see cref="CourseHistory"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="StudentHistory"/></returns>
		List<StudentHistory> CourseHistoryToStudentHistory(List<CourseHistory> courseHistory);
	}
}
