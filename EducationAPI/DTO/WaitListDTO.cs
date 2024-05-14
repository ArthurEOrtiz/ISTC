namespace EducationAPI.DTO
{
  public class WaitListDTO
  {
    public int WaitListId { get; set; }
    public int CourseId { get; set; }
    public int UserId { get; set; }
    public DateTime DateAdded { get; set; }
    public bool ToEnroll { get; set; }
  }
}
