import { Attendance, Class, User } from "@/app/shared/types/sharedTypes";
import { GetUserByStudentId } from "@/Utilities/api";
import { fail } from "assert";
import { useEffect, useState } from "react";

interface ClassAttendanceModalProps {
    class: Class;
    isOpen: boolean;
    onExit: () => void;
    onError(message: string): void;
}

const ClassAttendanceModal: React.FC<ClassAttendanceModalProps> = ({ class: incomingClass, isOpen, onExit, onError }) => {
    const [cls, setCls] = useState<Class>(incomingClass);
    const [ attendances, setAttendances ] = useState<Attendance[]>(incomingClass.attendances);
    const [ enrolledUsers, setEnrolledUsers ] = useState<User[]>([]);

    useEffect(() => {
        getEnrolledUsers();
    }
    , [isOpen]);


    const getEnrolledUsers = async () => {
 
        const responses = await Promise.all(
            attendances.map(attendance => GetUserByStudentId(attendance.studentId))
        );

        const successfulResponses = responses.filter(response => response.status === 200);
        const failedResponses = responses.filter(response => response.status !== 200);
        const users = successfulResponses.map(response => response.data);

        setEnrolledUsers(users);
        failedResponses.forEach(response => onError(response));
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
                    {enrolledUsers.map((user) => (
                        <div key={user.userId} className="flex items-center justify-between p-2 border-b">
                            <p className="text-lg">{user.firstName} {user.lastName}</p>
                            <div className="flex items-center">
                                <label htmlFor={`attendance-${user.userId}`} className="mr-2">Attended</label>
                                <input 
                                    id={`attendance-${user.userId}`}
                                    type="checkbox" 
                                    className="w-5 h-5"
                                    defaultChecked={attendances.find(attendance => attendance.studentId === user.student.studentId)?.attended}
                                    onChange={(e) => {
                                        const newAttendances = attendances.map(attendance => {
                                            if (attendance.studentId === user.student.studentId){
                                                return {
                                                    ...attendance,
                                                    attended: e.target.checked
                                                }
                                            }
                                            return attendance;
                                        });
                                        setAttendances(newAttendances);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
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