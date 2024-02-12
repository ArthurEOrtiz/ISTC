using ETL.Extract.Models;
using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class EnrollStudentService : IEnrollStudentService
	{
		private readonly TransferContext _transferContext;

		public EnrollStudentService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<EnrollStudent> GetAllEnrollStudents()
		{
			return _transferContext.EnrollStudents.ToList();
		}

		public List<EnrollStudent> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls)
		{
			return tblSchoolEnrolls
				.GroupBy(enroll => new
				{
					enroll.FirstName,
					enroll.LastName
				})
				.Select(group => new EnrollStudent
				{
					FirstName = group.Key.FirstName,
					LastName = group.Key.LastName
				})
				.ToList();
		}

	}
}
