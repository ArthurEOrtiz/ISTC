import { User } from "@/app/shared/types/sharedTypes";

interface UserEnrolledCoursesProps {
    user: User;
}

const UserEnrolledCourses: React.FC<UserEnrolledCoursesProps> = ({user}) => { 
    console.log(user);
    return (
        <div className='bg-base-100 shadow-md rounded-xl p-4 w-full'>
            <h1 className='text-2xl text-center font-bold'>Enrolled Courses</h1>
        </div>
    );
}

export default UserEnrolledCourses;