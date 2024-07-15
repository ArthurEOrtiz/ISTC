import { getCourseById, GetUserByClerkId } from "@/Utilities/api";
import CourseInfo from "@/app/components/Course/CourseInfo";
import Loading from "@/app/shared/Loading";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { auth } from "@clerk/nextjs";
//import { currentUser } from "@clerk/nextjs/server";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const { userId: clerkId } = auth();

    const courseResponse = await getCourseById(courseId);

    if (courseResponse.status !== 200) {
        throw new Error("Error fetching course!");
    }

    const course = courseResponse.data as Course;

    const userResponse = clerkId ? await GetUserByClerkId(clerkId) : null;

    if (userResponse && userResponse.status !== 200) {
        throw new Error("Error fetching user");
    }

    const user = userResponse ? userResponse.data as User : null;

    if (!course) {
        return <Loading />;
    } 
    
    return (
        <CourseInfo course={course} user={user} />
    );
}

export default CourseDetail;