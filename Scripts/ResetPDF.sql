--SELECT  *
--FROM PDFs;

--SELECT *
--FROM PDFsHistory;

---- Turn off system versioning
--ALTER TABLE PDFs SET (SYSTEM_VERSIONING = OFF);

---- Delete all data from the main table
--DELETE FROM PDFs;

---- Delete all data from the history table
--DELETE FROM PDFsHistory;

-- Turn system versioning back on
ALTER TABLE PDFs SET (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.PDFsHistory));