using System.Net.Mail;

namespace EducationAPI.Services
{
	public class EmailServices
	{
		public async Task SendEmailAsync(string toEmail, string subject, string body)
		{
			using var mailMessage = new MailMessage();
			mailMessage.From = new MailAddress("sender@example.com");
			mailMessage.To.Add(toEmail);
			mailMessage.Subject = subject;
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;

			using var smtpClient = new SmtpClient("smtp.example.com");
			smtpClient.Port = 587; // Update port number if required
			smtpClient.Credentials = new System.Net.NetworkCredential("username", "password"); // Update username and password
			smtpClient.EnableSsl = true; // Enable SSL if required

			await smtpClient.SendMailAsync(mailMessage);
		}
	}
}
