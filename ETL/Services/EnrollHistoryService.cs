using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using ETL.Transfer.Models;

namespace ETL.Services
{
	internal class EnrollHistoryService : IEnrollHistoryService
	{
		private readonly TransferContext _transferContext;

		public EnrollHistoryService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<EnrollHistory> CourseHistoryToStudentHistory(List<CourseHistory> courseHistory)
		{
			var StudentHistoryList = new List<EnrollHistory>();
			foreach (var record in courseHistory)
			{
				var outputRecords = CourseHistoryConverter(record);
				StudentHistoryList.AddRange(outputRecords);
			}
			return StudentHistoryList;
		}

		public List<CourseHistory> GetAllCourseHistory()
		{
			return _transferContext.CourseHistory.ToList();
		}

		public CourseHistory? GetCourseHistoryByID(int id)
		{
			return _transferContext.CourseHistory.Find(id);
		}

		public List<CourseHistory> GetUniqueCourseHistory(List<EnrollInfo> studentInfo)
		{
			return studentInfo
				.GroupBy(si => new
				{
					si.EnrollStudentID,
					si.DateRegistered,
					si.DateSchool,
					si.SchoolType,
					si.Seq,
					si.C01,
					si.C02,
					si.C03,
					si.C04,
					si.C05,
					si.C06,
					si.C07,
					si.C08,
					si.C09,
					si.C10,
					si.C11,
					si.C12,
					si.C13,
					si.C14,
					si.C15,
					si.C16,
					si.C17,
					si.C18,
					si.C19,
					si.C20,
					si.C21,
					si.C22,
					si.C23,
					si.C24,
					si.C25,
					si.C26,
					si.C27,
					si.C28,
					si.C29,
					si.C30,
					si.C31,
					si.C32,
					si.C33,
					si.C34,
					si.C35,
					si.C36,
					si.C37,
					si.C38,
					si.C39,
					si.C40
				})
				.Select(group => new CourseHistory
				{
					EnrollStudentID = group.Key.EnrollStudentID,
					DateRegistered = group.Key.DateRegistered,
					DateSchool = group.Key.DateSchool,
					SchoolType = group.Key.SchoolType,
					Seq = group.Key.Seq,
					C01 = group.Key.C01,
					C02 = group.Key.C02,
					C03 = group.Key.C03,
					C04 = group.Key.C04,
					C05 = group.Key.C05,
					C06 = group.Key.C06,
					C07 = group.Key.C07,
					C08 = group.Key.C08,
					C09 = group.Key.C09,
					C10 = group.Key.C10,
					C11 = group.Key.C11,
					C12 = group.Key.C12,
					C13 = group.Key.C13,
					C14 = group.Key.C14,
					C15 = group.Key.C15,
					C16 = group.Key.C16,
					C17 = group.Key.C17,
					C18 = group.Key.C18,
					C19 = group.Key.C19,
					C20 = group.Key.C20,
					C21 = group.Key.C21,
					C22 = group.Key.C22,
					C23 = group.Key.C23,
					C24 = group.Key.C24,
					C25 = group.Key.C25,
					C26 = group.Key.C26,
					C27 = group.Key.C27,
					C28 = group.Key.C28,
					C29 = group.Key.C29,
					C30 = group.Key.C30,
					C31 = group.Key.C31,
					C32 = group.Key.C32,
					C33 = group.Key.C33,
					C34 = group.Key.C34,
					C35 = group.Key.C35,
					C36 = group.Key.C36,
					C37 = group.Key.C37,
					C38 = group.Key.C38,
					C39 = group.Key.C39,
					C40 = group.Key.C40
				})
				.ToList();
		}

		private static List<EnrollHistory> CourseHistoryConverter(CourseHistory courseHistory)
		{
			// Initialize a list of StudentHistory, we'll stuff that with converted CourseHistory. 
			List<EnrollHistory> studentHistoryList = new List<EnrollHistory>();
			// Initialize an int cSeq to have the logic below determine its value.
			// Set it to null in case column C01 - C40, have no true value.
			int? cSeq = null;

			// Iterate by 1, through a count of 1 through 40, for C01 to to C40
			for (int i = 1; i <= 40; i++)
			{
				// This obtains the Type object representing the CourseHistory class.
				var cSeqProperty = typeof(CourseHistory).GetProperty($"C{i:D2}");
				// I know that C01-C40 should never be null, but we'll check anyway. 
				if (cSeqProperty != null && cSeqProperty.GetValue(courseHistory) as bool? == true)
				{
					// If a true value is found within those columns then assign it. 
					cSeq = i;
					var studentHistory = CreateEnrollHistory(courseHistory, cSeq);
					studentHistoryList.Add(studentHistory);
				}
			}

			// If cSeq is still null no true values were found in columns C01 - C40.
			// So make a StudentHistory with a null cSeq.
			if (cSeq == null)
			{
				var studentHistory = CreateEnrollHistory(courseHistory, cSeq);
				studentHistoryList.Add(studentHistory);
			}
			return studentHistoryList;
		}

		private static EnrollHistory CreateEnrollHistory(CourseHistory courseHistory, int? cSeq)
		{
			return new EnrollHistory
			{
				EnrollStudentID = courseHistory.EnrollStudentID,
				DateRegistered = courseHistory.DateRegistered,
				DateSchool = courseHistory.DateSchool,
				SchoolType = courseHistory.SchoolType,
				Seq = courseHistory.Seq,
				CSeq = cSeq,
				EnrollStudent = courseHistory.EnrollStudent
			};
		}
	}
}
