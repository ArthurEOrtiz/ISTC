using ETL.Extract.Models;

namespace ETL.Services
{
	internal interface IExtractServices
	{
		/// <summary>
		/// Return all rows from tblSchoolEnroll in the ISTC database. 
		/// </summary>
		/// <returns> A <see cref="List{T}"/> of <see cref="TblSchoolEnroll"/></returns>
		List<TblSchoolEnroll> GetTblSchoolEnrolls();

		/// <summary>
		/// Return all rows from tblSchoolCourse in the ISTC database
		/// </summary>
		/// <returns>A <see cref="List{T}"/> of <see cref="TblSchoolCourse"/></returns>
		List<TblSchoolCourse> GetTblSchoolCourse();
	}
}
