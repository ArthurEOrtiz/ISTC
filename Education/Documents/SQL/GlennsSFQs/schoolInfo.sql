--SELECT Students.*
--FROM Students

--SELECT StudentInfo. *
--FROM StudentInfo

SELECT DISTINCT 
	student_ID,
	JobTitle, 
	Employer, 
	EmailAddr, 
	AddrStreet, 
	AddrSteNmbr, 
	AddrState, 
	AddrZip, 
	TelAc, 
	TelPrfx, 
	TelNmbr, 
	FaxAc, 
	FaxPrfx, 
	FaxNmbr

FROM StudentInfo
-- This returns 5479 rows 
-- When I did this in my App, I got 5686 records. 