using EducationAPI.Models;

namespace EducationAPI.DTO
{
  public class CourseDTO
  {
    public Course Course { get; set; } = new();
    public List<int> NewClassIds { get; set; } = [];

    // public int CourseId { get; set; }
    // public string Title { get; set; } = null!;
    // public string? Description { get; set; }
    // public int AttendanceCredit { get; set; }
    // public bool HasExam { get; set; }
    // public int? ExamCredit { get; set; }
    // public int MaxAttendance { get; set; }
    // public DateTime EnrollmentDeadline { get; set; }
    // public string? InstructorName { get; set; }
    // public string? InstructorEmail { get; set; }
    // public int? PDFId { get; set; }
    // public int LocationId { get; set; }
    // public PDFDTO? PDF { get; set; }
    // public LocationDTO Location { get; set; } = new();
    // public ICollection<Topic> Topics { get; set; } = [];
    // public ICollection<Class> Classes { get; set; } = [];
    // public ICollection<Exam> Exams { get; set; } = [];
    // public ICollection<WaitList> WaitLists { get; set; } = [];
  }
}
