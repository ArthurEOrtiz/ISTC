'use client';
import { Class, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import { useEffect, useState } from "react";
import SavingModal from "../../shared/modals/SavingModal";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import ErrorModel from "../../shared/modals/ErrorModal";
import { useRouter } from "next/navigation";
import { DeleteCourseById, UpdateCourseById } from "@/Utilities/api";
import moment from "moment";

interface EditCourseInfoProps {
    course: Course;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({course}) => { 

    // Initializing Logic 
    const sortClassesByDate = (classes : Class[]): Class[] => {
        const sortedClasses = [...classes].sort((a, b) => {
            return new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime();
        });
        return sortedClasses;
    }

    const areClassesOrderedByDate = (): boolean => {
        for (let i = 0; i < courseInfo.classes.length - 1; i++) {
            const currentClass = courseInfo.classes[i];
            const nextClass = courseInfo.classes[i + 1];
            if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
                return false;
            }
        }
        return true;
    }

    // Constants
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
    const [courseInfo, setCourseInfo] = useState<Course>(course);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const router = useRouter();
    
    // Effects
    // This will sort the classes by date if they are not already sorted
    // when the component is first rendered and when the classes are updated.
    useEffect(() => {   
        if (!areClassesOrderedByDate()) {
            setCourseInfo(prevCourse => {
                return {
                    ...prevCourse,
                    classes: sortClassesByDate(prevCourse.classes)
                }
            });
        }
    }
    , [courseInfo.classes]);

    // This will scroll to the bottom of the page when a new class is added.
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    , [courseInfo.classes.length]);

    // This will check if the course has been updated and set the unsaved changes flag.
    useEffect(() => {
        const courseString = JSON.stringify(course);
        const courseInfoString = JSON.stringify(courseInfo);
        if (courseString !== courseInfoString) {
            setUnsavedChanges(true);
        } else {
            setUnsavedChanges(false);
        }
    }
    , [courseInfo]);

    // Event Handlers

    const handleOnCourseInfoCardSave = (updatedCourse: Course | null): void => {
        if (updatedCourse !== null) {
            setCourseInfo(updatedCourse);
        }
    }

    const handleOnClassInfoCardDelete = (id: number | null): void => {
        if (id !== null) {
            setCourseInfo(prevCourse => {
                return {
                    ...prevCourse,
                    classes: prevCourse.classes.filter(classSchedule => classSchedule.classId !== id)
                }
            });
        } else {
            setCourseInfo(prevCourse => {
                return {
                    ...prevCourse,
                    classes: prevCourse.classes.slice(0, -1)
                }
            });
        }
    }

    const handleOnClassAdd = (): void => {
        const hasNullClass = courseInfo.classes.some(classSchedule => classSchedule.classId === 0);

        if (hasNullClass) {
            setErrorMessages('There is an unsaved new class, please save or remove class before adding a new class.');
            return;
        }

        if (courseInfo.classes.length === 0 || courseInfo.classes === null) {
            addNewClass();

        } else {
            addNewClassPlusOneDay();
        }
        setEditModeIndex(courseInfo.classes.length);
    }

    const handleOnClassAdded = (updatedClassSchedule: Class | null): void => {
       
        if (updatedClassSchedule !==  null) {
            const index = courseInfo.classes.findIndex(classSchedule => classSchedule.classId === 0);
            if (index !== -1) {
                const newClasses = [...courseInfo.classes];
                newClasses[index] = updatedClassSchedule;
                setCourseInfo(prevCourse => {
                    return {
                        ...prevCourse,
                        classes: newClasses
                    }
                });
                setEditModeIndex(null);
                setUnsavedChanges(false);
            }
        }
    }

    const handleSaveCourse = async () => {
        console.log("Saving Course", courseInfo);
        setIsSaving(true);
        try{
           await UpdateCourseById(courseInfo.courseId!, courseInfo);
        }
        catch (error) {
            throw error;
        }
        finally {
            setIsSaving(false);
            setUnsavedChanges(false);
        }

    }

    const handleDeleteCourse = async () => {
        setShowConfirmationModal(true);
    }

    const handleConfirmDeleteCourse = async () => {
        console.log("Deleting Course", courseInfo);
        setIsSaving(true);
        try {
            await DeleteCourseById(courseInfo.courseId!);
        }
        catch (error) {
            throw error;
        }
        finally {
            router.push('/admin/editcourse/edit');
        }
    }

    // Helper Methods 
    const addNewClass = (): void => {
        
        const todayAt9AMMountainTime = moment().utc().set({ hour: 15, minute: 0, second: 0 }).format();
        const todayAt5PMMountainTime = moment().utc().set({ hour: 23, minute: 0, second: 0 }).format();

        const newClassSchedule: Class = {
            classId: 0,
            courseId: course.courseId,
            scheduleStart: todayAt9AMMountainTime,
            scheduleEnd: todayAt5PMMountainTime,
            attendances: []
        }
        console.log(newClassSchedule)
        setCourseInfo(prevCourse => {
            return {
                ...prevCourse,
                classes: [newClassSchedule]
            }
        });
        setEditModeIndex(0);
    }

    const addNewClassPlusOneDay = (): void => {
        const lastClass = courseInfo.classes[courseInfo.classes.length - 1];

        const addOneDay = (dateString: string): string => {
            const date = moment(dateString).add(1, 'days').format();
            return date;
        }

        const newClassSchedule: Class = {
            classId: 0, 
            courseId: course.courseId,
            scheduleStart: addOneDay(lastClass.scheduleStart),
            scheduleEnd: addOneDay(lastClass.scheduleEnd), 
            attendances: []
        }

        console.log(newClassSchedule);
        // Disable edit mode for all other classes 
        setEditModeIndex(null);
        // Add the new class with edit mode enabled 
        setCourseInfo(prevCourse => {
            return {
                ...prevCourse,
                classes: [...prevCourse.classes, newClassSchedule]
            }
        });
    }

    return (
        <div className="w-full m-4">
         
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {courseInfo.courseId}</h1>
                    {unsavedChanges && (
                        <div role="alert" className="alert alert-warning mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Warning: Unsaved Changes detected!</span>
                      </div>)}
                </div>
                
                <div className="bg-base-100 shawdow-md rounded-xl p-5">
                    <div className="mb-4 bg-base-300 rounded-xl p-4">
                        <CourseInfoCard course={courseInfo} />
                    </div>
                    <div className="mt-2 space-x-2">
                        <button 
                            className="btn btn-error text-white mb-1 mr-1"
                            onClick={handleDeleteCourse}>
                                Delete Course
                        </button>
                        <button
                            className="btn btn-primary text-white mb-1"
                            onClick = {handleSaveCourse}>
                                Save Course
                        </button>
                    </div>

                </div>
          
            
            <div>
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold">
                        Classes
                    </h1>
                </div>
                <div>
                    <div>
                        {courseInfo.classes.map((cls, index) => (
                            <div key={index} className="flex justify-center">
                                <ClassInfoCard 
                                    key={cls.classId}
                                    class={cls}
                                    onAdd={handleOnClassAdded}
                                    onDelete={handleOnClassInfoCardDelete}
                                    editMode={index === editModeIndex}
                                    onError={(message) => setErrorMessages(message)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button 
                            className="btn btn-primary text-white"
                            onClick={handleOnClassAdd}>
                                Add Class
                        </button>
                    </div>
                </div>
            </div>

            {showConfirmationModal && (
                <ConfirmationModal
                    title={'Delete Course'}
                    message={'Are you sure you want to delete this course?'}
                    onConfirm={handleConfirmDeleteCourse}
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

        </div>
    );
}

export default EditCourseInfo;