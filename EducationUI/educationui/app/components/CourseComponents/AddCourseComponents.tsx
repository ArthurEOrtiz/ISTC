'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';

const AddCourseComponent: React.FC = () => {
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null);

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        console.log(courseFormData);
    }
    return (
        <>
        {courseFormData === null ? 
        (<CourseForm onSubmit={handleFormSubmit} />) :
        (<ClassForm courseFormData = {courseFormData} />)}
        </>
        
    );
}

export default AddCourseComponent