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

    const handleOnCourseInfoCardSave = (updatedCourse: Course | null): void => {
        console.log
        
        if (updatedCourse !== null) {
            //setCourseInfo(updatedCourse);
        }
    }
    const handleOnClassInfoCardDelete = (id: number | null): void => {
        if (id !== null) {
            setClasses(prevClasses => prevClasses.filter(classSchedule => classSchedule.classId !== id))
        }
    }

    const handleOnClassAdd = (): void => {
        const today = new Date();
        today.setUTCHours(16,0,0,0);
        const todayAt9AMString = today
        console.log("9am String ", todayAt9AMString)
       
        today.setUTCHours(24,0,0,0);
        const todayAt5PMString = today
        console.log("5pm String ", todayAt5PMString)


        const newClassSchedule: ClassSchedule = {
            classId: 0,
            courseId: course.courseId,
            scheduleStart: todayAt9AMString,
            scheduleEnd: todayAt5PMString,
            attendance: []
        }

        console.log(newClassSchedule)
        // // Disable edit mode for all other classes 
        // setEditModeIndex(null);
        // // Add the new class with edit mode enabled 
        // setClasses(prevClasses => [...prevClasses, newClassSchedule]);
        // setEditModeIndex(classes.length);
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
                    <CourseInfoCard course={course} onSave={handleOnCourseInfoCardSave} />
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
                </div>
            </div>
            
        </div>
                          
 
        
  );
}

export default EditCourseInfo;