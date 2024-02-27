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
    };

    const handleLocationInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        parentKey: keyof Course['location']
    ) => {
        const { name, value } = e.target;
        
        setEditCourse((prevEditCourse) => ({
            ...prevEditCourse,
            location: {
                ...prevEditCourse.location,
                [parentKey]: value,
            },
        }));
    };
    

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
                <h1 className="text-xl font-bold"> {editMode ?
                    <input
                        type="text"
                        name="title"
                        defaultValue={editCourse?.title}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded"
                
                    /> : course?.title}</h1>

                <p><strong>Description:</strong> {editMode ?
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
                    <p><strong>Instructor:</strong> {editMode ?
                        <input
                            type="text"
                            name="instructorName"
                            defaultValue={editCourse?.instructorName}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : course?.instructorName}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Email:</strong> {editMode?
                        <input
                            type="email"
                            name="instructorEmail"
                            defaultValue={editCourse?.instructorEmail}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : course?.instructorEmail}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Attendance Credit:</strong> {editMode ?
                        <input
                            type="text"
                            name="attendanceCredit"
                            defaultValue={editCourse?.attendanceCredit}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : course?.attendanceCredit}</p> 
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Completion Credit:</strong> {editMode ?
                        <input
                            type="text"
                            name="completionCredit"
                            defaultValue={editCourse?.completionCredit}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded" />
                            : course?.completionCredit}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Max Attendance:</strong> {editMode ?
                        <input
                            type="text"
                            name="maxAttendance"
                            defaultValue={editCourse?.maxAttendance}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : course?.maxAttendance}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Enrollment Deadline:</strong> {editMode ?
                        <input
                            type="date"
                            name="enrollmentDeadline"
                            defaultValue={editCourse?.enrollmentDeadline}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : formatEnrollmentDeadline(course?.enrollmentDeadline)}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>PDF:</strong> {editMode ?
                        <input
                            type="text"
                            name="pdf"
                            defaultValue={editCourse?.pdf}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded"/>
                            : course?.pdf}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Location:</strong> {editMode ? 
                        <input
                            type="text"
                            name="locationDescription"
                            defaultValue={editCourse?.location?.description}
                            onChange={(e) => handleLocationInputChange(e, 'description')}
                            className="border border-gray-300 rounded w-1/2"/>
                            : course?.location?.description}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Room:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationRoom"
                            defaultValue={editCourse?.location?.room}
                            onChange={(e) => handleLocationInputChange(e, "room")}
                            className="border border-gray-300 rounded"/>
                            : course?.location?.description}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Remote Link:</strong> {editMode ? 
                        <input
                            type="url"
                            name="locationUrl"
                            defaultValue={editCourse?.location?.remoteLink}
                            onChange={(e)=> handleLocationInputChange(e, "remoteLink")}
                            className="border border-gray-300 rounded w-1/2" />
                            : course?.location?.remoteLink}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Address Line 1:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationAddressLine1"
                            defaultValue={editCourse?.location?.addressLine1}
                            onChange={(e) => handleLocationInputChange(e, "addressLine1")}
                            className="border border-gray-300 rounded w-1/2" />
                            : course?.location?.addressLine1}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Address Line 2:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationAddressLine2"
                            defaultValue={editCourse?.location?.addressLine2}
                            onChange={(e) => handleLocationInputChange(e, "addressLine2")}
                            className="border border-gray-300 rounded w-1/2" />
                            : course?.location?.addressLine2}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>City:</strong> {editMode ?
                        <input 
                            type="text"
                            name="locationCity"
                            defaultValue={editCourse?.location?.city}
                            onChange={(e) => handleLocationInputChange(e, "city")}
                            className="border border-gray-300 rounded" />
                            : course?.location?.city}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>State:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationState"
                            defaultValue={editCourse?.location?.state}
                            onChange={(e) => handleLocationInputChange(e, "state")}
                            className="border border-gray-300 rounded" />
                            : course?.location?.state}</p>
                </div>
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Zip:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationZip"
                            defaultValue={editCourse?.location?.postalCode}
                            onChange={(e) => handleLocationInputChange(e, "postalCode")}
                            className="border border-gray-300 rounded" />
                            : course?.location?.postalCode}</p>
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