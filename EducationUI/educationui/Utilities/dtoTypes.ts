import { Course, User } from './sharedTypes'; // Replace './path/to/Course' with the actual path to the 'Course' type file.

export interface UserCourseDTO {
    user: User;
    courses: Course[];
}

export interface EmployerUserDTO {
    employer: string;
    users: UserCourseDTO[];
}

