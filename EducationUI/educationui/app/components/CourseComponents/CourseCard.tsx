import { CourseFormData } from "@/app/shared/types/sharedTypes";

interface CourseCardProps {
    courseFormData: CourseFormData | null;  
};


const CourseCard : React.FC<CourseCardProps> = ({courseFormData}) => {
    return(
        <div className="bg-white shadow-md rounded-md p-4">
            <div className="mb-2">
                <h1 className="text-xl font-bold">{courseFormData?.title}</h1>
                <p><strong>Description:</strong> {courseFormData?.description}</p>
            </div>
            <div className="flex flex-wrap -mx-1">
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Instructor:</strong> {courseFormData?.instructorName}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Email:</strong> {courseFormData?.instructorEmail}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Attendance Credit:</strong> {courseFormData?.attendanceCredit}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Completion Credit:</strong> {courseFormData?.completionCredit}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Max Attendance:</strong> {courseFormData?.maxAttendance}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Enrollment Deadline:</strong> {courseFormData?.enrollmentDeadline}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>PDF:</strong> {courseFormData?.pdf}</p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;