--SELECT  *
--FROM Users;

--SELECT *
--FROM UsersHistory;

---- Turn off system versioning
--ALTER TABLE Users SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM Users;

---- Delete all data from the history table
--DELETE FROM UsersHistory;

---- Turn system versioning back on
--ALTER TABLE Users SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.UsersHistory));