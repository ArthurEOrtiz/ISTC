using ETL.Extract.DataAccess;
using ETL.Extract.Models;

namespace ETL.Services
{
    internal class ISTCService : ISTCServiceInterface
    {
        private readonly ISTCContext _istcContext;

        public ISTCService(ISTCContext istcContext)
        {
            _istcContext = istcContext;
        }


        public List<TblSchoolHistory> GetFirstFiveRecords()
        {
            return _istcContext.TblSchoolHistories.Take(5).ToList();
        }
    }
}
