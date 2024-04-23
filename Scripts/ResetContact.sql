--SELECT  *
--FROM Contact;

--SELECT *
--FROM ContactHistory;

---- Turn off system versioning
--ALTER TABLE Contact SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM Contact;

---- Delete all data from the history table
--DELETE FROM ContactHistory;

---- Turn system versioning back on
--ALTER TABLE Contact SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ContactHistory));