import { User } from "@/app/shared/types/sharedTypes";
import { GetStudentAttendanceById } from "@/Utilities/api";
import React, { useEffect, useState } from "react";

interface UserEnrolledCoursesProps {
    user: User;
}

const UserEnrolledCourses: React.FC<UserEnrolledCoursesProps> = ({user}) => {
    const [ classes, setClasses ] = useState([]);
    console.log(classes);

    useEffect(() => {
        const fetchUserAttendance = async () => {
            const studentId = user?.student?.studentId;
            if (!studentId) {
                //TODO: Handle error  
                return;  
            }
            const response = await GetStudentAttendanceById(studentId);
            switch (response.status) {
                case 200:
                    setClasses(response.data);
                    
                    break;
                case 404:
                    console.log('No attendance found');
                    break;
                default:
                    break;
            }
        }
        fetchUserAttendance();
    }
    , []);

    return (
        <div className='bg-base-100 shadow-md rounded-xl p-4 w-full'>
            <h1 className='text-2xl text-center font-bold'>Enrolled Courses</h1>
        </div>
    );
}

export default UserEnrolledCourses;