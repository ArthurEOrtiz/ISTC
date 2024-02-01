using ETL.Extract.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class ExtractService : ExtractServiceInterface
	{
		private readonly ISTCContext _istcContext;

		public ExtractService(ISTCContext istcContext)
		{
			_istcContext = istcContext;
		}

		public int CountUniqueFirstAndLastNames()
		{
			return _istcContext.TblSchoolEnrolls
			.Select(student => new { LastName = student.LastName, FirstName = student.FirstName })
			.Distinct()
			.Count();
		}

		public List<Student> GetUniqueFistAndLastNames()
		{
			return _istcContext.TblSchoolEnrolls
				.Select(student => new Student
				{
					LastName = student.LastName,
					FirstName = student.FirstName
				})
				.Distinct()
				.ToList();
		}
	}
}
