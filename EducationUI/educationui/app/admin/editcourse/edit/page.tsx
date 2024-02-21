import React from 'react';
import { getAllCoursesWithClasses } from '@/Utilities/api';
import { Course } from '@/app/shared/types/sharedTypes';
import CourseList from '@/app/components/CourseComponents/CourseList';

const EditCourse: React.FC = async () => {
    const courseJson = await getAllCoursesWithClasses();
    const courses = courseJson as Course[];

    return (
        <CourseList courses={courses}/>
    );
};

export default EditCourse;
