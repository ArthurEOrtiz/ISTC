using ETL.Transfer.Models;
using ETL.Extract.Models;

namespace ETL.Services
{
	internal interface IExtractServices
	{
		/// <summary>
		/// Return all rows from tblSchoolEnroll in ISTC.
		/// </summary>
		/// <returns> A <see cref="IEnumerable{T}"/> of <see cref="TblSchoolEnroll"/></returns>
		IEnumerable<TblSchoolEnroll> GetTblSchoolEnrolls();
	}
}
