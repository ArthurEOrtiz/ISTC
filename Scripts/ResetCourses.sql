--SELECT  *
--FROM Attendance;

--SELECT *
--FROM AttendanceHistory;

-- Turn off system versioning
-- ALTER TABLE Attendance SET (SYSTEM_VERSIONING = OFF);

-- Delete all data from the main table
-- DELETE FROM Attendance;

-- Delete all data from the history table
-- DELETE FROM dbo.AttendanceHistory;

---- Turn system versioning back on
ALTER TABLE Attendance SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.AttendanceHistory));