SELECT 
	StudentHistory.*
FROM 
	StudentHistory 
--WHERE CSeq IS NULL
--	AND SchoolType = 's'
--ORDER BY 
--	DateSchool
--ORDER BY student_ID, DateSchool

/* 

	My working understanding at the moment is that if CSeq is null, then the Seq value is CSeq,
	so far this only works for SchoolType = r. 

*/
--SELECT 
--	CourseHistory.*
--FROM 
--	CourseHistory
--WHERE 
--	DateSchool = '2009-01-12'
--	AND student_ID = 99