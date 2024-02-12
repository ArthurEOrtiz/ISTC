using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class EnrollContactService : IEnrollContactService
	{
		private readonly TransferContext _transferContext;

		public EnrollContactService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<EnrollContact> GetAllEnrollContacts()
		{
			return _transferContext.EnrollContacts.ToList();
		}

		public List<EnrollContact> GetUniqueContacts(List<EnrollInfo> enrollInfo)
		{
			return enrollInfo
				.GroupBy(e => new
				{
					e.EnrollStudentID,
					e.JobTitle,
					e.Employer,
					e.EmailAddr,
					
					e.AddrStreet,
					e.AddrSteNmbr,
					e.AddrZip,
					e.AddrCity,
					e.AddrState,
					
					e.TelAc,
					e.TelPrfx,
					e.TelNmbr,
					e.FaxAc,
					e.FaxPrfx,
					e.FaxNmbr
				})
				.Select(group => new EnrollContact
				{
					EnrollStudentID = group.Key.EnrollStudentID,
					JobTitle = group.Key.JobTitle,
					Employer = group.Key.Employer,
					EmailAddr = group.Key.EmailAddr,

					AddrStreet = group.Key.AddrStreet,
					AddrSteNmbr = group.Key.AddrSteNmbr,
					AddrState = group.Key.AddrState,
					AddrCity = group.Key.AddrCity,
					AddrZip = group.Key.AddrZip,

					TelAc = group.Key.TelAc,
					TelPrfx = group.Key.TelPrfx,
					TelNmbr = group.Key.TelNmbr,
					FaxAc = group.Key.FaxAc,
					FaxPrfx = group.Key.FaxPrfx,
					FaxNmbr = group.Key.FaxNmbr
				})
				.ToList();
		}

	}
}
