namespace EducationAPI.DTO
{
  public class ClassDTO
  {
    public int ClassId { get; set; }
    public int CourseId { get; set; }
    public DateTime ScheduleStart { get; set; }
    public DateTime ScheduleEnd { get; set; }
    public ICollection<AttendanceDTO> Attendances { get; set; } = [];

  }
}
