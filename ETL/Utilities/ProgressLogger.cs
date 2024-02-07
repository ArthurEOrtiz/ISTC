using Microsoft.EntityFrameworkCore;

namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		private const int MaxDots = 3;
		//private bool isSaving = true;

		public void RecordsProcessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed!");
		}



		public async Task DisplayProgressAsync(DbContext dbContext, CancellationToken cancellationToken)
		{
			int dotCount = 0;

			try
			{
				while(!cancellationToken.IsCancellationRequested)
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
			catch(OperationCanceledException ex)
			{
				string rightMargin = new string(' ', MaxDots + 1);
				Console.Write($"\rSaved to {dbContext.GetType().Name}!{rightMargin}\n");
				// This will be thrown when cancellationToken.IsCancellationRequested is true.
				Console.WriteLine(ex.Message);
			}
		}
		public void DisplaySavingProgress(DbContext dbContext)
		{

			dbContext.SavingChanges += (s, e) =>
			{
				Console.WriteLine("saving changes");
			};

			dbContext.SavedChanges += (s, e) =>
			{
				DisplaySaveComplete(dbContext);
			};

			dbContext.SaveChangesFailed += (s, e) =>
			{
				Console.WriteLine("failed to save changes.");
			};

			
		}
		public void DisplaySaveComplete(DbContext dbContext)
		{
			string rightMargin = new string(' ', MaxDots + 1);
			Console.Write($"\rSaved to {dbContext.GetType().Name}!{rightMargin}\n");
		}

		//Console.WriteLine(); // Go to to a new line. 
		//int dotCount = 0;

		//while (//someloopingCondition)
		//{
		//	Thread.Sleep(250);

		//	string dots = new string('.', dotCount + 1);
		//int spaceCount = MaxDots - dotCount;
		//string spaces = new string(' ', spaceCount);
		//Console.Write($"\rSaving to {dbContext.GetType().Name}{dots}{spaces}");
		//	dotCount = (dotCount + 1) % MaxDots;

		//}
}
}
