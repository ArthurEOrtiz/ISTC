namespace Education.Models
{
	public partial class Attendance
	{
		public int AttendanceId { get; set; }
		public int StudentId { get; set; }
		public int ClassId { get; set; }
		public bool Attended { get; set; } = false;

		public virtual Student Student { get; set; } = null!;
		public virtual Class Class { get; set; } = null!;
	}
}
