--SELECT  *
--FROM dbo.Location;

--SELECT *
--FROM LocationHistory;

---- Turn off system versioning
--ALTER TABLE dbo.Location SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM Location;

---- Delete all data from the history table
--DELETE FROM LocationHistory;

---- Turn system versioning back on
--ALTER TABLE dbo.Location SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.LocationHistory));