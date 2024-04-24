'use client';
import React, { useEffect, useState } from 'react';
import { Course, User } from '@/app/shared/types/sharedTypes';
import CourseActionContainer from './CourseActionContainer';


interface CourseListProps {
    courses: Course[];
    user: User;
    isAdmin: boolean;   
    onError: (message: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({courses, user, isAdmin, onError}) => {
    const [courseList , setCourseList] = useState<Course[]>(courses);

    useEffect(() => {
        if (courses.length > 0) {
            setCourseList(courseList.sort(compareDates));
        }
    }, [courseList]);

    const compareDates = (a: Course, b: Course): number => {
        const dateA = new Date(a.enrollmentDeadline);
        const dateB = new Date(b.enrollmentDeadline);
        return dateA.getTime() - dateB.getTime();
    }

    return (
        <div>
            {courseList.map((course: Course, index : number) => (
                <div key={index} className="bg-base-100 rounded-xl p-4">
                    <CourseActionContainer 
                        course={course}
                        user={user} 
                        isAdmin={isAdmin}
                        onError={(m) => onError(m)}
                        handleManageAttendanceClick={(c) => {console.log(c)}}

                    />
                </div>
            ))}
        </div>
    );
}

export default CourseList
