// ClassForm.tsx
import React, { useEffect } from 'react';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import CourseCard from './CourseCard';

interface ClassFormProps {
    courseFormData: CourseFormData | null;
    classes: JSX.Element[];
    onClassesChange: (isEmpty: boolean) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ courseFormData, classes, onClassesChange }) => {

    useEffect(() => {
        onClassesChange(classes.length === 0);
    }, [onClassesChange]);


    return (
        <>
            <div className="mb-3">
                <CourseCard courseFormData={courseFormData} />
            </div>
            <div>
                {classes.map((classItem, index) => (
                    <div key={index} className="mb-4">
                        {classItem}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ClassForm;
