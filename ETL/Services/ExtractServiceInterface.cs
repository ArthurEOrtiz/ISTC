using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface ExtractServiceInterface
	{
		/// <summary>
		/// Creates a list of unique First and Last Names
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
		List<Student> GetUniqueFistAndLastNames();

		/// <summary>
		/// Counts the number of unique first and last names in tblSchoolEnroll
		/// </summary>
		/// <returns><see cref="int"/></returns>
		int CountUniqueFirstAndLastNames();

	}
}
