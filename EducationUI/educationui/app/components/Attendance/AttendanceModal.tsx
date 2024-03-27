import ErrorModal from "@/app/shared/modals/ErrorModal";
import { Course, Class } from "@/app/shared/types/sharedTypes";
import { GetClassesByCourseId } from "@/Utilities/api";
import { useEffect, useState } from "react";
import ClassAttendanceCard from "./ClassAttendanceCard";

interface AttendanceModalProps {
    course: Course;
    isOpen: boolean;
    onExit: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ course, isOpen, onExit }) => {
    const [classes, setClasses] = useState<Class[] | null>(null)
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isErrorModalVisible, setIsErrorModalVisible ] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await GetClassesByCourseId(course.courseId as number);

            if (response.status === 200) {
                setClasses(response.data);
            } else {
                setErrorMessage(response.data);
                setIsErrorModalVisible(true);
            }
        }
        if (isOpen){
            fetchClasses();
        }
    }
    , [isOpen]);


    const handleErrorModalClose = () => {
        setIsErrorModalVisible(false);
        onExit();
    }

    return (
        
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {isErrorModalVisible && (
                <ErrorModal 
                    title="Error" 
                    message={errorMessage} 
                    onClose={handleErrorModalClose} />
            )}

            <div className="modal-box">
                <div className="modal-top">
                    <h1 className="text-2xl font-bold">Attendance</h1>
                </div>
                <div className="modal-middle space-y-4">
                    {classes === null ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <>
                            <p>Attendance for {course.title}</p>

                            {classes.map((classItem, index) => {
                                return (
                                    <div key={index} >
                                        <ClassAttendanceCard
                                            class={classItem}
                                        />
      
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>


                <div className="modal-action">
                    <button
                        className="btn btn-error text-white"
                        onClick={onExit}
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttendanceModal;