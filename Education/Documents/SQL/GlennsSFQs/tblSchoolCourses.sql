SELECT [ISTC].[dbo].[tblSchoolCourses].*
FROM [ISTC].[dbo].[tblSchoolCourses];

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