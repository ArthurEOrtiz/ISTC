using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollContactService
	{
		/// <summary>
		/// Gets all records from the EnrollContacts table in the Transfer Database.
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollContact"/></returns>
		List<EnrollContact> GetAllEnrollContacts();

		/// <summary>
		/// Creates a list of unique contact information.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollContact"/></returns>
		List<EnrollContact> GetUniqueContacts(List<EnrollInfo> enrollInfo);
	}
}
