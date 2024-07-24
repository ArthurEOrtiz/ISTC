import ErrorModal from "@/components/modals/ErrorModal";
import { Course, Class } from "@/Utilities/sharedTypes";
import { GetClassesByCourseId } from "@/Utilities/api";
import { useEffect, useState } from "react";
import ClassAttendanceCard from "./ClassAttendanceCard";

interface AttendanceModalProps {
    course: Course;
    isOpen: boolean;
    onExit: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ course, isOpen, onExit }) => {
    const [ classes, setClasses ] = useState<Class[] | null>(null)
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

    const handleClassAttendaceCardError = (message: string | null) => {
        if (message !== null){
            setErrorMessage(message);
            setIsErrorModalVisible(true);
        }
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
                <div className="modal-top flex justify-between items-baseline mb-2">
                    <h1 className="text-2xl font-bold">Attendance</h1>
                    <button onClick={onExit} className="text-3xl text-error font-bold">&times;</button>
                </div>
                <div className="modal-middle space-y-4">
                    {classes === null ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <p>Attendance for {course.title}</p>

                            {classes.map((classItem, index) => {
                                return (
                                    <div key={index} >
                                        <ClassAttendanceCard
                                            errorMessage={(message: string | null) => handleClassAttendaceCardError(message)}
                                            class={classItem}
                                        />
      
                                    </div>
                                );
                                }
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AttendanceModal;