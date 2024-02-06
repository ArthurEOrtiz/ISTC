-- This returns 11290 rows 
--SELECT tblSchoolEnroll. *
--FROM tblSchoolEnroll


-- This returns 3286 rows 
--SELECT DISTINCT LastName, FirstName
--FROM tblSchoolEnroll


-- From Glenn's app.

-- He called this recordset1
-- This returned 34 rows for Abegglen of classes she couldn't all have possibly attended 
-- c17, c18, c33 have a value of 1 accross all these rows. 
-- When I add an additional filter for cSeq for 17,18, and 33, I get 3 class she could have 
-- attened 

--SELECT     tblSchoolInfo.*, tblSchoolCourses.*, tblSchoolEnroll.*
--FROM         tblSchoolEnroll RIGHT OUTER JOIN
--                      tblSchoolCourses ON tblSchoolEnroll.DateSchool = tblSchoolCourses.cDateSchool AND 
--                      tblSchoolEnroll.SchoolType = tblSchoolCourses.cSchoolType AND 
--					  tblSchoolEnroll.Seq = tblSchoolCourses.cSSeq AND
--					  tblSchoolEnroll.LastName = 'Abegglen' AND 
--					  tblSchoolEnroll.FirstName = 'Diane' AND 
--            		  tblSchoolEnroll.EmailAddr = 'dabegglen@co.fremont.id.us' RIGHT OUTER JOIN
--                      tblSchoolInfo ON tblSchoolCourses.cDateSchool = tblSchoolInfo.SDateSchool AND 
--                      tblSchoolCourses.cSchoolType = tblSchoolInfo.SSchoolType AND
--					  tblSchoolCourses.cSSeq = tblSchoolInfo.SSeq 
--WHERE     (tblSchoolInfo.SSchoolType = 's') AND 
--			(tblSchoolInfo.SDateSchool = '2019-01-07') AND 
--			(tblSchoolInfo.SSeq = 1)
--			-- My doing 
--		AND (
--        -- Add condition for cSeq values 17, 18, or 33
--        tblSchoolCourses.cSeq = 17
--        OR tblSchoolCourses.cSeq = 18
--        OR tblSchoolCourses.cSeq = 33
--    )
			

-- He called this recordset2, 

--SELECT     tblSchoolEnroll.*
--FROM         tblSchoolEnroll 
--WHERE     tblSchoolEnroll.LastName = 'ABEGGLEN' AND 
--					  tblSchoolEnroll.FirstName = 'DIANE' AND 
--            		  tblSchoolEnroll.EmailAddr = 'dabegglen@co.fremont.id.us'  
--order by	tblSchoolEnroll.DateRegistered DESC


-- Apprently this is the record for everyone who has ever enrolled in the class. 
-- I'm still unclear about how we track attendence for each student. But I'll get to that later for now 
-- I'm gonna try and tame this bullshit. 

-- Start with unique Last Names 
--SELECT DISTINCT LastName 
--FROM tblSchoolEnroll
-- This is 2227 rows 

-- Lets do last and first names 
--SELECT DISTINCT LastName, FirstName
--FROM tblSchoolEnroll
-- This returns 3286 Rows 




--SELECT tblSchoolEnroll. *
--FROM tblSchoolEnroll
--WHERE SchoolType IS NULL

SELECT tblSchoolEnroll.*
FROM tblSchoolEnroll
WHERE 
	SchoolType = 'r' AND 
	Seq = 1 AND 
	c02 = 1


