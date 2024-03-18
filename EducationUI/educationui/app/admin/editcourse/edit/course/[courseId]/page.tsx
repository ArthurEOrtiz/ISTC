import { getCourseById } from "@/Utilities/api";
import EditCourseInfo from "@/app/components/Course/EditCourseInfo";
import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const courseJson = await getCourseById(courseId);
    const course = courseJson as Course;

    return (
        <>
            <EditCourseInfo course={course} />
        </>
  );
}

export default CourseDetail;
