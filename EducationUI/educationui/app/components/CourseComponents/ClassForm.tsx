'use client';
import { CourseFormData } from '@/app/shared/types/sharedTypes';

interface ClassFromProps {
    courseFormData: CourseFormData | null;
}

const ClassForm : React.FC<ClassFromProps> = ({courseFormData}) => {

    return(
        <div>
            <h1>Class Form</h1>
            <p>{courseFormData?.title}</p>
        </div>
    );
}

export default ClassForm
