using Microsoft.EntityFrameworkCore;

namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		public void RecordsProcessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed");
		}

		public void DisplaySavingProgress(DbContext dbContext)
		{
			const int maxDots = 3;
			int dotCount = 0;


			Console.WriteLine(); // Go to to a new line. 

			while (dbContext.ChangeTracker.HasChanges())
			{
				Thread.Sleep(250);

				string dots = new string('.', dotCount + 1);
				int spaceCount = maxDots - dotCount;
				string spaces = new string(' ', spaceCount);
				Console.Write($"\rSaving to {dbContext.GetType().Name}{dots}{spaces}");
				dotCount = (dotCount + 1) % maxDots;

			}
			Console.WriteLine($"Saved to {dbContext.GetType().Name}");
		}
	}
}
