﻿using ETL.Extract.Models;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal interface ITransferService
	{
		/// <summary>
	  /// Creates a list of unique First and Last Names from <see cref="TblSchoolEnroll"/>
	  /// </summary>
	  /// <returns><see cref="List{T}"/> of <see cref="Student"/></returns>
		IEnumerable<Student> GetUniqueFirstAndLastName(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Adds a list of students to the students into the Students table, 
		/// by using range from Linq.
		/// </summary>
		/// <param name="students">A list of <see cref="Student"/></param
		void AddStudentsRange(IEnumerable<Student> students);

		/// <summary>
		/// Gets a list of all students in the Students table in the Transfer database.
		/// </summary>
		/// <returns>A <see cref="IEnumerable{T}"/> of <see cref="Student"/></returns>
		IEnumerable<Student> GetAllStudents();

		/// <summary>
		/// Deletes all records in the Students table from the Transfer database.
		/// </summary>
		void DeleteAllStudents();

		/// <summary>
		/// Takes a collection of <see cref="TblSchoolEnroll"/> objects, and transforms
		/// it into a a collection of <see cref="StudentInfo"/>, by use of an inner join. 
		/// </summary>
		/// <param name="tblSchoolEnrolls"><see cref="IEnumerable{T}"/> of <see cref="TblSchoolEnroll"/></param>
		/// <returns><see cref="IEnumerable{T}}"/> of <see cref="StudentInfo"/></returns>
		IEnumerable<StudentInfo> StudentToStudentInfo(IEnumerable<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Adds a list of Student Info into the StudentInfo table
		/// by using range from Linq
		/// </summary>
		/// <param name="studentInfo">A list of <see cref="StudentInfo"/></param>
		void AddStudentInfoRange(IEnumerable<StudentInfo> studentInfo, ProgressStatus progressStatus);

		/// <summary>
		/// Deletes all records in the StudentInfo table from the Transfer database. 
		/// </summary>
		void DeleteAllStudentInfo();

	}
}