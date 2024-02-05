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
    AddrCity,
	AddrState, 
	AddrZip, 
	TelAc, 
	TelPrfx, 
	TelNmbr, 
	FaxAc, 
	FaxPrfx, 
	FaxNmbr

FROM StudentInfo
-- This returns 5482 rows 