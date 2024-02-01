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

		/// <summary>
		/// Adds a list of students to the students into the Students Table, 
		/// by using range from Linq.
		/// </summary>
		/// <param name="students">A list of <see cref="Student"/></param>
		public void AddStudentsRange(IEnumerable<Student> students)
		{
			_transferContext.Students.AddRange(students);
			_transferContext.SaveChanges();
		}

		/// <summary>
		/// Adds a list of Student Info into the StudentInfo Table
		/// by using range from Linq
		/// </summary>
		/// <param name="studentInfo"></param>
		public void AddStudentInfoRang (IEnumerable<StudentInfo> studentInfo)
		{
			_transferContext.StudentInfo.AddRange(studentInfo);
			_transferContext.SaveChanges();
		}


	}
}
