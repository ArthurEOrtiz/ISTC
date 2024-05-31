'use client';   
import { useEffect, useState } from "react";
import CourseCalendar from "./CourseCalendar"
import CourseList from "./CourseList";
import { Course, CourseStatus, User } from "@/app/shared/types/sharedTypes";
import { GetCoursesByStatus, GetUserByClerkId, GetAllEnrollableCoursesByStatus, SearchAllCourses } from "@/Utilities/api";
import ErrorModel from "@/app/shared/modals/ErrorModal";
import Loading from "@/app/shared/Loading";
import { useUser } from "@clerk/clerk-react";

interface CourseCatalogProps {
    isAdmin?: boolean;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({isAdmin = false}) => {
    const { user: clerkUser, isLoaded } = useUser();
    const [ user, setUser ] = useState<User>();
    const [ selectedStatuses, setSelectedStatuses ] = useState<CourseStatus []>(['Upcoming', 'InProgress']);
    const [ searchString, setSearchString ] = useState<string>(''); 
    const [ isCourseCalendarVisible, setIsCourseCalendarVisible ] = useState(!isAdmin);
    const [ isCourseListVisible, setIsCourseListVisible ] = useState(isAdmin);
    const [ courses, setCourses ] = useState<Course[]>();
    const [ errorMessages, setErrorMessages ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(false); 

    // effects
    useEffect(() => {
        
        loadCourses();
        
    }
    , [selectedStatuses]);

    useEffect(() => {
        fetchUser();
    }, [clerkUser]);

    useEffect(() => {
        searchCourses();
    }
    , [searchString]);

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
        const response = await GetAllEnrollableCoursesByStatus(selectedStatuses);
        if (response.status === 200) {
            setCourses(response.data); 
        } else {
            setErrorMessages(response as unknown as string);
        }
    }

    const fetchAllCourses = async () => {
        const response = await GetCoursesByStatus(selectedStatuses);
        if (response.status === 200) {
            setCourses(response.data);
        } else {
            setErrorMessages(response);
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

    const loadCourses = async () => {
        setIsLoading(true);
        if (!isAdmin) {
            await fetchEnrollableCourses();
        } else {
             await fetchAllCourses();
        }
        setIsLoading(false);
    }

    const searchCourses = async () => {
        if (searchString === '') {
            await loadCourses();
            return;
        }

        const response = await SearchAllCourses(searchString, selectedStatuses);
        if (response.status === 200) {
            setCourses(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
    }

    
    // render
    if ( !isLoaded || !user) {
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

                {/* <div className="space-x-2">
                    <button className="btn btn-primary btn-sm text-white"
                            onClick={() => console.log("Courses", courses)}
                    >
                        Log Courses
                    </button>
                    <button className="btn btn-primary btn-sm text-white"
                            onClick={() => console.log("Selected Course", filteredCourses)}
                    >
                        Log Selected Courses
                    </button>
                </div> */}

                {isCourseListVisible && (
                    <div className="flex justify-between">
                        <div className="join p-1">
                            <button
                                className={`join-item btn ${selectedStatuses.includes('Upcoming') ? 'btn-primary text-white': ''}`}
                                onClick={() => setSelectedStatuses(selectedStatuses.includes('Upcoming') 
                                    ? selectedStatuses.filter(status => status !== 'Upcoming') 
                                    : [...selectedStatuses, 'Upcoming'])}
                            >
                                Upcoming
                            </button>
                            <button
                                className={`join-item btn ${selectedStatuses.includes('InProgress') ? 'btn-primary text-white': ''}`}
                                onClick={() => setSelectedStatuses(selectedStatuses.includes('InProgress') 
                                    ? selectedStatuses.filter(status => status !== 'InProgress') 
                                    : [...selectedStatuses, 'InProgress'])}
                            >
                                In Progress
                            </button>
                            {isAdmin && (
                                <button
                                    className={`join-item btn ${selectedStatuses.includes('Archived') ? 'btn-primary text-white': ''}`}
                                    onClick={() => setSelectedStatuses(selectedStatuses.includes('Archived') 
                                        ? selectedStatuses.filter(status => status !== 'Archived') 
                                        : [...selectedStatuses, 'Archived'])}
                                >
                                    Archived
                                </button>
                            )}
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Search"
                                    value={searchString}
                                    onChange={(e) => setSearchString(e.target.value)} 
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                        </div>
                    </div>
                )}
            </div>
   
            {isCourseCalendarVisible && courses && <CourseCalendar 
                                                        isAdmin={isAdmin}
                                                        courses={courses}
                                                    />}

            {(isCourseListVisible && user && courses && !isLoading ) ? <CourseList 
                                                            courses={courses}
                                                            user={user} 
                                                            isAdmin={isAdmin}
                                                            onError={(m) => setErrorMessages(m)}
                                                            />
                                                            : (
                                                                <div className="flex justify-center">
                                                                    <span className="loading loading-spinner loading-lg"></span>
                                                                </div>
                                                            )}
            
            {errorMessages && <ErrorModel
                                    title='Error'
                                    message={errorMessages}
                                    onClose={() => setErrorMessages(null)}
                                />}

        </div>
    );
}

export default CourseCatalog;