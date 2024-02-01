using ETL.Transfer.Models;
using ETL.Extract.Models;

namespace ETL.Services
{
	internal interface IExtractServices
	{
		/// <summary>
		/// Counts the number of unique first and last names in <see cref="TblSchoolEnroll"/>
		/// </summary>
		/// <returns><see cref="int"/></returns>
		int CountUniqueFirstAndLastNames();

		/// <summary>
		/// Return all rows from tblSchoolEnroll in ISTC.
		/// </summary>
		/// <returns> A <see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></returns>
		List<TblSchoolEnroll> GetTblSchoolEnrolls();


	}
}
