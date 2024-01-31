-- these return 36 rows
SELECT tblSchoolHistory. *
FROM tblSchoolHistory
--WHERE hNAME = 'ABEGGLEN, DIANE'
-- *******************************
--WHERE hLastName = 'ABEGGLEN' AND
--hFirstName = 'DIANE'

--This return 950 rows 
--SELECT DISTINCT hName 
--FROM tblSchoolHistory
--ORDER BY hNAME

-- this returns 977 rows
--SELECT DISTINCT hLastName, hFirstName
--FROM tblSchoolHistory
--ORDER BY hLastName

-- this returns 989 rows 
SELECT DISTINCT hLastName, hFirstName, hEmployer
FROM tblSchoolHistory
ORDER BY hLastName



/*
	Here are some of Glenn's stupid fucking queries 
	Recordset1
	When you see "county" on the admin side of the website, what he really meaned hEMPLOYER, because fuck having column names that make sense. 
	This returns 36 rows of what I think are ABEGGLEN's class history,
	The first three classes in this query matches up with a query I made for tblSchoolEnroll
	however you wouldn't be able to match it with his stupid fucking "key" of DateSchool, ShoolType or SSeq
	because in this table it's either null or has diffrent values. 
	In ANNEGGLEN's case its all pre 2009
*/

--SELECT yearx, course, hCertType, hours
--from tblSchoolhistory where hEmployer = 'RETIRED' and hlastname = 'ABEGGLEN' and hfirstname = 'DIANE'
--order by yearx desc, hCertType, course
--

-- my modification
--Select yearx, hDateSchool, course, hCertType, hours
--from tblSchoolhistory where hEmployer = 'RETIRED' and hlastname = 'ABEGGLEN' and hfirstname = 'DIANE'
--order by yearx desc

/* 
	So when I ran 
	SELECT DISTINCT hLastName, hFirstName, hEmployer
	FROM tblSchoolHistory
	ORDER BY hLastName

	I saw some duplicate records, lets test one of those out

	hLastName = 'BARDAN'
	hFirstName = 'KAYTLYNN' also hFirstName = 'KAYTLYLNN'
	hEmployer = 'WASHINTON'

*/

-- First lets try pulling her up by her last name since there is a possible duplicate record 

-- This return 16 rows with one anaomoly, the 'KAYTLYLNN' hFirstName
--SELECT tblSchoolHistory. *
--FROM tblSchoolHistory
--WHERE hLastName = 'BARDAN'

-- Now lets use one of Glenn's stupid fucking queries. 

-- This returned 15 rows
--SELECT yearx, course, hCertType, hours
--from tblSchoolhistory where hEmployer = 'WASHINGTON' and hlastname = 'BARDAN' and hfirstname = 'KAYTLYNN'
--order by yearx desc, hCertType, course

-- My modification 
--Select tblSchoolHistory. *
--FROM tblSchoolHistory
--WHERE hEMPLOYER = 'WASHINGTON' AND
--hLastName = 'BARDAN' AND
--hFirstName = 'KAYTLYNN'
--ORDER BY hDateSchool