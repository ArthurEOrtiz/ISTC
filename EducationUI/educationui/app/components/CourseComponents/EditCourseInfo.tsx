'use client';
import { ClassSchedule, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import { useEffect, useState } from "react";

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

    // Event Handlers

    const handleOnCourseInfoCardSave = (updatedCourse: Course | null): void => {
        console.log("Updated Course", updatedCourse)
        
        if (updatedCourse !== null) {
            // Update the course with the new course data
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
            const modal = document.getElementById('warning_modal') as HTMLDialogElement | null;
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
            }
        }
    }

    // Helper Methods 
    const addNewClass = (): void => {
        const today = new Date();

            today.setUTCHours(16,0,0,0);
            const todayAt9AM = new Date(today)
            //console.log("9am String ", todayAt9AM)
           
            today.setUTCHours(24,0,0,0);
            const todayAt5PM = new Date(today) 
            //console.log("5pm String ", todayAt5PM)


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

            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {courseInfo.courseId}</h1>
                </div>
                <div className="navbar  w-1/2 rounded-xl flex justify-center">
                    
                    <button 
                        className="btn btn-error text-white m-1">
                            Delete Course
                    </button>
                    <button
                        className="btn btn-primary text-white m-1"
                        onClick = {() => console.log(course)}>
                            Save All
                    </button>
                </div>
                <div className="p-4">
                    <CourseInfoCard course={courseInfo} onApply={handleOnCourseInfoCardSave} />
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold">
                        Classes
                    </h1>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {courseInfo.classes.map((classSchedule, index) => (
                        <ClassInfoCard 
                            key={classSchedule.classId}
                            classSchedule={classSchedule}
                            onAdd={handleOnClassAdded}
                            onDelete={handleOnClassInfoCardDelete}
                            editMode={index === editModeIndex} />
                    ))}
                </div>
                <div className="navbar  w-1/2 rounded-xl">
                    <button 
                        className="btn btn-primary text-white m-1"
                        onClick={handleOnClassAdd}>
                            Add Class
                    </button>
                    <button
                        className="btn btn-primary text-white m-1"
                        onClick={()=> console.log(courseInfo)}>
                            Test Course
                    </button>
                </div>
            </div>

            <dialog id="warning_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-error">ERROR!</h3>
                    <p className="py-4">There is an unsaved new class, please save or remove class before adding a new class.</p>
                </div>
            </dialog>


            
        </div>
                          
 
        
  );
}

export default EditCourseInfo;