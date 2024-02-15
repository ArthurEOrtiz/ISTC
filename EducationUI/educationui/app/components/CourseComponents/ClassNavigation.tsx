'use client';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import exp from 'constants';

interface ClassNavigationProps {
    //courseFormData: CourseFormData | null;
    onBack: () => void;
}

const ClassNavigation : React.FC<ClassNavigationProps> = ({onBack}) => {
    return (
        <button
        className = "btn btn-primary text-white mt-3 mb-3" 
        onClick={onBack}>Back to Course Information</button>
    );
}

export default ClassNavigation;