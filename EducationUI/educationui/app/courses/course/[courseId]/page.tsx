import { getCourseById } from "@/Utilities/api";
import CourseCard from "@/app/components/Course/EditCourseCard";
import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const courseJson = await getCourseById(courseId);
    const course = courseJson as Course;



    return (
        <div>
            <CourseCard 
                course={course}
                viewOnly={true}
                />
        </div>
  );
}

export default CourseDetail;