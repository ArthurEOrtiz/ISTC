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

		public async Task DisplayProgressAsync(DbContext dbContext, CancellationToken cancellationToken)
		{
			int dotCount = 0;

			while (!cancellationToken.IsCancellationRequested)
			{
				// Update UI with saving progress
				string dots = new string('.', dotCount + 1);
				int spaceCount = MaxDots - dotCount;
				string spaces = new string(' ', spaceCount);
				Console.Write($"\rSaving to {dbContext.GetType().Name}{dots}{spaces}");

				dotCount = (dotCount + 1) % MaxDots;

				// Wait for a short duration before updating progress
				await Task.Delay(250, cancellationToken);
			}

		}

		public void DisplayProgressComplete(DbContext dbContext)
		{
			string rightMargin = new string(' ', MaxDots + 1);
			Console.Write($"\rSaved to {dbContext.GetType().Name}!{rightMargin}\n");
		}
	}
}
