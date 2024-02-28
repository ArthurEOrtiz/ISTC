'use client';
import { Course } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewCourseForm from './NewCourseForm';
import CourseInfoCard from './CourseInfoCard';

const AddCourseComponent: React.FC = () => {    
    const [course, setCourse] = useState<Course>();

    const handleNewCourseFormOnSubmit = (course: Course) => {
        console.log("AddCourseComponent.handleNewCourseFormOnSubmit: course: ", course);
        setCourse(course);
    }

    return (
        <>
            {course === undefined ? (
                <NewCourseForm onSubmit={handleNewCourseFormOnSubmit}/>
            ) : (
                <CourseInfoCard course={course} />
            )}
        </>
    );
}

export default AddCourseComponent;
