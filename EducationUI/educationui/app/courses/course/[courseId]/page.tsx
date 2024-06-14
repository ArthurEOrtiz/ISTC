import { getCourseById, GetUserByClerkId } from "@/Utilities/api";
import UserCourseInfo from "@/app/components/Course/UserCourseInfo";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { currentUser } from "@clerk/nextjs/server";

const CourseDetail: React.FC<{ params: { courseId: string } }> = async ({ params }) => {
    const courseId = parseInt(params.courseId);
    const clerkUser = await currentUser();

    const getCourse = async (courseId: number) => {
        'use server'
        const response = await getCourseById(courseId);
        if (response.status === 200) {
            return response.data as Course;
        } else {
            throw new Error("Error fetching course!");
        }
    }

    const course: Course | null = await getCourse(courseId);
    
    const getUser = async (clerkId: string | undefined) => {
        'use server';
        if (clerkId === undefined) {
            return null;
        }
        const response = await GetUserByClerkId(clerkId);
        if (response.status === 200) {
            return response.data as User;
        } else {
            throw new Error("Error fetching user");
        }
    }

    const user: User | null = await getUser(clerkUser?.id);

   return (
        <UserCourseInfo course={course} user={user} />
   );
}

export default CourseDetail;