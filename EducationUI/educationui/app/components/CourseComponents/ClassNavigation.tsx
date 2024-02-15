'use client';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import exp from 'constants';

interface ClassNavigationProps {
    //courseFormData: CourseFormData | null;
    onBack: () => void;
}

const ClassNavigation : React.FC<ClassNavigationProps> = ({onBack}) => {
    return (
        <button onClick={onBack}>Back to Course Information</button>
    );
}

export default ClassNavigation;