export interface Attendance {
  attendanceId: number;
  attended: boolean;
  studentId: number;
  classId: number;
}

export type CertificationType = 'Appraiser' | 'Mapping';

export interface Certification {
  certificationId: number;
  certificationType: CertificationType;
  requestDate: Date; 
  approvalDate: Date | null; 
  isApproved: boolean; 
  approvedBy: number | null;  
}

export interface Class {
  classId: number;
  courseId: number;
  scheduleStart: Date;
  scheduleEnd: Date;
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

export type CourseStatus = 'Upcoming' | 'InProgress' | 'Archived';

export interface Course {
  courseId: number;
  status: CourseStatus;
  title: string;
  description: string | null;
  attendanceCredit: number | string;
  hasExam: boolean;
  examCredit: number | string | null;
  maxAttendance: number | string;
  enrollmentDeadline: Date;
  instructorName: string | null;
  instructorEmail: string | null;
  pdfId: number | null;
  locationId: number;
  location: Location;
  pdf: PDF | null;
  topics: Topic[];
  classes: Class[];
  exams: Exam[];
  waitLists: WaitList[];
}

export interface Exam {
  examId: number;
  courseId: number;
  studentId: number;
  hasPassed: boolean;
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

export interface PDF {
  pdfId: number;
  courseId: number;
  fileName: string;
  data: string;
}

export interface Student {
  studentId: number;
  userId: number;
  accumulatedCredit: number;
  appraisalCertified: boolean;
  mappingCertified: boolean;
  attendances: Attendance[];
  exams: Exam[];
  certifications: Certification[];
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
  






  

