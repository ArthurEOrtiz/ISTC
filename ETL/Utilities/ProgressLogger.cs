using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		public void RecordsProcessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed");
		}


		// Maybe if this goes on for too long I can make exception?
		// or figure a way to report the progress of the workload it's currently going though
		public void DisplaySavingProgress(DbContext dbContext)
		{
			const int maxDots = 3;
			int dotCount = 0;
			

			Console.WriteLine(); // Go to ta new line. 

			while (dbContext.ChangeTracker.HasChanges())
			{
				Thread.Sleep(250);

				string dots = new string('.', dotCount + 1);
				int spaceCount = maxDots - dotCount;
				string spaces = new string(' ', spaceCount);
				Console.Write($"\rSaving to {dbContext.GetType().Name}{dots}{spaces}");	
				dotCount = (dotCount + 1) % maxDots;
	
			}
			Console.WriteLine($"\nSaved to {dbContext.GetType().Name}");
		}
	}
}
