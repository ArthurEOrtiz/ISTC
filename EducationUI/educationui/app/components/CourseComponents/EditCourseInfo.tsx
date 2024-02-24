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
            //console.log(new Date(currentClass.scheduleStart), new Date(nextClass.scheduleStart)); // Add this line
            if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
                return false;
            }
        }
        return true;
    }

    const [classes, setClasses] = useState<ClassSchedule[]>(sortClassesByDate(course.classes));
    const [areClassesOrdered, setAreClassesOrdered] = useState<boolean>(areClassesOrderedByDate());
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
    
    useEffect(() => { 
        //console.log("Classes Updated")
        console.log(classes)
        if (!areClassesOrderedByDate()) {
            setClasses(sortClassesByDate(classes));
            console.log("Classes Sorted")
            console.log(classes)
        }
    }
    , [classes]);

    useEffect(() => {
        console.log("Updated Classes", classes);
    }
    , [classes]);


    const handleOnClassInfoCardDelete = (id: number | null): void => {
        if (id === null) {
            setClasses(prevClasses => prevClasses.filter(classSchedule => classSchedule.classId !== id))
            //window.location.reload();
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
        // TODO: first check and see if the next class is equal to any other class
        // if it is, then update that class with new class info
        if (updatedClassSchedule !==  null) {
            // console.log("Class Edited", updatedClassSchedule);
            // console.log(updatedClassSchedule.scheduleStart);
            // console.log(updatedClassSchedule.scheduleEnd);
            // //window.location.reload();

            const index = classes.findIndex(classSchedule => classSchedule.classId === updatedClassSchedule.classId);
            //console.log("Index", index);
            if (index !== -1) {
                const newClasses = [...classes];
                newClasses[index] = updatedClassSchedule;
                setClasses(newClasses);
            }
        }

    }

   

    return (
        <div>

            <div className="flex flex-col items-center">
                <div className="p-4">
                    <h1 className="p-s text-3xl text-center font-bold"> Course Id: {course.courseId}</h1>
                </div>
                <div className="navbar  w-1/2 rounded-xl flex justify-center">
                    <button 
                        className="btn btn-primary text-white m-1">
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
  );
}

export default EditCourseInfo;