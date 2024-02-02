namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		public void RecordsProcessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed");
		}
	}
}
