namespace EducationAPI.DTO
{
  public class ExamDTO
  {
    public int ExamId { get; set; }
    public int CourseId { get; set; }
    public int StudentId { get; set; }
    public bool HasPassed { get; set; } = false;
  }
}
