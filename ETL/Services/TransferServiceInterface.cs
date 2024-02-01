using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface TransferServiceInterface
	{
		/// <summary>
		/// Adds a list of students to the students into the Students Table, 
		/// by using range from Linq.
		/// </summary>
		/// <param name="students">A list of <see cref="Student"/></param
		void AddStudentsRange(IEnumerable<Student> students);

		/// <summary>
		/// Adds a list of Student Info into the StudentInfo Table
		/// by using range from Linq
		/// </summary>
		/// <param name="studentInfo">A list of <see cref="StudentInfo"/></param>
		void AddStudentInfoRange(IEnumerable<StudentInfo> studentInfo);

	}
}
