import React from 'react';
import { getAllCourses } from '@/Utilities/api';
import { Course } from '@/app/shared/types/sharedTypes';
import CourseList from '@/app/components/CourseComponents/CourseList';

const CoursesPage: React.FC = async () => {
    const courseJson = await getAllCourses();
    const courses = courseJson as Course[];

    return (
        <CourseList courses={courses}/>
    );
};

export default CoursesPage;
