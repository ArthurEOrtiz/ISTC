--SELECT  *
--FROM Classes;

--SELECT *
--FROM ClassesHistory;

---- Turn off system versioning
--ALTER TABLE Classes SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM Classes;

---- Delete all data from the history table
--DELETE FROM dbo.ClassesHistory;

---- Turn system versioning back on
--ALTER TABLE Classes SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ClassesHistory));