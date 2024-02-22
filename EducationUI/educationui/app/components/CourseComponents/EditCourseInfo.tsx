'use client';
import { ClassSchedule, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import ClassInfoCard from "./ClassInfoCard";
import exp from "constants";


interface EditCourseInfoProps {
    course: Course;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({course}) => { 
    
    const handleEdit = (classSchedule: ClassSchedule) => {
        console.log(classSchedule);
    }

    return (
        <div>
            <div className="p-4">
                <h1 className="p-s text-3xl text-center font-bold"> Course Id: {course.courseId}</h1>
            </div>
            <div className="p-4">
                <CourseInfoCard course={course} />
            </div>
            <div className="p-4">
                <h1 className="p-s text-3xl text-center font-bold">Classes</h1>
            </div>
            <div className = "flex flex-wrap justify-center gap-2">
                {course.classes.map((classSchedule) => (
                    <ClassInfoCard key={classSchedule.classId} classSchedule={classSchedule} />
                ))}
            </div>
            
        </div>
  );
}

export default EditCourseInfo;