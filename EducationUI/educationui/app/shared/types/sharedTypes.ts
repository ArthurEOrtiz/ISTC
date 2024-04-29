export interface Attendance {
  attendanceId: number;
  attended: boolean;
  studentId: number;
  classId: number;
}

export interface Class {
  classId: number;
  courseId: number;
  scheduleStart: string;
  scheduleEnd: string;
  attendances: Attendance[];
}

export interface Contact {
  contactId: number;
  userId: number;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
}

export interface Course {
  courseId: number;
  title: string;
  description: string | null;
  attendanceCredit: number;
  hasExam: boolean;
  examCredit: number | null;
  maxAttendance: number;
  enrollmentDeadline: Date;
  instructorName: string | null;
  instructorEmail: string | null;
  pdf: string | null; 
  locationId: number;
  location: Location;
  topics: Topic[];
  classes: Class[];
  exams: Exam[];
  waitLists: WaitList[];
}

export interface Exam {
  examId: number;
  courseId: number;
  userId: number;
  HasPassed: boolean;
}

export interface Location {
  locationId: number;
  description: string | null;
  room: string | null;
  remoteLink: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
}

export interface Student {
  studentId: number;
  userId: number;
  accumulatedCredit: number;
  appraisalCertified: boolean;
  mappingCertified: boolean;
  attendances: Attendance[];
}

export interface Topic {
  topicId: number;
  title: string;
  description: string | null;
  courses: Course[];
}

export interface User {
  userId: number;
  clerkId: string | null;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  employer: string;
  jobTitle: string; 
  isAdmin: boolean;
  isStudent: boolean;
  student : Student;
  contact: Contact;
}

export interface WaitList {
  waitListId: number;
  courseId: number;
  userId: number;
  dateAdded: Date;
  toEnroll: boolean;  
}
  






  

