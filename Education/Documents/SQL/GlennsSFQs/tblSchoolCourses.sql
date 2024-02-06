--SELECT [ISTC].[dbo].[tblSchoolCourses].*
--FROM [ISTC].[dbo].[tblSchoolCourses];

	--SELECT
	--	tblSchoolInfo.*,
	--	tblSchoolCourses.*
	--FROM
	--	tblSchoolInfo
	--RIGHT OUTER JOIN
	--	tblSchoolCourses ON tblSchoolCourses.cDateSchool = tblSchoolInfo.SDateSchool
	--					  AND tblSchoolCourses.cSchoolType = tblSchoolInfo.SSchoolType
	--					  AND tblSchoolCourses.cSSeq = tblSchoolInfo.SSeq
	--WHERE
	--	tblSchoolInfo.SSchoolType ='r'
	--	AND tblSchoolInfo.SDateSchool = '2023-05-10'
	--	AND tblSchoolInfo.SSeq = '1';

	-- Spotted Anomoly in the 863 record. 

-- right now i'm at the point where i'm trying to link the course related columns from tblSchoolEnroll 
-- to this table 

--SELECT tblSchoolCourses.*
--FROM tblSchoolCourses
--WHERE cSchoolType = '1'
--WHERE
--	cSchoolType = 's' AND
--	cDateSchool = '2009-01-12' AND
--	cSeq IN (12,14, 22, 23)
--ORDER BY cDateSchool

--SELECT DISTINCT cSSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 's'
--ORDER BY cSSeq
-- This returns 1-27

--SELECT DISTINCT cSSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 'r'
--ORDER BY cSSeq
--- This returns 1-4

--SELECT DISTINCT cSSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 'w'
--ORDER BY cSSeq
-- This returns 1

--SELECT DISTINCT cSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 's'
--ORDER BY cSeq
-- This return 1-39, and 99

--SELECT DISTINCT cSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 'w'
--ORDER BY cSeq
-- This returns 1-35

--SELECT DISTINCT cSeq
--FROM tblSchoolCourses
--WHERE cSchoolType = 'r'
--ORDER BY cSeq
-- This return 1-3

--SELECT tblSchoolCourses.*
--FROM tblSchoolCourses
--WHERE cSchoolType = '1'
-- This has 6 rows, one of them seems to be created in error.

--SELECT DISTINCT cSchoolType
--FROM tblSchoolCourses
-- this return R, W, 1, S

SELECT tblSchoolCourses.*
FROM tblSchoolCourses 
WHERE 
	cSchoolType = 'r' AND
	cSSeq = 1 AND
	cSeq = 1
ORDER BY cSSeq, cSeq
	--cDateSchool = '2009-11-16'
	--cSSeq = 4
	