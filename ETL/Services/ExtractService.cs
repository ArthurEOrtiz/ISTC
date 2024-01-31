using ETL.Extract.DataAccess;
using ETL.Extract.Models;
using ETL.Transfer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
				.Select(student => new Student { 
					LastName = student.LastName,
					FirstName = student.FirstName })
				.Distinct()
				.ToList();
		}
	}
}
