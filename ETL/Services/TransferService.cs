using ETL.Interfaces;
using ETL.Transfer.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace ETL.Services
{
	internal class TransferService : ITransferService
	{
		private readonly TransferContext _transferContext;

		public TransferService(TransferContext transferContext)
		{
			_transferContext = transferContext;
		}

		public List<T> LowerCaseAndTrimRecords<T>(List<T> records) where T : class
		{
			foreach (T record in records)
			{
				foreach (var property in typeof(T).GetProperties())
				{
					if (property.PropertyType == typeof(string))
					{
						var value = (string?)property.GetValue(record);
						if (value != null)
						{
							property.SetValue(record, value.ToLower().Trim());
						}
						else
						{
							property.SetValue(record, null);
						}
					}
				}
			}

			return records;
		}

		public void AddRecordsRange<T>(List<T> records, Action<int, int>? progressCallback = null) where T : class
		{

			int totalRecords = records.Count;
			int recordsProcessed = 0;

			foreach (var record in records)
			{
				_transferContext.Set<T>().Add(record);

				recordsProcessed++;
				progressCallback?.Invoke(totalRecords, recordsProcessed);
			}

			AttemptToSave();
		}

		public void DeleteAllRecords<T>(DbSet<T> dbSet) where T : class
		{
			var allRecords = dbSet.ToList();
			_transferContext.RemoveRange(allRecords);

			AttemptToSave();

			//Reset the ID count back to zero
			var tableName = _transferContext.Model.FindEntityType(typeof(T)).GetTableName();
			_transferContext.Database.ExecuteSqlRaw($"DBCC CHECKIDENT('{tableName}', RESEED, 0);");
		}

		private async Task SaveChangesAsync()
		{
			await _transferContext.SaveChangesAsync();
		}

		private void SaveChanges()
		{
			_transferContext.ChangeTracker.DetectChanges();
			Console.WriteLine(_transferContext.ChangeTracker.DebugView.ShortView);
			_transferContext.SaveChanges();
		}

		public void AttemptToSaveAsync()
		{
			try
			{
				SaveChangesAsync().Wait();
			}
			catch (AggregateException ex)
			{
				InnerAndOuterExceptionMessage(ex);

				foreach (var item in ex.InnerExceptions)
				{
					InnerAndOuterExceptionMessage(item);
				}
			}
		}

		public void AttemptToSave()
		{
			try
			{
				SaveChanges();
			}
			catch (Exception ex)
			{
				InnerAndOuterExceptionMessage(ex);
			}
		}

		private static void InnerAndOuterExceptionMessage(Exception ex)
		{
			Console.WriteLine(ex.Message);
			if (ex.InnerException != null)
			{
				Console.WriteLine(ex.InnerException.Message);
			}
		}
	}
}
