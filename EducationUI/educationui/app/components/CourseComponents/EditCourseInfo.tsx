'use client';
import { ClassSchedule, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import { useEffect, useState } from "react";
import SavingModal from "../../shared/modals/SavingModal";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import { useRouter } from "next/navigation";
import { DeleteCourseById, UpdateCourseById } from "@/Utilities/api";

interface EditCourseInfoProps {
    course: Course;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({course}) => { 

    // Initializing Logic 
    const sortClassesByDate = (classes : ClassSchedule[]): ClassSchedule[] => {
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
        const hasNullClass = courseInfo.classes.some(classSchedule => classSchedule.classId === null);

        if (hasNullClass) {
            const modal = document.getElementById('warning_modal_class') as HTMLDialogElement | null;
            if (modal) {
                modal.showModal();
            }
            return;
        }

        if (courseInfo.classes.length === 0 || courseInfo.classes === null) {
            addNewClass();

        } else {
            addNewClassPlusOneDay();
        }
        setEditModeIndex(courseInfo.classes.length);
    }

    const handleOnClassAdded = (updatedClassSchedule: ClassSchedule | null): void => {
        console.log("Updated Class Schedule", updatedClassSchedule);
        if (updatedClassSchedule !==  null) {
            const index = courseInfo.classes.findIndex(classSchedule => classSchedule.classId === null);
            if (index !== -1) {
                const newClasses = [...courseInfo.classes];
                console.log("New Classes", newClasses);
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
           await UpdateCourseById(courseInfo.courseId, courseInfo);
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
            await DeleteCourseById(courseInfo.courseId);
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
        const today = new Date();

        today.setUTCHours(16,0,0,0);
        const todayAt9AM = new Date(today)
        
        today.setUTCHours(24,0,0,0);
        const todayAt5PM = new Date(today) 

        const newClassSchedule: ClassSchedule = {
            classId: null,
            courseId: course.courseId,
            scheduleStart: todayAt9AM,
            scheduleEnd: todayAt5PM,
            attendance: []
        }
        //console.log(newClassSchedule)
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
        const scheduleStartPlusOneDay = new Date(`${lastClass.scheduleStart}Z`);
        scheduleStartPlusOneDay.setDate(scheduleStartPlusOneDay.getDate() + 1);
        const newScheduleStart = scheduleStartPlusOneDay.toISOString().slice(0, -5);
        const scheduleEndPlusOneDay = new Date(`${lastClass.scheduleEnd}Z`);
        
        scheduleEndPlusOneDay.setDate(scheduleEndPlusOneDay.getDate() + 1);
        const newScheduleEnd = scheduleEndPlusOneDay.toISOString().slice(0, -5);

        const newClassSchedule: ClassSchedule = {
            classId: null,
            courseId: course.courseId,
            scheduleStart: newScheduleStart as unknown as Date,
            scheduleEnd: newScheduleEnd as unknown as Date,
            attendance: []
        }
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
        <div>

            <div>
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {courseInfo.courseId}</h1>
                    {unsavedChanges && (
                        <div role="alert" className="alert alert-warning mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Warning: Unsaved Changes detected!</span>
                      </div>)}
                </div>

                <div className="flex justify-center">              
                        
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
                
                <div className="p-4">
                    <CourseInfoCard course={courseInfo} onApply={handleOnCourseInfoCardSave} />
                </div>
            </div>
            
            <div className="">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold">
                        Classes
                    </h1>
                </div>
                <div className="flex justify-center">
                    {courseInfo.classes.map((classSchedule, index) => (
                        <ClassInfoCard 
                            key={classSchedule.classId}
                            classSchedule={classSchedule}
                            onAdd={handleOnClassAdded}
                            onDelete={handleOnClassInfoCardDelete}
                            editMode={index === editModeIndex} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button 
                        className="btn btn-primary text-white m-1"
                        onClick={handleOnClassAdd}>
                            Add Class
                    </button>
                    {/* <button
                        className="btn btn-primary text-white m-1"
                        onClick={()=> console.log("COURSEINFO",courseInfo)}>
                            Test Course Info
                    </button>
                    <button
                        className="btn btn-primary text-white m-1"
                        onClick={()=> console.log("COURSE",course)}>
                            Test Course
                    </button> */}
                </div>
            </div>

            <dialog id="warning_modal_class" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-error">ERROR!</h3>
                    <p className="py-4">There is an unsaved new class, please save or remove class before adding a new class.</p>
                </div>
            </dialog>

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


            
        </div>
                          
 
        
    );
}

export default EditCourseInfo;