import { getCourseById } from "@/Utilities/api";
import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const courseJson = await getCourseById(courseId);
    const course = courseJson as Course;

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
        </div>
  );
}

export default CourseDetail;