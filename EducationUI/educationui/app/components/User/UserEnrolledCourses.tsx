import ErrorModal from "@/app/shared/modals/ErrorModal";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { GetUserEnrolledCoursesById } from "@/Utilities/api";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/EditCourseCard";

interface UserEnrolledCoursesProps {
    user: User;
}

const UserEnrolledCourses: React.FC<UserEnrolledCoursesProps> = ({user}) => {
    const [ showErrorModal, setShowErrorModal ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ courses, setCourses ] = useState<Course[]>([]);

    useEffect(() => {
        const fetchUserAttendance = async () => {
            const studentId = user?.student?.studentId;
            if (!studentId) {
                //TODO: Handle error  
                return;  
            }
            const response = await GetUserEnrolledCoursesById(studentId);
            switch (response.status) {
                case 200:
                    // Sort the courses by enrollmentDeadline
                    const sortedCourses = response.data.sort((a: Course, b: Course) => {
                        return new Date(a.enrollmentDeadline).getTime() - new Date(b.enrollmentDeadline).getTime();
                    });
                    const reversedCourses = sortedCourses.reverse();
                    setCourses(reversedCourses);
                    break;
                case 404:
                    setErrorMessage('There was an error finding courses for this user.');
                    setShowErrorModal(true);
                    break;
                default:
                    break;
            }
        }
        fetchUserAttendance();
    }
    , [courses]);

    return (
        <div className='bg-base-100 shadow-md rounded-xl p-4 w-full'>
            <div >
                <h1 className='text-2xl text-center font-bold mb-2'>Enrolled Courses</h1>
            </div>

            <div className='space-y-4'>
                {courses.length > 0 ? (
                    courses.map((course: Course, index) => (
                        <div
                            key={index}
                            className='card w-full bg-base-300 shadow-xl'
                        >
                            <CourseCard
                                course={course}
                                viewOnly={true}
                                clerkId={user.clerkId!}
                            />
                        </div> 
                    ))
                ) : (
                    <div className='card w-full bg-base-100 shadow-xl'>
                        <p className='text-center p-4'>No courses found.</p>
                    </div>
                )}

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