import { getCourseById } from "@/Utilities/api";
import ClassInfoCard from "@/app/components/CourseComponents/ClassInfoCard";
import CourseCard from "@/app/components/CourseComponents/CourseInfoCard";
import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const courseJson = await getCourseById(courseId);
    const course = courseJson as Course;
    console.log(course);

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            <h1 className="p-s text-3xl text-center font-bold"> Course Id: {params.courseId}</h1>
            <CourseCard course={course} />
            <div>
                {course.classes.map((classSchedule) => (
                    <div key={classSchedule.classId}>
                        <ClassInfoCard classSchedule={classSchedule} />
                    </div>
                ))}
            </div>
            
        </div>
  );
}

export default CourseDetail;
