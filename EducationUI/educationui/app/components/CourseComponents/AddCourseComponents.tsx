'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import ClassNavigation from './ClassNavigation';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        setIsCourseFormVisible(false); 
    }

    const handleBackToCourseForm = () => {
        console.log("AddCourseComponent: handleBackToCourseForm: ", courseFormData);
        setIsCourseFormVisible(true);
    }

    return (
        <>
            {isCourseFormVisible ? 
                (<CourseForm onSubmit={handleFormSubmit}/>) :
                (<>
                    <ClassNavigation onBack={handleBackToCourseForm} />
                    <ClassForm courseFormData={courseFormData} />
                </>)
            }
        </>
        
    );
}

export default AddCourseComponent