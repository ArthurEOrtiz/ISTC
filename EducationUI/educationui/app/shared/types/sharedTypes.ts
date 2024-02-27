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
    classes: ClassSchedule[];
  }
  