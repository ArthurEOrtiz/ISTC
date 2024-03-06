'use client';
import { ClassSchedule, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import { use, useEffect, useState } from "react";

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
        for (let i = 0; i < classes.length - 1; i++) {
            const currentClass = classes[i];
            const nextClass = classes[i + 1];
            if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
                return false;
            }
        }
        return true;
    }

    // Constants
    const [classes, setClasses] = useState<ClassSchedule[]>(sortClassesByDate(course.classes));
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
    
    useEffect(() => {   
        if (!areClassesOrderedByDate()) {
            setClasses(sortClassesByDate(classes));
        }
    }
    , [classes]);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    , [classes.length]);

    // Event Handlers

    const handleOnCourseInfoCardSave = (updatedCourse: Course | null): void => {
        console.log
        
        if (updatedCourse !== null) {
            //setCourseInfo(updatedCourse);
        }
    }

    const handleOnClassInfoCardDelete = (id: number | null): void => {
        if (id !== null) {
            setClasses(prevClasses => prevClasses.filter(classSchedule => classSchedule.classId !== id))
        } else {
            setClasses(prevClasses => prevClasses.slice(0, -1));
        }
    }

    const handleOnClassAdd = (): void => {
        const hasNullClass = classes.some(classSchedule => classSchedule.classId === null);

        if (hasNullClass) {
            const modal = document.getElementById('warning_modal') as HTMLDialogElement | null;
            if (modal) {
                modal.showModal();
            }
            return;
        }

        if (classes.length === 0 || classes === null) {
            addNewClass();

        } else {
            addNewClassPlusOneDay();
        }
        setEditModeIndex(classes.length);
    }

    const handleOnClassAdded = (updatedClassSchedule: ClassSchedule | null): void => {
        console.log("Updated Class Schedule", updatedClassSchedule);
        if (updatedClassSchedule !==  null) {
            const index = classes.findIndex(classSchedule => classSchedule.classId === null);
            if (index !== -1) {
                const newClasses = [...classes];
                newClasses[index] = updatedClassSchedule;
                setClasses(newClasses);
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
            setClasses([newClassSchedule]);
            setEditModeIndex(0);
    }

    const addNewClassPlusOneDay = (): void => {
        const lastClass = classes[classes.length - 1];
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
        console.log(newClassSchedule)
        // Disable edit mode for all other classes 
        setEditModeIndex(null);
        // Add the new class with edit mode enabled 
        setClasses(prevClasses => [...prevClasses, newClassSchedule]);
    }

    return (
        <div>

            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {course.courseId}</h1>
                </div>
                <div className="navbar  w-1/2 rounded-xl flex justify-center">
                    
                    <button 
                        className="btn btn-error text-white m-1">
                            Delete Course
                    </button>
                    <button
                        className="btn btn-primary text-white m-1">
                            Save All
                    </button>
                </div>
                <div className="p-4">
                    <CourseInfoCard course={course} onApply={handleOnCourseInfoCardSave} />
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold">
                        Classes
                    </h1>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {classes.map((classSchedule, index) => (
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
                        onClick={()=> console.log(course)}>
                            Test Course
                    </button>
                    <button
                        className="btn btn-primary text-white m-1"
                        onClick={()=> console.log(classes)}>
                            Test Classes
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