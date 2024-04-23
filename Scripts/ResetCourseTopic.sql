--SELECT  *
--FROM CourseTopic;

--SELECT *
--FROM CourseTopicHistory;

---- Turn off system versioning
--ALTER TABLE CourseTopic SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM CourseTopic;

---- Delete all data from the history table
--DELETE FROM CourseTopicHistory;

---- Turn system versioning back on
--ALTER TABLE CourseTopic SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.CourseTopicHistory));