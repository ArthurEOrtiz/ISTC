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
    ScheduleStart: string;
    ScheduleEnd: string;
  }
  
export interface Course {
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
  