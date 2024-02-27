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
    const [courseInfo, setCourseInfo] = useState<Course>(course);
    const [classes, setClasses] = useState<ClassSchedule[]>(sortClassesByDate(course.classes));
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
    
    useEffect(() => { 
        //console.log(classes)  // Keep for debugging   
        if (!areClassesOrderedByDate()) {
            setClasses(sortClassesByDate(classes));
        }
    }
    , [classes]);


    // Event Handlers
    const handleOnClassInfoCardDelete = (id: number | null): void => {
        if (id !== null) {
            setClasses(prevClasses => prevClasses.filter(classSchedule => classSchedule.classId !== id))
        }
    }

    const handleOnClassAdd = (): void => {
        const today = new Date();
        today.setUTCHours(9,0,0,0);
        const todayAt9AMString = today.toISOString().slice(0, -1);
       
        today.setUTCHours(17,0,0,0);
        const todayAt5PMString = today.toISOString().slice(0, -1);


        const newClassSchedule: ClassSchedule = {
            classId: null,
            courseId: course.courseId,
            scheduleStart: todayAt9AMString,
            scheduleEnd: todayAt5PMString
        }

        // Disable edit mode for all other classes 
        setEditModeIndex(null);
        // Add the new class with edit mode enabled 
        setClasses(prevClasses => [...prevClasses, newClassSchedule]);
        setEditModeIndex(classes.length);
    }


    const handleOnClassAdded = (updatedClassSchedule: ClassSchedule | null): void => {
        console.log("Updated Class Schedule", updatedClassSchedule);
        if (updatedClassSchedule !==  null) {
            const index = classes.findIndex(classSchedule => classSchedule.classId === updatedClassSchedule.classId);
            if (index !== -1) {
                const newClasses = [...classes];
                newClasses[index] = updatedClassSchedule;
                setClasses(newClasses);
            }
        }
    }

    const handleOnCourseInfoEdit = (): void => {
        const dialog : HTMLDialogElement = document.getElementById("editCourseInfoDialog") as HTMLDialogElement;
     
        dialog.showModal();

    }

    return (
        <>
        <div>

            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {course.courseId}</h1>
                </div>
                <div className="navbar  w-1/2 rounded-xl flex justify-center">
                    <button 
                        className="btn btn-primary text-white m-1"
                        onClick={handleOnCourseInfoEdit}>
                            Edit Course Information
                    </button>
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
                    <CourseInfoCard course={course} />
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
                </div>
            </div>
            
        </div>
                          
        <div>
            <dialog id="editCourseInfoDialog" className="modal modal-bottom, sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"> EDIT COURSE DIALOG</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
        </>
        
  );
}

export default EditCourseInfo;