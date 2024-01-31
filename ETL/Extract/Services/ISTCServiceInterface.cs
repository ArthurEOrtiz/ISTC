using ETL.Extract.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETL.Extract.Services
{
	internal interface ISTCServiceInterface
	{
		/// <summary>
		/// This is a quick test I made to check if everything is hooked up okay.
		/// If you're not me, and you need a simple example of using Interfaces,
		/// and Direct Injection, feel free to use this method. 
		/// </summary>
		/// <returns>
		///	 A <see cref="List{T}"/> of the first five records in <see cref="TblSchoolHistory"/>
		/// </returns>
		List<TblSchoolHistory> GetFirstFiveRecords();
	}
}
