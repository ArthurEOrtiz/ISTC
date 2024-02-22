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

    function handleOnClassInfoCardDelete(id: number | null): void {
        if (id === null) {
            setClasses(prevClasses => prevClasses.filter(classSchedule => classSchedule.classId !== id))
            window.location.reload();
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
                        className="btn btn-primary text-white m-1">
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
                <div className = "flex flex-wrap justify-center gap-2">
                    {classes.map((classSchedule) => (
                        <ClassInfoCard key={classSchedule.classId} classSchedule={classSchedule} onDelete={handleOnClassInfoCardDelete} />
                    ))}
                </div>
                <div className="navbar  w-1/2 rounded-xl">
                    <button 
                        className="btn btn-primary text-white m-1"
                        onClick={() => {}}>
                            Add Class
                    </button>
                </div>
            </div>
            
        </div>
  );
}

export default EditCourseInfo;