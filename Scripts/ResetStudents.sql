--SELECT  *
--FROM Students;

--SELECT *
--FROM StudentsHistory;

-- Turn off system versioning
--ALTER TABLE Students SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM Students;

---- Delete all data from the history table
--DELETE FROM StudentsHistory;

------ Turn system versioning back on
--ALTER TABLE Students SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.StudentsHistory));