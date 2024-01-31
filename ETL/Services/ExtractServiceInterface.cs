using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface ExtractServiceInterface
	{
		List<Student> GetUniqueFistAndLastNames();
		int CountUniqueFirstAndLastNames();

	}
}
