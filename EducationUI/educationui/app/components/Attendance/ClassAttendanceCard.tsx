import { Attendance, Class, User } from "@/app/shared/types/sharedTypes";
import { GetUserByStudentId, UpdateAttendanceById } from "@/Utilities/api";
import { useEffect, useState } from "react";

interface ClassAttendanceCardProps {
    class: Class;
    errorMessage: (message: string | null) => void;
}

const ClassAttendanceCard: React.FC<ClassAttendanceCardProps> = ({ class : cls, errorMessage}) => {
    const [ attendances, setAttendances ] = useState<Attendance[]>(cls.attendances);
    const [ users , setUsers ] = useState<User[]>([]);
    const [ saved, setSaved ] = useState<Boolean | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (attendances && attendances.length > 0){
                const promises = attendances.map(async (attendance) => {
                    const response = await GetUserByStudentId(attendance.studentId);
                    if (response.status === 200){
                        return response.data;
                    } else {
                        errorMessage(response);
                        return;
                    }
                });
                const users = await Promise.all(promises);
                setUsers(users);
            }
        };
        fetchUsers();
        
    }, [cls.attendances]);
    

   const HandleAttendanceChange = (studentId: number, attended: boolean) => {
        setSaved(false);
        const updatedAttendances = attendances.map((attendance) => {
            if (attendance.studentId === studentId){
                return {
                    ...attendance,
                    attended
                }
            }
            return attendance;
        });
        setAttendances(updatedAttendances);
    }

    const HandleSaveAttendance = () => {
        attendances.map((attendance) => {
                updateAttendance(attendance);
            }
        );
    }

   const hasUserAttended = (studentId: number): boolean => {
         const attendance = attendances.find((attendance) => attendance.studentId === studentId);
         return attendance?.attended || false;
    }

    const updateAttendance = async (attendance: Attendance) => {
        const response = await UpdateAttendanceById(attendance.attendanceId, attendance.attended);
        if (response.status === 200){
            setSaved(true);
        } else {
            errorMessage(response)
        }
    }
    
    return (
        <div className="card bg-base-200 w-full">
            <div className="card-body">
                <h2 className="card-title">{new Date(cls.scheduleStart).toLocaleDateString()}</h2>
                {users && (
                    <div className='space-y-0'>
                        {users.map((user, index) => (
                            <div key={index} className="flex">
                                <label className="label cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        className="checkbox mr-2"
                                        defaultChecked={hasUserAttended(user.student?.studentId as number)}
                                        onChange={(e) => {HandleAttendanceChange(user.student?.studentId as number, e.target.checked)}}
                                        
                                    />
                                    <p className="label-text">{user.firstName} {user.lastName} | {user.email}</p>
                                   
                                    
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                            
                <div className="card-actions justify-end">
                    {saved === true ? (
                        <p className="text-primary">Attendance Saved!</p>
                    ) : saved === false ? (
                        <p className="text-error">Unsaved Attendanced!</p>
                    ) : null}
                    <button 
                        className="btn btn-primary text-white"
                        onClick={HandleSaveAttendance}
                        >
                            Save Attendance
                    </button>

                </div>
            </div>
        </div>
    );

}

export default ClassAttendanceCard;