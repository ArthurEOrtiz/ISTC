public class ProgressStatus
{
	private int totalCount;
	private int lastProgress;

	public ProgressStatus(int totalCount)
	{
		this.totalCount = totalCount;
		this.lastProgress = -1;
	}

	public void UpdateProgress(int progress)
	{
		if (progress != lastProgress)
		{
			Console.Write($"\rProgress: {progress}%");
			lastProgress = progress;
		}

		if (progress == 100)
		{
			Console.WriteLine(); // Move to the next line after completion
		}
	}
}
