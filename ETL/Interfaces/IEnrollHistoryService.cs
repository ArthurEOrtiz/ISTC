using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollHistoryService
	{
		/// <summary>
		/// Returns all records of <see cref="EnrollHistory"/>
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollHistory"/></returns>
		List<EnrollHistory> GetEnrollHistory();

		/// <summary>
		/// Converts course identifying columns into a collection of <see cref="EnrollHistory"/>, converting 
		/// columns C01-C40 into cSeq number. 
		/// </summary>
		/// <param name="enrollInfo"><see cref="List{T}"/> of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollInfo"/></returns>
		List<EnrollHistory> EnrollInfoToEnrollHistory(List<EnrollInfo> enrollInfo);

	}
}
