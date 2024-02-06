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

		public List<TblSchoolCourse> GetTblSchoolCourse()
		{
			return _istcContext.TblSchoolCourses.ToList();
		}

		public List<TblSchoolEnroll> GetTblSchoolEnrolls()
		{
			return _istcContext.TblSchoolEnrolls.ToList();
		}
	}
}
