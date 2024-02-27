import { getCourseById } from "@/Utilities/api";
import EditCourseInfo from "@/app/components/CourseComponents/EditCourseInfo";
import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    let course: Course;
    try {
        const courseJson = await getCourseById(courseId);
        course = courseJson as Course;
    } catch (error) {
        throw new Error("Error Fetching Course Data");
    }

    return (
        <>
            <EditCourseInfo course={course} />
        </>
  );
}

export default CourseDetail;
