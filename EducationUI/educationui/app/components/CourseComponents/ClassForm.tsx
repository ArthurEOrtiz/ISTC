'use client';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import CourseCard from './CourseCard';

interface ClassFromProps {
    courseFormData: CourseFormData | null;
}

const ClassForm : React.FC<ClassFromProps> = ({courseFormData}) => {

    return(
        <>
        <CourseCard courseFormData={courseFormData} />
        </>
    );
}

export default ClassForm
