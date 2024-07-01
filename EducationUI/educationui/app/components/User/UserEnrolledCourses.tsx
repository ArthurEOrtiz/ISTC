import ErrorModal from "@/app/shared/modals/ErrorModal";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { GetUserEnrolledCoursesById } from "@/Utilities/api";
import React, { useEffect, useState } from "react";
import CourseInfoCard from "../Course/CourseInfoCard";
import Link from "next/link";


interface UserEnrolledCoursesProps {
    user: User;
}

const UserEnrolledCourses: React.FC<UserEnrolledCoursesProps> = ({user}) => {
    const [ showErrorModal, setShowErrorModal ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ courses, setCourses ] = useState<Course[]>([]);

    useEffect(() => {
        const fetchUserAttendance = async () => {
            
            const response = await GetUserEnrolledCoursesById(user.userId);
            
            if (response.status !== 200){
                setErrorMessage(`There was an error finding courses for this user. ${response}`);
                setShowErrorModal(true);
            } else {
                // Sort the courses by enrollmentDeadline
                const sortedCourses = response.data.sort((a: Course, b: Course) => {
                    return new Date(a.enrollmentDeadline).getTime() - new Date(b.enrollmentDeadline).getTime();
                });
                const reversedCourses = sortedCourses.reverse();
                setCourses(reversedCourses);
            }
        }
        fetchUserAttendance();
    }
    , []);

    return (
        <div className='bg-base-100 shadow-md rounded-xl p-4 w-full'>
            <div >
                <h1 className='text-2xl text-center font-bold mb-2'>Enrolled Courses</h1>
            </div>

            <div className=''>
                {courses.length > 0 ? (
                    courses.map((course: Course, index) => (
                        <Link 
                            href={`/admin/editcourse/edit/course/${course.courseId}`} 
                            key={index}
                            className=""
                        >
                            <div className='card w-full bg-base-300 p-4 mb-4'>
                                <CourseInfoCard
                                    course={course}
                                    expanded={false}
                                />
                            </div>
                        </Link> 
                    ))
                ) : (
                    <div className='card w-full bg-base-100'>
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