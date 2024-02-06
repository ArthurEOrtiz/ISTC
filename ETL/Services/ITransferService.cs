using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface ITransferService
	{

		/// <summary>
		/// Modifies string properties of records in a list to convert them to lowercase and remove leading and trailing whitespace.
		/// </summary>
		/// <typeparam name="T">This must be a reference type <see cref="class"/> to ensure compatibility with EF Core.</typeparam>
		/// <param name="records">A <see cref="List{T}"/> that will be lowercased and trimmed.</param>
		/// <returns>A <see cref="List{T}"/> of records that are lowercased and trimmed</returns>
		List<T> LowerCaseAndTrimRecords<T>(List<T> records) where T : class;

		/// <summary>
		/// Adds a range of records of any entity type to the database using Entity Framework Core and <see cref="TransferService.SaveChangesAsync"/>.
		/// </summary>
		/// <typeparam name="T"> This must be a reference type <see cref="class"/> to ensure compatibility with EF Core.</typeparam>
		/// <param name="records">A <see cref="List{T}"/> of records of that are to be added to the database.</param>
		/// <param name="progressCallback">An optional callback function that can be used to track the progress of the operation. It takes two parameters: the total number of records being processed and the number of records processed so far. This can be used with <see cref="Utilities.ProgressLogger.RecordsProcessed(int, int)"/></param>
		public void AddRecordsRange<T>(List<T> records, Action<int, int>? progressCallback = null) where T : class;

		/// <summary>
		/// Gets a list of all students in the Students table in the Transfer database.
		/// </summary>
		List<Student> GetAllStudents();

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
		/// Creates a list of unique contact information per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="ContactInfo"/></returns>
		List<ContactInfo> GetUniqueContactInfo(List<StudentInfo> studentInfo);

		/// <summary>
		/// Creates a list of unique student history per <see cref="Student"/>.
		/// </summary>
		/// <param name="studentInfo"><see cref="List{T}"/> of <see cref="StudentInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="CourseHistory"/></returns>
		List<CourseHistory> GetUniqueCourseHistory(List<StudentInfo> studentInfo);

		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms
		/// it into a a collection of <see cref="StudentInfo"/>. 
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <returns><see cref="List{T}}"/> of <see cref="StudentInfo"/></returns>
		List<StudentInfo> StudentToStudentInfo(List<TblSchoolEnroll> tblSchoolEnrolls);

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
		
		/// <summary>
		/// Deletes all records in the ContactInfo table from the Transfer database and resets the 
		/// Id count to zero
		/// </summary>
		void DeleteAllContactInfo();

		/// <summary>
		/// Deletes all records in the CourseHistory table from the Transfer database and resets
		/// the Id count to zero
		/// </summary>
		void DeleteAllCourseHistory();

	}
}
