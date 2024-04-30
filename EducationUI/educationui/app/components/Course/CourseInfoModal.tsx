import { Course } from "@/app/shared/types/sharedTypes";
import CourseForm from "./CourseForm";

interface CourseInfoModalProps {
    course: Course;
    isVisable: boolean;
    onSubmit: (course: Course) => void; 
    onClose: () => void;
}

const CourseInfoModal: React.FC<CourseInfoModalProps> = ({course, isVisable, onSubmit, onClose}) => {
    return (
        <div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isVisable ? 'block' : 'hidden'}`}></div>
            <div className={`fixed inset-0 z-50 flex justify-center items-center ${isVisable ? 'block' : 'hidden'}`}>
                <div className="bg-base-300 w-1/2 p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                        <h1 className="text-2xl font-bold">Course Information</h1>
                        <button onClick={onClose} className="text-error font-bold">X</button>
                    </div>
                    <div>
                        <CourseForm course={course} onSubmit={(c) => onSubmit(c)} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CourseInfoModal