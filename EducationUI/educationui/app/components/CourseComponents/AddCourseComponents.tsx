'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import ClassNavigation from './ClassNavigation';
import NewClass from './NewClass';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);
    const [classes, setClasses] = useState<JSX.Element[]>([]);

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        setIsCourseFormVisible(false); 
    }

    const handleBackToCourseForm = () => {
        console.log("AddCourseComponent: handleBackToCourseForm: ", courseFormData);
        setIsCourseFormVisible(true);
    }

    const addClass = () => {
        const newClass = <NewClass key={classes.length}/>;
        setClasses(previousClasses => [...previousClasses, newClass]);
    };

    return (
        <>
            {isCourseFormVisible ? 
                (<CourseForm onSubmit={handleFormSubmit}/>) :
                (<>
                    <ClassNavigation onBack={handleBackToCourseForm} onAddClass={addClass} />
                    <ClassForm courseFormData={courseFormData} classes={classes} />
                </>)
            }
        </>
        
    );
}

export default AddCourseComponent