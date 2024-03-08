using EducationAPI.DataAccess;
using EducationAPI.DTO;
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

		[HttpGet("GetAllTopics")]
		public async Task<ActionResult<List<Topic>>> GetAllTopics()
		{
			try
			{
				_logger.LogInformation("GetAllTopics() Called");
				return await _educationProgramContext.Topics
					.Include(t => t.Courses)
					.ToListAsync();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "GetAllTopics()");
				return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
			}
		}

		[HttpGet("GetTopicById")]
		public async Task<ActionResult<Topic>> GetTopicById(int id)
		{
			try
			{
				var topic = await _educationProgramContext.Topics
					.Include (t => t.Courses)
					.FirstOrDefaultAsync(t => t.TopicId == id);

				if (topic == null)
				{
					_logger.LogError("GetTopicById({Id}), Record not found!", id);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_logger.LogInformation("GetTopicBy({Id}) Called", id);
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

		[HttpPut("UpdateTopicById/{id}")]
		public async Task<ActionResult<Topic>> UpdateTopicById(int id, TopicDTO updatedTopic)
		{
			try
			{
				var existingTopic = await _educationProgramContext.Topics
					.Include(t => t.Courses)
					.FirstOrDefaultAsync(t => t.TopicId == id);

				if (existingTopic == null)
				{
					_logger.LogError("UpdateTopicById({Id}, {UpdatedTopic}), Topic not found!", id, updatedTopic);
					return new StatusCodeResult((int)HttpStatusCode.NotFound);
				}

				_educationProgramContext.Entry(existingTopic).CurrentValues.SetValues(updatedTopic);

				if (updatedTopic.Courses != null)
				{
					foreach (var existingCourse in existingTopic.Courses.ToList())
					{
						// Check if the course exists in the updated list
						var updatedCourse = updatedTopic.Courses.FirstOrDefault(c => c.CourseId == existingCourse.CourseId);
						if (updatedCourse == null)
						{
							// If the course doesn't exist in the updated list, remove it
							existingTopic.Courses.Remove(existingCourse);
						}
					}

					foreach (var course in updatedTopic.Courses)
					{
						// Check if the course already exists in the topic's courses
						if (!existingTopic.Courses.Any(c => c.CourseId == course.CourseId))
						{
							var existingCourse = await _educationProgramContext.Courses
									.FirstOrDefaultAsync(c => c.CourseId == course.CourseId);

							if (existingCourse != null)
							{
								existingTopic.Courses.Add(existingCourse);
							}
						}
					}
				}

				await _educationProgramContext.SaveChangesAsync();

				_logger.LogInformation("UpdateTopicById({Id}. {UpdatedTopic}) called", id, updatedTopic);
				return existingTopic;

			} catch (Exception ex)
			{
				_logger.LogError(ex, "UpdateTopicById({Id}. {UpdatedTopic})", id, updatedTopic);
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
