'use client';
import React, { useEffect, useState } from 'react';
import { Course, User } from '@/app/shared/types/sharedTypes';
import CourseActionContainer from './CourseActionContainer';


interface CourseListProps {
    courses: Course[] | null;
    user: User | null;
    isAdmin: boolean;   
    onError: (message: string) => void;
    sendEmail: (to: User, subject: string, body: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({courses, user, isAdmin, onError, sendEmail}) => {
    const [courseList , setCourseList] = useState<Course[] | null>(null);

    useEffect(() => {
        if (courses) {
            setCourseList(courses.sort(compareDates));
        }

    }, [courses]);

    const compareDates = (a: Course, b: Course): number => {
        const dateA = new Date(a.enrollmentDeadline);
        const dateB = new Date(b.enrollmentDeadline);
        return dateA.getTime() - dateB.getTime();
    }

    return (
        <div className='space-y-2'>
            {courseList != null ? 
                (
                    courseList.map((course: Course, index : number) => (
                        <div key={index}>
                            <CourseActionContainer 
                                course={course}
                                user={user} 
                                isAdmin={isAdmin}
                                onError={(m) => onError(m)}
                                sendEmail={(to: User, subject: string, body: string) => sendEmail(to, subject, body)}
                            />
                        </div>
                    ))
                ) : (
                    <p className='text-center text-error'>No courses available!</p>
                )}
        </div>
    );
}

export default CourseList
