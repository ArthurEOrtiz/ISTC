'use client';
import { ClassSchedule, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import { useState } from "react";

interface EditCourseInfoProps {
    course: Course;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({course}) => { 
    const [classes, setClasses] = useState<ClassSchedule[]>(course.classes);
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);

     // Sort the classes array by scheduleStart date
    //const sortedClasses = [...classes].sort((a, b) => new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime());

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

        console.log(todayAt9AMString);
        console.log(todayAt5PMString);


        const newClassSchedule: ClassSchedule = {
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
                    <h1 className="p-s text-3xl text-center font-bold">Classes</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {classes.map((classSchedule, index) => (
                        <ClassInfoCard 
                            key={index}
                            classSchedule={classSchedule}
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