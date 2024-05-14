namespace EducationAPI.DTO
{
  public class PDFDTO
  {
    public int PDFId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public byte[] Data { get; set; } = [];
  }
}
