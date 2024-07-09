SELECT *
FROM Users;

----UPDATE Users
----Set IsAdmin = 0
----WHERE UserId IN (2038, 2039);

SELECT *
FROM Contacts;

SELECT *
FROM Students

--UPDATE Students
--SET AppraisalCertified= 0
--WHERE StudentId = 2034;

--UPDATE Students
--Set AppraisalCertified = 0

SELECT *
FROM Certifications;

SELECT *
FROM Courses;

SELECT *
FROM Classes;

SELECT *
FROM Attendances;
------WHERE class_id IN (158, 159, 160, 161, 165);
------UPDATE Attendance
------SET Attended = 1
------WHERE Attendance.AttendanceId = 1024

SELECT *
FROM Locations;

------DELETE FROM Locations
------WHERE LocationId = 61;

SELECT *
FROM WaitLists;

SELECT *
FROM Exams;

------DELETE FROM Exams
------WHERE course_id = 57;

Select * 
FROM Topics;

SELECT *
FROM CourseTopic;

SELECT *
FROM WaitLists;

------DELETE FROM WaitLists
------WHERE WaitListId = 18;

----SELECT *
----FROM PDFs;

------DELETE FROM PDFs
------WHERE PDFId IN (3,4,5,6,7);




