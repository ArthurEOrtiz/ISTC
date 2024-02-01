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
		List<Student> GetUniqueFirstAndLastName(List<TblSchoolEnroll> tblSchoolEnrolls);

		/// <summary>
		/// Adds a list of students to the students into the Students table, 
		/// by using range from Linq.
		/// </summary>
		/// <param name="students">A list of <see cref="Student"/></param
		void AddStudentsRange(IEnumerable<Student> students);

		/// <summary>
		/// Deletes all records in the Students table from the Transfer Database.
		/// </summary>
		void DeleteAllStudents();

		/// <summary>
		/// Adds a list of Student Info into the StudentInfo table
		/// by using range from Linq
		/// </summary>
		/// <param name="studentInfo">A list of <see cref="StudentInfo"/></param>
		void AddStudentInfoRange(IEnumerable<StudentInfo> studentInfo);

	}
}
