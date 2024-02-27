import { Course } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface CourseCardProps {
    course : Course; 
};


const CourseInfoCard : React.FC<CourseCardProps> = ({course}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<Course>(course);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const toggleEditMode = () => {
        setEditMode(prevEditMode => !prevEditMode);
        if (!editMode) {
            setEditCourse(course);
        }

        if (editMode) {
            // Save the course
            console.log(editCourse);
        }
    }

    const formatEnrollmentDeadline = (enrollmentDeadline: string | undefined | null): string => {
        if (!enrollmentDeadline) return ''; // Handle case when enrollmentDeadline is undefined or null
    
        const deadlineDate = new Date(enrollmentDeadline);
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return deadlineDate.toLocaleDateString('en-US', options);
    };
    
    

    return(
        <div className="bg-white shadow-md rounded-xl p-4">

            <div className="mb-2">
                <h1 className="text-xl font-bold">{editMode ?
                    <input
                        type="text"
                        name="title"
                        defaultValue={editCourse?.title}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded"
                
                    /> : course?.title}</h1>

                <p><strong>Description:</strong>{editMode ?
                    <textarea
                        name="description"
                        defaultValue={editCourse?.description}
                        onChange={handleTextAreaChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        : course?.description}</p>

            </div>

            <div className="flex flex-wrap -mx-1">
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Instructor:</strong></p>
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
                    <p><strong>Enrollment Deadline:</strong> {formatEnrollmentDeadline(course?.enrollmentDeadline)}</p>
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
            <button 
                className="btn btn-primary text-white m-1"
                onClick={toggleEditMode}>
                    {editMode ? 'Save' : 'Edit'}
            </button>
        </div>
    );
}

export default CourseInfoCard;