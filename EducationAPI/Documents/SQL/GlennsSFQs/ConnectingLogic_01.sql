/*
	So here i'm gonna walk through glenn's querries step by step to see how they work. 

	First the user looks up courses like so 
*/

    --SELECT tblSchoolInfo.*
    --FROM tblSchoolInfo
    --WHERE SDateSchool > DATEADD(day, -30, GETDATE())
    --ORDER BY SDateSchool;
/*
	I can see, above that SCity is the names he later uses in tblSchoolHistory. 

	Now below is what happens with he combines those rows into tblSchoolCourses, for which i seen
	can change the SSeq Cseq numbers.
*/

 --   SELECT
	--	tblSchoolInfo.*,
	--	tblSchoolCourses.*
	--FROM
	--	tblSchoolInfo
	--RIGHT OUTER JOIN
	--	tblSchoolCourses ON tblSchoolCourses.cDateSchool = tblSchoolInfo.SDateSchool
	--					  AND tblSchoolCourses.cSchoolType = tblSchoolInfo.SSchoolType
	--					  AND tblSchoolCourses.cSSeq = tblSchoolInfo.SSeq
	--WHERE
	--	tblSchoolInfo.SSchoolType ='w'
	--	AND tblSchoolInfo.SDateSchool = '2020-01-06'
	--	AND tblSchoolInfo.SSeq = '1';

/*
	I'm gonna modify this a little to see if I cant get a list of blended 
	
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
