using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollInfoService
	{
		/// <summary>
		/// Gets a list of all student information in <see cref="EnrollInfo"/> table of the Transfer database.
		/// </summary>
		List<EnrollInfo> GetAllEnrollInfo();

		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms it into a a collection 
		/// of <see cref="EnrollInfo"/> with a foreign key to the <see cref="EnrollStudent"/> Table.
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <param name="students"><see cref="List{T}"/> of <see cref="EnrollStudent"/></param>
		/// <returns><see cref="List{T}}"/> of <see cref="EnrollInfo"/></returns>
		List<EnrollInfo> tblSchoolEnrollToEnrollInfo(List<TblSchoolEnroll> tblSchoolEnrolls, List<EnrollStudent> students);
	}
}
