using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Interfaces
{
	internal interface IEnrollContactService
	{
		List<EnrollContact> GetUniqueContacts(List<TblSchoolEnroll> tblSchoolEnroll);
	}
}
