using ETL.Extract.Models;

namespace ETL.Interfaces
{
    internal interface IExtractService
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
