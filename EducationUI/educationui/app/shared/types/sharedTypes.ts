export interface CourseFormData {
    courseId: number | null,
    title: string;
    description: string;
    instructorName: string;
    instructorEmail: string;
    attendanceCredit: number;
    completionCredit: number;
    maxAttendance: number;
    enrollmentDeadline: string;
    pdf: string;
    locationDescription: string;
    room: string;
    remoteLink: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface Location {
    locationId: number | null;
    description: string;
    room: string;
    remoteLink: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
  }
  
export interface ClassSchedule {
    classId: number | null;
    courseId: number | null;
    scheduleStart: string;
    scheduleEnd: string;
    attendance: Attendance[] | null;
  }
  
export interface Course {
    courseId: number | null;
    title: string;
    description: string;
    attendanceCredit: number;
    completionCredit: number;
    maxAttendance: number;
    enrollmentDeadline: string;
    instructorName: string;
    instructorEmail: string;
    pdf: string;
    location: Location;
    topics: Topic[] | null;
    classes: ClassSchedule[];
  }
  
  export interface Topic {
    topicId: number | null;
    title: string | null;
    description: string | null;
  }

  export interface Attendance {
    attendanceId: number | null;
    attended: boolean;
    studentId: number | null;
    classId: number | null;
    
  }

  export interface Student {
    studentId: number | null;
    firstName: string;
    lastName: string;
    middleName: string | null;
    accumulatedCredit: number;
    appraisalCertified: boolean;
    mappingCertified: boolean;
    contact: Contact;
    attendances: Attendance[] | null;
  }

  export interface Contact {
    contactId: number | null;
    email: string;
    phone: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    state: string | null;
    city: string | null;
    zip: string | null;
  }