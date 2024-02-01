using ETL.Extract.DataAccess;
using ETL.Extract.Models;

namespace ETL.Services
{
	internal class ExtractService : IExtractServices
	{
		private readonly ISTCContext _istcContext;

		public ExtractService(ISTCContext istcContext)
		{
			_istcContext = istcContext;
		}

		public int CountUniqueFirstAndLastNames()
		{
			return _istcContext.TblSchoolEnrolls
			.Select(student => new { student.LastName, student.FirstName })
			.Distinct()
			.Count();
		}

		public IEnumerable<TblSchoolEnroll> GetTblSchoolEnrolls()
		{
			return _istcContext.TblSchoolEnrolls.ToList();
		}
	}
}
