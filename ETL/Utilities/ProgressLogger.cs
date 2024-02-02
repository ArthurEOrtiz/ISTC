namespace ETL.Utilities
{
	internal class ProgressLogger
	{
		public void RecordsProccessed(int recordsProcessed, int totalRecords)
		{
			Console.Write($"\r{recordsProcessed} of {totalRecords} processed");
		}
	}
}
