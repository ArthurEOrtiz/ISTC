namespace EducationAPI.DTO
{
  public class AttendanceDTO
  {
    public int AttendanceId { get; set; }
    public bool Attended { get; set; } = false;
    public int StudentId { get; set; }
    public int ClassId { get; set; }
  }
}
