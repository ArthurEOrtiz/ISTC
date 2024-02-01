using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface TransferServiceInterface
	{
		void AddStudentsRange(IEnumerable<Student> students);
	}
}
