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

		public List<EnrollHistory> GetEnrollHistory()
		{
			return _transferContext.EnrollHistory.ToList();
		}

		public List<EnrollHistory> EnrollInfoToEnrollHistory(List<EnrollInfo> enrollInfo)
		{
			List<EnrollHistory> enrollHistoryList = new();
			foreach (var record in enrollInfo)
			{
				var enrollHistory = EnrollHistoryConverter(record);
				enrollHistoryList.AddRange(enrollHistory);
			}
			return enrollHistoryList;
		}

		/// <summary>
		/// Converts each true of instance of true in columns C01-C04 in <see cref="EnrollInfo"/> into 
		/// separate instance of <see cref="EnrollHistory"/>.
		/// </summary>
		/// <param name="enrollInfo">A single instance of <see cref="EnrollInfo"/></param>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollHistory"/></returns>
		private static List<EnrollHistory> EnrollHistoryConverter(EnrollInfo enrollInfo)
		{
			List<EnrollHistory> enrollHistoryList = new();

			int? cSeq = null;

			for (int i = 1; i <= 40; i++)
			{
				var cSeqProperty = typeof(EnrollInfo).GetProperty($"C{i:D2}");

				if (cSeqProperty != null && cSeqProperty.GetValue(enrollInfo) as bool? == true)
				{
					cSeq = i;
					var enrollHistory = CreateEnrollHistoryWithCSeq(enrollInfo, cSeq);
					enrollHistoryList.Add(enrollHistory);
				}
			}

			if (cSeq == null)
			{
				var enrollHistory = CreateEnrollHistoryWithCSeq(enrollInfo, cSeq);
				enrollHistoryList.Add(enrollHistory);
			}

			return enrollHistoryList;
		}

		/// <summary>
		/// Create a single instance of <see cref="EnrollHistory"/> with a specified cSeq <see cref="int"/>
		/// value, and a single instance of <see cref="EnrollHistory"/>.
		/// </summary>
		/// <param name="enrollInfo">A single instance of <see cref="EnrollInfo"/></param>
		/// <param name="cSeq"><see cref="int"/> value for cSeq</param>
		/// <returns><see cref="List{T}"/> of <see cref="EnrollHistory"/></returns>
		private static EnrollHistory CreateEnrollHistoryWithCSeq(EnrollInfo enrollInfo, int? cSeq)
		{
			return new EnrollHistory
			{
				EnrollStudentID = enrollInfo.EnrollStudentID,
				DateRegistered = enrollInfo.DateRegistered,
				DateSchool = enrollInfo.DateSchool,
				SchoolType = enrollInfo.SchoolType,
				Seq = enrollInfo.Seq,
				CSeq = cSeq,
				EnrollStudent = enrollInfo.EnrollStudent
			};
		}

	}
}
