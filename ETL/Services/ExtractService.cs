using ETL.Extract.DataAccess;
using ETL.Extract.Models;
using ETL.Interfaces;

namespace ETL.Services
{
	internal class ExtractService : IExtractService
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
