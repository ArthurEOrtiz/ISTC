namespace Education.Models
{
	public partial class Class
	{
		public Class() 
		{ 
			Attendances = new HashSet<Attendance>();
		}
		public int ClassId { get; set; }
		public int CourseId { get; set; }
		public DateTime? Date { get; set; }
		public TimeSpan? StartTime { get; set; }
		public TimeSpan? EndTime { get; set; }

		public virtual Course? Course { get; set; }
		public virtual ICollection<Attendance>? Attendances { get; set; }
	}
}
