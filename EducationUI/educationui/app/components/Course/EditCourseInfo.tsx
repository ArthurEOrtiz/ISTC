'use client';
import { Attendance, Class, Course, Topic } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import { useEffect, useState } from "react";
import SavingModal from "../../shared/modals/SavingModal";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import ErrorModel from "../../shared/modals/ErrorModal";
import { useRouter } from "next/navigation";
import { DeleteCourseById, getCourseById, UpdateCourse } from "@/Utilities/api";
import moment from "moment";
import ClassCard from "../Class/ClassCard";
import SelectPDFModal from "../PDF/SelectPDFModal";
import ClassAttendanceModal from "../Attendance/ClassAttendanceModal";
import CourseFormModal from "./CourseFormModal";
import SelectTopicModal from "../Topics/SelectTopicModal";
import EnrollmentModal from "../Enrollment/EnrollmentModal";
import { deepEquals } from "@/Utilities/deepEquality";
import Loading from "@/app/shared/Loading";

interface EditCourseInfoProps {
    courseId: number;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({courseId : crsId}) => { 

    // Initializing Logic 
    const sortClassesByDate = (classes : Class[]): Class[] => {
        if (!courseHasClasses()) return [];

        const sortedClasses = [...classes].sort((a, b) => {
            return new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime();
        });
        return sortedClasses;
    }

    const areClassesOrderedByDate = (): boolean => {
        if (!courseHasClasses()) return false;
        for (let i = 0; i < course.classes.length - 1; i++) {
            const currentClass = course.classes[i];
            const nextClass = course.classes[i + 1];
            if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
                return false;
            }
        }
        return true;
    }

    // Constants
    const courseId = crsId;
    const [initialCourse, setInitialCourse] = useState<Course>({} as Course);
    const [course, setCourse] = useState<Course>({} as Course);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [confirmationModalTitle, setConfirmationModalTitle] = useState<string>('');
    const [confirmationModalMessage, setConfirmationModalMessage] = useState<string>('');
    const [classToDelete, setClassToDelete] = useState<Number | null>(null); 
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showCourseFormModal, setShowCourseFormModal] = useState<boolean>(false);
    const [showPDFModal, setShowPDFModal] = useState<boolean>(false);
    const [showTopicModal, setShowTopicModal] = useState<boolean>(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState<Class | null>(null);
    const [showEnrollmentModal, setShowEnrollmentModal] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const router = useRouter();
    
    // Effects
    // Initialize the course data when the component is first rendered.
    useEffect(() => {
        initializeCourseData();
    }, []);

    // This will check if the course has been updated and set the unsaved changes flag.
    useEffect(() => {
        // First check if there are any classes to check.
        if (!courseHasClasses()) {
            return;
        }

        // Then sort the classes by date to compare them.
        // This is because the classes are not guaranteed to be in order when they are received from the API.
        const sortedCourseClasses = sortClassesByDate(course.classes);
        const sortedInitialCourseClasses = sortClassesByDate(initialCourse.classes);

        const sortedCourse = {
            ...course,
            classes: sortedCourseClasses
        }

        const sortedInitialCourse = {
            ...initialCourse,
            classes: sortedInitialCourseClasses
        }
        
        if (!deepEquals(sortedCourse, sortedInitialCourse)) {
            console.log("Unsaved Changes Detected");
            setUnsavedChanges(true);
        } else {
            console.log("No Unsaved Changes Detected");
            setUnsavedChanges(false);
        }
    }
    , [course, course.classes]);

    // This will sort the classes by date if they are not already sorted
    useEffect(() => { 
        if (!courseHasClasses()){
            return;
        }

        console.log("Checking if classes are ordered by date...");  
        if (!areClassesOrderedByDate()) {
            console.log("Classes are not ordered by date. Sorting...");
            setCourse(prevCourse => {
                return {
                    ...prevCourse,
                    classes: sortClassesByDate(prevCourse.classes)
                }
            });
        }
    }
    , [course.classes]);

    // This will scroll to the bottom of the page when a new class is added.
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    , [course.classes?.length]);

    // Event Handlers
    const handleConfirmationModalOnConfirm = (): void => {
        if (confirmationModalTitle === 'Delete Class') {
            handleConfirmDeleteClass();
        }

        if (confirmationModalTitle === 'Delete Course') {
            handleConfirmDeleteCourse();
        }
        setShowConfirmationModal(false);
    }

    const handleOnClassDelete = (index: number): void => {
        setConfirmationModalTitle('Delete Class');
        setConfirmationModalMessage('Are you sure you want to delete this class? This will delete attendance records for this class.');
        setClassToDelete(index);
        setShowConfirmationModal(true);
    }

    const handleOnClassAdd = (): void => {

        if (!courseHasClasses()) {
            addNewClass();
        } else {
            const lastClass = course.classes[course.classes.length - 1];
            const lastClassAttendances = lastClass.attendances;
            lastClassAttendances.forEach(attendance => {
                attendance.attendanceId = 0;
                attendance.attended = false;
            });
            addNewClassPlusOneDay(lastClassAttendances);
        }
    }

    const handleSaveCourse = async () => {
        console.log("Saving Course", course);
        setIsSaving(true);

        const response = await UpdateCourse(course);
        if (response.status === 200) {
            console.log("Course Saved", response.data);
            setCourse(response.data);
            setInitialCourse(response.data);           
        } else {
            setErrorMessages(response)
        }
        setIsSaving(false);
    }

    const handleDeleteCourse = () => {
        setConfirmationModalTitle('Delete Course');
        setConfirmationModalMessage('Are you sure you want to delete this course? Attendance records and exam results will be deleted. This action cannot be undone.');
        setShowConfirmationModal(true);
    }

    const handleConfirmDeleteClass = () => {
        const newClasses = [...course.classes];
        newClasses.splice(classToDelete as number, 1);
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: newClasses
            }
        });
        setClassToDelete(null);
    };

    const handleConfirmDeleteCourse = async () => {
        setIsSaving(true);
        const response = await DeleteCourseById(course.courseId as number);
        if (response.status === 204) {
            router.push('/admin/editcourse/edit');
        } else {
            setErrorMessages(response);
        }
    }

    // Helper Methods 
    const initializeCourseData = async () => {
        console.log("Initializing Course Data")
        setIsLoading(true);
        const courseData = await getCourseData(courseId);
        console.log("Course Data", courseData)
        setCourse(courseData);
        setInitialCourse(courseData);
        setIsLoading(false);
    }

    const getCourseData = async (courseId: number): Promise<Course> => {
       
        const response = await getCourseById(courseId);
        if (response.status === 200) {
            return response.data;
        } else {
            setErrorMessages(response);
            return {} as Course;
        }
    }
    
    const addNewClass = (): void => {
        // Generate a unique negative ID for the class
        // the api will then reconize this as a new class to be added.
        const tempId : number = -(Date.now() % 2147483647); // 2147483647 is the max value for a 32-bit signed integer
        const todayAt9AMMountainTime = moment().tz('America/Denver').set({ hour: 9, minute: 0, second: 0 }).toDate();
        const todayAt5PMMountainTime = moment().tz('America/Denver').set({ hour: 17, minute: 0, second: 0 }).toDate();

        const newClass: Class = {
            classId: tempId,
            courseId: course.courseId,
            scheduleStart: todayAt9AMMountainTime,
            scheduleEnd: todayAt5PMMountainTime,
            attendances: []
        }
        //console.log(newClass)
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: [newClass]
            }
        });
    }

    const addNewClassPlusOneDay = (attendances : Attendance[]): void => {
        const lastClass = course.classes[course.classes.length - 1];

        const addOneDay = (date: any): Date => {
            let output: Date;   
            if (typeof date === 'string') {
            output = moment(date).utc(true).add(1, 'days').toDate();
            } else {
                output = moment(date).add(1, 'days').toDate();
            }

            return output as Date;
        }

        // Generate a unique negative ID for the class
        // the api will then reconize this as a new class to be added.
        const tempId : number = -(Date.now() % 2147483647); // 2147483647 is the max value for a 32-bit signed integer

        const newClassSchedule: Class = {
            classId: tempId, 
            courseId: course.courseId,
            scheduleStart: addOneDay(lastClass.scheduleStart),
            scheduleEnd: addOneDay(lastClass.scheduleEnd), 
            attendances: attendances
        }

        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: [...prevCourse.classes, newClassSchedule]
            }
        });
    }

    const courseHasClasses = (): boolean => {
        if (course.classes === undefined) {
            return false;
        }
        
        if (course.classes === null) {
            return false;
        }

        if (course.classes.length === 0) {
            return false;
        }

        return true
    }

    // Render
    // if the course is loading, display the loading spinner
    if (isLoading) {
        return <Loading />
    }
    // if the course is not loading and there is no course data, display an error message
    if (!isLoading && Object.keys(course).length === 0){

        return (
            <div className="mt-4 bg-error-content p-8 m-4 rounded-xl space-y-4 w-full">
                <p className="text-error text-2xl">No information is avaiable for this course. </p>
                <button 
                    className="btn btn-primary btn-sm text-white"
                    onClick={() => router.push('/admin/editcourse/edit')}
                >
                    Return to Course List
                </button>
            </div>
        );
    }
    // if the course is not loading and there is course data, display the course information
    return (
        <div className="w-full m-4">
         
            <div className="p-4">
                <p className="p-s text-3xl text-center font-bold"> Edit Course </p>
                {unsavedChanges && (
                    <div role="alert" className="alert alert-warning mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning: Unsaved Changes detected!</span>
                  </div>)}
            </div>
            
            <div className="bg-base-100 shawdow-md rounded-xl p-5 mb-4">
                <div className="mb-4 bg-base-300 rounded-xl p-4">
                    <CourseInfoCard course={course} />
                </div>
                <div className="mt-2 space-x-2 space-y-2">
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => setShowCourseFormModal(true)}
                    >
                        Edit Course Information
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => setShowTopicModal(true)}
                    >
                        Select Topics 
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => setShowPDFModal(true)}
                    >
                        Select PDF
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => setShowEnrollmentModal(true)}
                    >
                        Manage Enrollment
                    </button>
                    <button
                        className="btn btn-success text-white"
                        onClick = {handleSaveCourse}>
                            Save Course
                    </button>
                    <button 
                        className="btn btn-error text-white"
                        onClick={handleDeleteCourse}>
                            Delete Course
                    </button>
                    {/* <button 
                        onClick={() => console.log(course)}
                        className="btn btn-primary text-white"
                    >
                        Log Course
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => console.log(initialCourse)}
                    >
                        Log Initial Course
                    </button> */}
                </div>
            </div>
    
            
            <div className="space-y-2">
                {course.classes?.map((cls, index) => (
                    <div key={cls.classId} >
                        <div className="bg-base-100 shadow-md rounded-xl relative p-4">
                            <div className="flex justify-between mb-2 mt-4">
                                <p className="text-xl font-bold">Class {index + 1}</p>
                                {/* <div>
                                    <p className="text-sm">Class ID: {cls.classId}</p>
                                    <p className="text-sm">Index: {index}</p>
                                </div> */}
                            </div>
                            <ClassCard
                                cls={cls}
                                onChange={(newClass) => {
                                    const newClasses = [...course.classes];
                                    newClasses[index] = newClass;
                                    // console.log("Modified Class Index", index);
                                    // console.log("Modified Class", newClass);
                                    // console.log("Modified Classes", newClasses);
                                    // console.log("Course Classes", course.classes);
                                    // console.log("Incoming Course Classes", intialCourse.classes);
                                    setCourse({
                                        ...course, 
                                        classes: newClasses});
                                }}
                                disabled={course.status === 'Archived'}
                                onDelete={() => handleOnClassDelete(index)}
                            />
                            <div className="space-x-2">
                                <button
                                    className="btn btn-primary btn-sm text-white"
                                    onClick={() => setShowAttendanceModal(cls)}
                                    disabled={course.status === 'Upcoming'}
                                >
                                    Attendance
                                </button>
                                {/* <button
                                    className="btn btn-primary btn-sm text-white"
                                    onClick={() => console.log(cls)}
                                >
                                    Log Class
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="flex justify-left mt-2">
                    <button 
                        className="btn btn-success text-white"
                        onClick={handleOnClassAdd}>
                            &#x2B; Class
                    </button>
                </div>
            </div>

            {showConfirmationModal && (
                <ConfirmationModal
                    title={confirmationModalTitle}
                    message={confirmationModalMessage}
                    onConfirm={handleConfirmationModalOnConfirm}
                    onCancel={() => setShowConfirmationModal(false)} />
            )}


            {isSaving && (
                <SavingModal text={'Saving Course...'} />
            )}

            {errorMessages && (
                <ErrorModel
                    title='Error'
                    message={errorMessages}
                    onClose={() => setErrorMessages(null)} 
                    />
            )}

            <SelectPDFModal
                open={showPDFModal}
                onClose={() => setShowPDFModal(false)}
                onAdd={(pdf) => {
                    setCourse({...course, pdf: pdf, pdfId: pdf.pdfId});
                    setShowPDFModal(false);
                }}
                onRemove={() => {
                    setCourse({...course, pdf: null, pdfId: null});
                    setShowPDFModal(false);
                }}
                PDF={course.pdf}
            />

            {showAttendanceModal && (
                <ClassAttendanceModal
                    class={showAttendanceModal}
                    isOpen={true}
                    onChanges={(cls) => {
                        const newClasses = course.classes.map((c) => {
                            if (c.classId === cls.classId) {
                                return cls;
                            }
                            return c;
                        });
                        setCourse({...course, classes: newClasses});
                    }}
                    onExit={() => setShowAttendanceModal(null)}
                    onError={(message) => setErrorMessages(message)}
                />
            )}

            <CourseFormModal
                course={course}
                isVisable={showCourseFormModal}
                onSubmit={(c) => {
                    setCourse(c)
                    setShowCourseFormModal(false)
                }}
                onClose={() => setShowCourseFormModal(false)}
            />
       
            <SelectTopicModal
                open={showTopicModal}
                onClose={() => setShowTopicModal(false)}
                onSelect={(topics : Topic[]) => {
                    setCourse({...course, topics: topics});
                    setShowTopicModal(false);
                }}
                topics={course.topics}
            />

            <EnrollmentModal
                isOpen={showEnrollmentModal}
                course={initialCourse}
                onExit={() => {
                    setShowEnrollmentModal(false)
                    window.location.reload()
                }}
                onError={(message) => {
                    setErrorMessages(message)
                    setShowEnrollmentModal(false)
                }}
            />
            


        </div>
    );
}

export default EditCourseInfo;