using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface ITransferService
	{

		List<T> LowerCaseAndTrimRecords<T>(List<T> records) where T : class;
		/// <summary>
		/// Adds a list of students to the students into the Students table, 
		/// by using range from Linq.
		/// </summary>
		/// <param name="students">A list of <see cref="Student"/></param
		void AddStudentsRange(List<Student> students);

		/// <summary>
		/// Adds a list of student information to the StudentInfo table in the Transfer database
		/// This utilizes <see cref="TransferService.SaveChangesAsync"/>
		/// </summary>
		/// <param name="studentInfo">A <see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <param name="progressCallback"> An optional callback function that is invoked to 
		/// report the addition process. The callback takes two parameters: the number of 
		/// records processed, and the total number of records as <see cref="int"/> and is used with <see cref="Utilities.ProgressLogger.RecordsProcessed(int, int)"/></param>
		void AddStudentInfoRange(List<StudentInfo> studentInfo, Action<int, int>? progressCallback = null);

		/// <summary>
		/// Adds a list of contact information to the ContactInfo table in the Transfer database.
		/// This utilizes <see cref="TransferService.SaveChangesAsync"/> 
		/// </summary>
		/// <param name="contactInfo">A <see cref="List{T}"/> of <see cref="ContactInfo"/></param>
		/// <param name="progressCallback">An optional callback function that is invoked to 
		/// report the addition process. The callback takes two parameters: the number of 
		/// records processed, and the total number of records as <see cref="int"/> and is used with <see cref="Utilities.ProgressLogger.RecordsProcessed(int, int)"/></param>
		void AddContactInfoRange(List<ContactInfo> contactInfo, Action<int, int>? progressCallback = null);

		/// <summary>
		/// Add a list of course information into the CourseInfo table in the Transfer database
		/// </summary>
		/// <param name="courseInfo">A <see cref="List{T}"/> of <see cref="CourseInfo"/></param>
		/// <param name="progressCallback">An optional callback function that is invoked to 
		/// report the addition process. The callback takes two parameters: the number of 
		/// records to processed, and the total number of records as <see cref="int"/> and is use with 
		/// <see cref="Utilities.ProgressLogger.RecordsProcessed(int, int)"/></param>
		void AddCourseInfoRange(List<CourseInfo> courseInfo, Action<int, int>? progressCallback = null);

		/// <summary>
		/// Gets a list of all students in the Students table in the Transfer database.
		/// </summary>
		IEnumerable<Student> GetAllStudents();

		/// <summary>
		/// Gets a list of all student information in StudentInfo table of the Transfer database.
		/// </summary>
		List<StudentInfo> GetAllStudentInfo();

		/// <summary>
		/// Creates a list of unique First and Last Names from <see cref="TblSchoolEnroll"/>
		/// </summary>
		/// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
		List<Student> GetUniqueFirstAndLastName(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Creates a list of unique contact information.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="ContactInfo"/></returns>
		List<ContactInfo> GetUniqueContactInfo(List<StudentInfo> studentInfo);

		List<CourseInfo> GetUniqueCourseInfo(List<StudentInfo> studentInfo);


		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms
		/// it into a a collection of <see cref="StudentInfo"/>. 
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="IEnumerable{T}{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <returns><see cref="List{T}}"/> of <see cref="StudentInfo"/></returns>
		List<StudentInfo> StudentToStudentInfo(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Deletes all records in the Students table from the Transfer database, and
		/// resets the Id count to zero
		/// </summary>
		void DeleteAllStudents();

		/// <summary>
		/// Deletes all records in the StudentInfo table from the Transfer database and reset the
		/// Id count to zero. 
		/// </summary>
		void DeleteAllStudentInfo();

	}
}
