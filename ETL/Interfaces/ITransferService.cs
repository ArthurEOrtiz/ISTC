using ETL.Services;
using Microsoft.EntityFrameworkCore;

namespace ETL.Interfaces
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
		///  Deletes all records from the specified DbSet and resets the identity seed to zero for the corresponding table in the database. This utilizes <see cref="TransferService.SaveChangesAsync()"/>
		/// </summary>
		/// <typeparam name="T">The type of entity in the DbSet.</typeparam>
		/// <param name="dbSet">The DbSet from which records will be deleted.</param>
		public void DeleteAllRecords<T>(DbSet<T> dbSet) where T : class;

	}
}
