import { CourseFormData } from '@/app/shared/types/sharedTypes';
import CourseCard from './CourseCard';

interface ClassFromProps {
    courseFormData: CourseFormData | null;
    classes: JSX.Element[];
}

const ClassForm : React.FC<ClassFromProps> = ({courseFormData, classes}) => {
    

    return(
        <>
        <div className="mb-3">
            <CourseCard courseFormData={courseFormData} />
        </div>
        <div>
            {classes}
        </div>
        </>
    );
}

export default ClassForm
