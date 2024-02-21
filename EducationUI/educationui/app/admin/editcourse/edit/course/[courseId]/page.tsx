import { getCourseById } from "@/Utilities/api";
import CourseCard from "@/app/components/CourseComponents/CourseCard";

import { Course } from "@/app/shared/types/sharedTypes";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const courseJson = await getCourseById(courseId);
    const course = courseJson as Course;

    return (
        <>
            <h1> CourseDetailPage {params.courseId}</h1>
            <CourseCard course={course} />
        </>
  );
}

export default CourseDetail;
