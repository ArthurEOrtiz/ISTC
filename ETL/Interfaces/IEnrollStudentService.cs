using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollStudentService
	{
		/// <summary>
		/// Gets a list of all students in the <see cref="EnrollStudent"/> table in the Transfer database.
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollStudent"/></returns>
		List<EnrollStudent> GetAllEnrollStudents();

		/// <summary>
		/// Creates a list of unique First and Last Names from <see cref="TblSchoolEnroll"/>
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollStudent"/></returns>
		List<EnrollStudent> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls);

	}
}
