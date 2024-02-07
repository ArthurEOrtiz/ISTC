using Microsoft.EntityFrameworkCore;

namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		private const int MaxDots = 3;

		public void RecordsProcessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed!");
		}

		public void DisplaySavingProgress(DbContext dbContext)
		{

			Console.WriteLine(); // Go to to a new line. 
			int dotCount = 0;

			while (dbContext.ChangeTracker.HasChanges())
			{
				Thread.Sleep(250);

				string dots = new string('.', dotCount + 1);
				int spaceCount = MaxDots - dotCount;
				string spaces = new string(' ', spaceCount);
				Console.Write($"\rSaving to {dbContext.GetType().Name}{dots}{spaces}");
				dotCount = (dotCount + 1) % MaxDots;

			}
		}

		public void DisplaySaveComplete(DbContext dbContext)
		{
			string rightMargin = new string(' ', MaxDots + 1);
			Console.Write($"\rSaved to {dbContext.GetType().Name}!{rightMargin}\n");
		}
	}
}
