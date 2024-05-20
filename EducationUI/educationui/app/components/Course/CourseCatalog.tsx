'use client';   
import { useEffect, useState } from "react";
import CourseCalendar from "./CourseCalendar"
import CourseList from "./CourseList";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { getAllCourses, GetAllEnrollableCourses, GetUserByClerkId } from "@/Utilities/api";
import ErrorModel from "@/app/shared/modals/ErrorModal";
import Loading from "@/app/shared/Loading";
import { useUser } from "@clerk/clerk-react";

interface CourseCatalogProps {
    isAdmin?: boolean;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({isAdmin = false}) => {
    const { user: clerkUser, isLoaded } = useUser();
    const [ user, setUser ] = useState<User>();
    const [ isCourseCalendarVisible, setIsCourseCalendarVisible ] = useState(!isAdmin);
    const [ isCourseListVisible, setIsCourseListVisible ] = useState(isAdmin);
    const [ courses, setCourses ] = useState<Course[]>();
    const [ errorMessages, setErrorMessages ] = useState<string | null>(null);
  
    useEffect(() => {
        if (!isAdmin) {
            fetchEnrollableCourses();
            return;
        }
        fetchAllCourses();
    }
    , [isCourseListVisible]);

    useEffect(() => {
        fetchUser();
    }, [clerkUser]);

    // handlers
    const handleCourseCalendarClick = () => {
        setIsCourseCalendarVisible(true);
        setIsCourseListVisible(false);
    }

    const handleCourseListClick = () => {
        setIsCourseCalendarVisible(false);
        setIsCourseListVisible(true);
    }

    // helpers
    const fetchEnrollableCourses = async () => {
        const response = await GetAllEnrollableCourses();
        if (response.status === 200) {
            setCourses(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
    }

    const fetchAllCourses = async () => {
        const response = await getAllCourses();
        if (response.status === 200) {
            setCourses(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
    }

    const fetchUser = async () => {
        if (!clerkUser) {
            return;
        }

        const response = await GetUserByClerkId(clerkUser.id);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
    }
    
    if (!courses || !isLoaded || !user) {
        return <Loading />
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
   
            {isCourseCalendarVisible && <CourseCalendar isAdmin={isAdmin}/>}

            {isCourseListVisible && user && <CourseList 
                                            courses={courses}
                                            user={user} 
                                            isAdmin={isAdmin}
                                            onError={(m) => setErrorMessages(m)}
                                            />}
            
            {errorMessages && <ErrorModel
                                title='Error'
                                message={errorMessages}
                                onClose={() => setErrorMessages(null)}
                                />}

        </div>
    );
}

export default CourseCatalog;