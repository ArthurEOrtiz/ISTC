using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class TransferService : TransferServiceInterface
	{
		private readonly TransferContext _transferContext;

		public TransferService(TransferContext transferContext) 
		{
			_transferContext = transferContext;
		}



		public void AddStudentsRange(IEnumerable<Student> students)
		{
			_transferContext.Students.AddRange(students);
			_transferContext.SaveChanges();
		}

		public IEnumerable<StudentInfo> CreateStudentInfoList()
		{
			foreach (Student student in _transferContext.Students)
			{

			}
		}

		public void AddStudentInfoRange (IEnumerable<StudentInfo> studentInfo)
		{
			_transferContext.StudentInfo.AddRange(studentInfo);
			_transferContext.SaveChanges();
		}

	}
}
