-- These are notes on Glen's stupid queries to his aweful database

/*
	i-1111.cfm
		this is the query to get all the courses for the year 

		SELECT tblSchoolInfo.*
		FROM tblSchoolInfo
		WHERE SDateSchool > DATEADD(day, -30, GETDATE())
		ORDER BY SDateSchool;

*/
/*
	i-1088.cfm
		This is how the page get records for one or many courses. 
		So far as I can tell school type s and w will return a list a 
		classes belonging to the paranet SCity(title of class or classes) value. 

*/
	SELECT
		tblSchoolInfo.*,
		tblSchoolCourses.*
	FROM
		tblSchoolInfo
	RIGHT OUTER JOIN
		tblSchoolCourses ON tblSchoolCourses.cDateSchool = tblSchoolInfo.SDateSchool
						  AND tblSchoolCourses.cSchoolType = tblSchoolInfo.SSchoolType
						  AND tblSchoolCourses.cSSeq = tblSchoolInfo.SSeq
	--WHERE
	--	tblSchoolInfo.SSchoolType ='s'
	--	AND tblSchoolInfo.SDateSchool = '2006-01-09'
	--	AND tblSchoolInfo.SSeq = '1';
	





