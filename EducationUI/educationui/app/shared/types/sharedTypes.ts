
export interface Location {
    locationId: number | null;
    description: string | null;
    room: string | null;
    remoteLink: string | null;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
  }
  
export interface Class {
    classId: number;
    courseId: number;
    scheduleStart: string;
    scheduleEnd: string;
    attendances: Attendance[];
  }
  
export interface Course {
    courseId: number;
    title: string;
    description: string;
    attendanceCredit: number;
    examCredit: number | null;
    hasExam: boolean; 
    maxAttendance: number;
    enrollmentDeadline: Date;
    instructorName: string;
    instructorEmail: string;
    pdf: string | null; 
    locationId: number | null;
    location: Location;
    topics: Topic[] | null;
    classes: Class[];
  }
  
  export interface Topic {
    topicId: number | null;
    title: string;
    description: string;
    courses: Course[] | null;
  }

  export interface Attendance {
    attendanceId: number;
    attended: boolean;
    studentId: number;
    classId: number;
    
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
    student : Student | null;
    contact: Contact;
  }

  export interface Student {
    studentId: number;
    userId: number;
    accumulatedCredit: number;
    appraisalCertified: boolean;
    mappingCertified: boolean;
    attendances: Attendance[];
  }

  export interface Contact {
    contactId: number | null;
    userId: number | null;
    phone: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    state: string | null;
    city: string | null;
    zip: string | null;
  }