'use client';
import CourseForm from '@/app/components/courseform'
import React from 'react'
import { FormData } from '@/app/shared/types/sharedTypes';

const AddCourse: React.FC = () => {
    
    const handleFormSubmit = (formData: FormData) =>{
        console.log(formData);
    } 

    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Add Course</h1>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <CourseForm onSubmit={handleFormSubmit} />
                </div>
            </div>
        </main>
    )
}

export default AddCourse
