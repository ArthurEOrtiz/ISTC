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

		public IEnumerable<TblSchoolEnroll> GetTblSchoolEnrolls()
		{
			return _istcContext.TblSchoolEnrolls.ToList();
		}
	}
}
