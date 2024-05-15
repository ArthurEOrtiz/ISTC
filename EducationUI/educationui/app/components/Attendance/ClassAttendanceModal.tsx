import { Attendance, Class, User } from "@/app/shared/types/sharedTypes";
import { GetUserByStudentId } from "@/Utilities/api";
import { useEffect, useState } from "react";

interface ClassAttendanceModalProps {
    attendances: Attendance[];
    isOpen: boolean;
    onExit: () => void;
    onError(message: string): void;
}

const ClassAttendanceModal: React.FC<ClassAttendanceModalProps> = ({ attendances: incomingAttendances, isOpen, onExit, onError }) => {
    const [ attendances, setAttendances ] = useState<Attendance[]>(incomingAttendances);
    const [ enrolledUsers, setEnrolledUsers ] = useState<User[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);    

    useEffect(() => {
        getEnrolledUsers();
    }
    , [isOpen]);


    const getEnrolledUsers = async () => {
        setIsLoading(true);
        const responses = await Promise.all(
            attendances.map(attendance => GetUserByStudentId(attendance.studentId))
        );

        const successfulResponses = responses.filter(response => response.status === 200);
        const failedResponses = responses.filter(response => response.status !== 200);
        const users = successfulResponses.map(response => response.data);

        setEnrolledUsers(users);
        failedResponses.forEach(response => onError(response));
        setIsLoading(false);
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="modal-box space-y-2">
                <div className="modal-top">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">Class Attendance</h2>
                        <button onClick={onExit} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                </div>
                <div className="modal-middle">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        ) : (
                        <div className="space-y-2">
                            {enrolledUsers.map(user => (
                                <div key={user.userId} className="flex justify-between items-center">
                                    <p>{user.firstName} {user.lastName}</p>
                                    <input type="checkbox" />
                                </div>
                            ))}
                        </div>
                    )}
                            
                </div>
                <div className="modal-bottom space-x-2">
                    <button 
                        className="btn bg-green-600 border-none text-white">
                            Save
                    </button>
                    <button 
                        className="btn btn-primary text-white"
                        onClick={() => console.log('attendances', attendances)}>
                            Log Attendances
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => console.log('enrolledUsers', enrolledUsers)}>
                            Log Enrolled Users
                    </button>
                </div>
            </div>
        </div>  
    );
}

export default ClassAttendanceModal;