using EducationAPI.DataAccess;
using EducationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace EducationAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class TopicController
	{
		private readonly EducationProgramContext _educationProgramContext;
		private readonly ILogger<TopicController> _logger;

		public TopicController(EducationProgramContext educationProgramContext, ILogger<TopicController> logger)
		{
			_educationProgramContext = educationProgramContext;
			_logger = logger;
		}

		[HttpGet("GetTopicById")]
		public async Task<ActionResult<Topic>> GetTopicById(int id)
		{
			try
			{
				var topic = await _educationProgramContext.Topics
					.FirstOrDefaultAsync(t => t.TopicId == id);

				if (topic == null)
				{
					_logger.LogError("GetTopicById{Id}, Record not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				return topic;

			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetTopicById({Id})", id);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpPost("PostTopic")]
		public async Task<ActionResult> PostTopic (Topic topic)
		{
			try
			{
				_educationProgramContext.Topics.Add(topic);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("PostTopic{Topic} Called", topic);
				return new CreatedAtActionResult(nameof(GetTopicById), "Topic", new { id = topic.TopicId }, topic);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "PostTopic{Topic}", topic);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}


		[HttpPost("AddTopicToCourse")]
		public async Task<ActionResult> AddTopicToCourse(int topicId, int courseId)
		{
			try
			{
				var topic = await _educationProgramContext.Topics.FindAsync(topicId);
				var course = await _educationProgramContext.Courses.FindAsync(courseId);

				if (topic == null || course == null)
				{
					_logger.LogError("AddTopicToCourse({TopicId}, {CourseId})", topicId, courseId);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				course.Topics.Add(topic);
				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("Topic with ID {TopicId} added to Course with ID {CourseId}", topicId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.OK);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "AddTopicToCourse({TopicId}, {CourseId})", topicId, courseId);
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}
	}
}
