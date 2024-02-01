using ETL.Extract.Models;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class TransferService : ITransferService
	{
		private readonly TransferContext _transferContext;

		public TransferService(TransferContext transferContext) 
		{
			_transferContext = transferContext;
		}

		public List<Student> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls)
		{
			return tblSchoolEnrolls
				.GroupBy(enroll => new
				{
					// Since there is no validation in the current system we have to make
					// sure there no spaces before or after the first and last name strings. 
					FirstName = (enroll.FirstName?.Trim() ?? "").ToLower(),
					LastName = (enroll.LastName?.Trim() ?? "").ToLower()
				})
				.Select(group => new Student
				{
					FirstName = group.Key.FirstName,
					LastName = group.Key.LastName
				})
				.ToList();
		}

		public void AddStudentsRange(IEnumerable<Student> students)
		{
			_transferContext.Students.AddRange(students);
			_transferContext.SaveChanges();
		}

		public void DeleteAllStudents()
		{
			var allStudents = _transferContext.Students.ToList();

			_transferContext.Students.RemoveRange(allStudents);
			_transferContext.SaveChanges();
		}

		public void AddStudentInfoRange (IEnumerable<StudentInfo> studentInfo)
		{
			_transferContext.StudentInfo.AddRange(studentInfo);
			_transferContext.SaveChanges();
		}

	}
}
