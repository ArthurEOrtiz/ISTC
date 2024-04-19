--SELECT  *
--FROM Topics;

--SELECT *
--FROM TopicsHistory;

-- Turn off system versioning
ALTER TABLE Topics SET (SYSTEM_VERSIONING = OFF);

-- Delete all data from the main table
DELETE FROM Topics;

-- Delete all data from the history table
DELETE FROM TopicsHistory;

---- Turn system versioning back on
--ALTER TABLE Topics SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.TopicsHistory));