import { Attendance, Class, User } from "@/app/shared/types/sharedTypes";
import { GetUserByStudentId, UpdateAttendace } from "@/Utilities/api";
import { useEffect, useState } from "react";

interface ClassAttendanceModalProps {
    class: Class;
    isOpen: boolean;
    onChanges: (Class: Class) => void;
    onExit: () => void;
    onError(message: string): void;
}

const ClassAttendanceModal: React.FC<ClassAttendanceModalProps> = ({ class: incomingClass, isOpen, onChanges, onExit, onError }) => {
    const [ cls, setCls ] = useState<Class>(incomingClass);
    const [ enrolledUsers, setEnrolledUsers ] = useState<User[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);    

    useEffect(() => {
        getEnrolledUsers();
    }
    , [isOpen]);

    useEffect(() => {
        onChanges(cls);
    }
    , [cls]);

    const handleOnSave = () => {
        // cls.attendances.forEach(attendance => {
        //     updateAttendance(attendance);
        // });
        onExit();
    }

    const getEnrolledUsers = async () => {
        setIsLoading(true);
        const responses = await Promise.all(
            cls.attendances.map(attendance => GetUserByStudentId(attendance.studentId))
        );

        const successfulResponses = responses.filter(response => response.status === 200);
        const failedResponses = responses.filter(response => response.status !== 200);
        const users = successfulResponses.map(response => response.data);

        setEnrolledUsers(users);
        failedResponses.forEach(response => onError(response));
        setIsLoading(false);
    }

    const updateAttendance = async (attendance: Attendance) => {
        const response = await UpdateAttendace(attendance);
        if (response.status !== 200) {
            onError(response);
        }
    }


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 rounded-xl p-4 z-50 space-y-4">
                <div className="modal-top">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">Class Attendance</h2>
                        <button onClick={onExit} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                </div>
                <div className="modal-middle bg-base-300 rounded-xl p-2">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        ) : (
                        <div className="overflow-y-auto w-full">    
                            <table className="table">
                                <thead>
                                    <tr className="">
                                        <th className="text-right">Student Name</th>
                                        <th className="text-right">Email</th>
                                        <th>Has Attended</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledUsers.map(user => (
                                        <tr key={user.userId}>
                                            <td className="text-right">{user.firstName} {user.lastName}</td>
                                            <td className="text-right">{user.email}</td>
                                            <td>
                                                <input 
                                                    className="checkbox"
                                                    type="checkbox" 
                                                    defaultChecked={
                                                        cls.attendances.find(attendance => attendance.studentId === user.student.studentId)?.attended 
                                                        ?? false
                                                    }
                                                    onChange={
                                                        (e) => {
                                                            const newAttendances = cls.attendances.map(attendance => {
                                                                if (attendance.studentId === user.student.studentId) {
                                                                    return {
                                                                        ...attendance,
                                                                        attended: e.target.checked
                                                                    }
                                                                }
                                                                return attendance;
                                                            });
                                                            setCls({
                                                                ...cls,
                                                                attendances: newAttendances
                                                            });
                                                        }
                                                    }/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                            
                </div>
                <div className="modal-bottom space-x-2">
                    <button 
                        className="btn bg-green-600 border-none text-white"
                        onClick={handleOnSave}
                        >
                            Save
                    </button>
                    {/* <button 
                        className="btn btn-primary text-white"
                        onClick={() => console.log('attendances', attendances)}>
                            Log Attendances
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => console.log('enrolledUsers', enrolledUsers)}>
                            Log Enrolled Users
                    </button> */}
                </div>
            </div>
        </div>  
    );
}

export default ClassAttendanceModal;