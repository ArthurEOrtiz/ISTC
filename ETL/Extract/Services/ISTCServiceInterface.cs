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
		List<TblSchoolHistory> GetFirstFiveRecords();
	}
}
