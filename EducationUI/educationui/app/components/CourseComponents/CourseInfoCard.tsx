import { Course } from "@/app/shared/types/sharedTypes";

interface CourseCardProps {
    course : Course; 
};


const CourseInfoCard : React.FC<CourseCardProps> = ({course}) => {
    return(
        <div className="bg-white shadow-md rounded-md p-4">
            <div className="mb-2">
                <h1 className="text-xl font-bold">{course?.title}</h1>
                <p><strong>Description:</strong> {course?.description}</p>
            </div>
            <div className="flex flex-wrap -mx-1">
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Instructor:</strong> {course?.instructorName}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Email:</strong> {course?.instructorEmail}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Attendance Credit:</strong> {course?.attendanceCredit}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Completion Credit:</strong> {course?.completionCredit}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Max Attendance:</strong> {course?.maxAttendance}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Enrollment Deadline:</strong> {course?.enrollmentDeadline}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>PDF:</strong> {course?.pdf}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Location:</strong> {course?.location?.description}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Room:</strong> {course?.location?.room}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Remote Link:</strong> {course?.location?.remoteLink}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Address Line 1:</strong> {course?.location?.addressLine1}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Address Line 2:</strong> {course?.location?.addressLine2}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>City:</strong> {course?.location?.city}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>State:</strong> {course?.location?.state}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Zip:</strong> {course?.location?.postalCode}</p>
                </div>
            </div>
        </div>
    );
}

export default CourseInfoCard;