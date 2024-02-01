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

		/// <summary>
		/// Counts the number of unique first and last names in tblSchoolEnroll
		/// </summary>
		/// <returns><see cref="int"/></returns>
		public int CountUniqueFirstAndLastNames()
		{
			return _istcContext.TblSchoolEnrolls
			.Select(student => new { LastName = student.LastName, FirstName = student.FirstName })
			.Distinct()
			.Count();
		}

		/// <summary>
		/// Creates a list of unique First and Last Names
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
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
