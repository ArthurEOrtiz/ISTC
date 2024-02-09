using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollHistoryService
	{
		/// <summary>
		/// Creates a list of unique student history per <see cref="EnrollStudent"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseHistory"/></returns>
		List<CourseHistory> GetUniqueCourseHistory(List<EnrollInfo> enrollInfo);

		List<CourseHistory> GetAllCourseHistory();

		CourseHistory? GetCourseHistoryByID(int id);

		List<EnrollHistory> CourseHistoryToStudentHistory(List<CourseHistory> courseHistory);
	}
}
