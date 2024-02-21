'use client';
import React from 'react';
import { Course } from '@/app/shared/types/sharedTypes';
import CourseCard from './EditCourseCard';
import { useRouter } from 'next/navigation';

interface CourseListProps {
    courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({courses}) => {
    const router = useRouter();

    function handleOnEdit(course: Course): void {
        router.push(`/admin/editcourse/course/${course.courseId}`);
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {courses.map((course, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">
                       <CourseCard course={course} onEdit={handleOnEdit} />
                </div>
            ))}
        </div>
    );
}

export default CourseList
