'use client';   
import { useEffect, useState } from "react";
import CourseCalendar from "./CourseCalendar"
import CourseList from "./CourseList";
import { Course } from "@/app/shared/types/sharedTypes";
import { getAllCourses } from "@/Utilities/api";

const CourseCatalog: React.FC = () => {
    const [ isCourseCalendarVisible, setIsCourseCalendarVisible ] = useState(true);
    const [ isCourseListVisible, setIsCourseListVisible ] = useState(false);
    const [ courses, setCourses ] = useState<Course[]>([]);

    useEffect(() => {
        console.log('fetching courses');
        const fetchData = async () => {
            const data = await getAllCourses();
            setCourses(data);
        }
        fetchData();
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
        <div className='p-4'>
            <h1 className='text-3xl text-center font-bold'>Courses</h1>
            <div>
                <div className='join border'>
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
            {isCourseCalendarVisible && <CourseCalendar />}
            {isCourseListVisible && <CourseList
                                        courses={courses}
                                        viewOnly={true}
                                        onEnroll={(course) => console.log("Enroll", course )} />}
        </div>
    );
}

export default CourseCatalog;