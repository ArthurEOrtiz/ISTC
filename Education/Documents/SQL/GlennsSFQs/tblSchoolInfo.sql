/*
	I'm gona the hunt to link a historical record of a student, who at least, 
	enrolled to class, DateSchool = 2007-10-11 SchoolType = r, Seq = 2, CSeq = null
*/


--SELECT 
--	tblSchoolInfo.* 
--FROM 
--	tblSchoolInfo
--WHERE
--	SDateSchool = '2020-09-23'
--	--AND SSchoolType = 's'
--	--AND SSeq = 2;
/*
	When I look into tblSchool info I find a row that has the course they went to. And this is 
	"Confirmed" with one of Glenn's methods. 
*/

--SELECT 
--	tblSchoolCourses.*
--FROM 
--	tblSchoolCourses 
--WHERE 
--	cDateSchool = '2020-09-23'
--	AND cSchoolType = 'r'
--	--AND cSeq = 2;

/*
	In school courses cSeq, is linked to SSeq. 
*/

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
--	tblSchoolInfo.SSchoolType ='s'
--	AND tblSchoolInfo.SDateSchool = '2005-01-03'
--    --AND tblSchoolInfo.SSeq = 1;
--	--AND tblSchoolCourses.cSeq = 1;

SELECT 
	tblSchoolCourses.*
FROM 
	tblSchoolCourses 
WHERE 
	cDateSchool = '2007-10-11';

--SELECT
--	tblSchoolCourses.*
--FROM 
--	tblSchoolCourses
--WHERE 
--	cSSeq = 10;
