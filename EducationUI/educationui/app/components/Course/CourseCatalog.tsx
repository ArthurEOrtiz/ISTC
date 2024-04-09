'use client';   
import { useEffect, useState } from "react";
import CourseCalendar from "./CourseCalendar"
import CourseList from "./CourseList";
import { Course } from "@/app/shared/types/sharedTypes";
import { GetAllEnrollableCourses } from "@/Utilities/api";
import ErrorModel from "@/app/shared/modals/ErrorModal";

const CourseCatalog: React.FC = () => {
    const [ isCourseCalendarVisible, setIsCourseCalendarVisible ] = useState(true);
    const [ isCourseListVisible, setIsCourseListVisible ] = useState(false);
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ errorMessages, setErrorMessages ] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await GetAllEnrollableCourses();
            if (response.status === 200) {
                setCourses(response.data);
            } else {
                setErrorMessages(response as unknown as string);
            }
        }
        fetchCourses();
    }
    , [isCourseListVisible]);

    const handleCourseCalendarClick = () => {
        setIsCourseCalendarVisible(true);
        setIsCourseListVisible(false);
    }

    const handleCourseListClick = () => {
        setIsCourseCalendarVisible(false);
        setIsCourseListVisible(true);
    }

    return (
        <div className='p-4 space-y-2'>
            <h1 className='text-3xl text-center font-bold'>Courses</h1>
            <div>
                <div className='join p-1'>
                    <button
                        className={`join-item btn ${isCourseCalendarVisible ? 'btn-primary text-white' : ''}`}   
                        onClick={handleCourseCalendarClick}
                        >
                        Calendar
                    </button>
                    <button
                        className={`join-item btn ${isCourseListVisible ? 'btn-primary text-white' : ''}`}
                        onClick={handleCourseListClick}
                        >
                        List
                    </button>
                </div>
            </div>
            <div>
                {isCourseCalendarVisible && <CourseCalendar />}
            </div>
            <div>
                {isCourseListVisible && <CourseList
                                            courses={courses}
                                            viewOnly={true}
                                            />}
            </div>

            {errorMessages && <ErrorModel
                                title='Error'
                                message={errorMessages}
                                onClose={() => setErrorMessages(null)}
                                />}

            
        </div>
    );
}

export default CourseCatalog;