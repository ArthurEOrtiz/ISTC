'use client';
import CourseForm from '@/app/components/CourseComponents/CourseForm'
import { FormData } from '@/app/shared/types/sharedTypes';

const AddCourseComponent: React.FC = () => {
    const handleFormSubmit = (formData: FormData) =>{
        console.log(formData);
    }
    return (
        <CourseForm onSubmit={handleFormSubmit} />
    );
}

export default AddCourseComponent