import ErrorModal from "@/app/shared/modals/ErrorModal";
import { User } from "@/app/shared/types/sharedTypes";
import { GetStudentAttendanceById } from "@/Utilities/api";
import React, { useEffect, useState } from "react";

interface UserEnrolledCoursesProps {
    user: User;
}

const UserEnrolledCourses: React.FC<UserEnrolledCoursesProps> = ({user}) => {
    const [ showErrorModal, setShowErrorModal ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
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
                    setErrorMessage('No classes found');
                    setShowErrorModal(true);
                    break;
                default:
                    break;
            }
        }
        fetchUserAttendance();
    }
    , []);

    return (
        <div>
            <div className='bg-base-100 shadow-md rounded-xl p-4 w-full'>
                <h1 className='text-2xl text-center font-bold'>Enrolled Courses</h1>
            </div>

            {showErrorModal && (
                <ErrorModal
                    title='Error'
                    message={errorMessage}
                    onClose={() => setShowErrorModal(false)}
                />
            )}                          

        </div>
        

    );
}

export default UserEnrolledCourses;