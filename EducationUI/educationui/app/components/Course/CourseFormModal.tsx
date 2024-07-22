import { Course } from "@/app/shared/types/sharedTypes";
import CourseForm from "./CourseForm";

interface CourseFormModalProps {
    course: Course;
    isVisable: boolean;
    onSubmit: (course: Course) => void; 
    onClose: () => void;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({course, isVisable, onSubmit, onClose}) => {
    return (
        <div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isVisable ? 'block' : 'hidden'}`}></div>
            <div className={`fixed inset-0 z-50 flex justify-center items-center ${isVisable ? 'block' : 'hidden'}`}>
                <div className="bg-base-300 w-1/2 p-4 rounded-xl">
                    <div className="flex items-baseline justify-between mb-2">
                        <h1 className="text-2xl font-bold">Course Information</h1>
                        <button onClick={onClose} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                    <div>
                        <CourseForm course={course} viewOnly={true} onSubmit={(c) => onSubmit(c)} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CourseFormModal