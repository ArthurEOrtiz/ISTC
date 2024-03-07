import { Course, Topic } from "@/app/shared/types/sharedTypes";
import { useState } from "react";
import CharacterCounter from "../CharacterCounter";
import SelectTopicModal from "../TopicsComponents/SelectTopicModal";

interface CourseCardProps {
    course : Course; 
    onApply: (course: Course) => void;
};


const CourseInfoCard : React.FC<CourseCardProps> = ({course, onApply}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<Course>(course);
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);

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

    const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow only arrow keys
        if (!(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab" || e.key === "Backspace" || e.key === "Delete" || e.key === "Enter" || e.key === "Escape" || e.key === "Home" || e.key === "End" )) {
            e.preventDefault();
        }
    };

    const handleCancel = () => {
        setEditCourse(course);
        setEditMode(false);
    }

    const handleEditTopics = () => {
        setShowSelectTopicModal(true);
    };

    const handleSelectTopicModalClose = () => {
        setShowSelectTopicModal(false);
    };

    const handleSelectTopicaModalSelect = (topics: Topic[]) => {
        setEditCourse((prevEditCourse) => ({
            ...prevEditCourse,
            topics: topics,
        }));
        setShowSelectTopicModal(false);
    };
    
    const toggleEditMode = () => {
        setEditMode(prevEditMode => !prevEditMode);
        if (!editMode) {
            setEditCourse(course);
        }

        if (editMode) {
            //console.log(editCourse);
            onApply(editCourse);
        }
    }

    const formatEnrollmentDeadline = (enrollmentDeadline: string | undefined | null): string => {
        if (!enrollmentDeadline) return '';
    
        const utcDate = new Date(enrollmentDeadline);
    
        if (isNaN(utcDate.getTime())) {
            throw new Error('Invalid date format');
        }
    
        return utcDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });
    };
    

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return ''; // Handle case when dateString is undefined
    
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
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

                <div className="mb-4 mt-1">

                    <strong>Description: </strong> 

                    {editMode ?
                        <>
                            <textarea
                                name="description"
                                maxLength = {255}
                                defaultValue={editCourse?.description}
                                onChange={handleTextAreaChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            <CharacterCounter value={editCourse.description} limit={255} />
                        </>
                        : course?.description}
                </div>

                <div className="mb-4">

                    <strong>Topics: </strong> 

                    {editCourse?.topics?.map((topic, index) => (
                        <span key={index}>
                            {topic.title}
                            {index !== (editCourse?.topics?.length ?? 0) - 1 && ', '}
                        </span>
                    ))}

                    {editMode ?
                        <button
                            className="btn btn-xs btn-primary text-white ml-4"
                            onClick={handleEditTopics}>
                                ...Edit Topics
                        </button>
                        : ''}

                </div>

            </div>

            <div className="flex flex-wrap -mx-1">
                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Instructor:</strong> {editMode ?
                        <input
                            type="text"
                            name="instructorName"
                            maxLength={50}
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
                            type="number"
                            name="attendanceCredit"
                            min={0}
                            max={editCourse?.completionCredit}
                            defaultValue={editCourse?.attendanceCredit}
                            onChange={handleInputChange}
                            onKeyDown={handleNumericInput}
                            className="border border-gray-300 rounded"
                        />
                        : course?.attendanceCredit}</p>
                </div>

                <div className="w-full sm:w-1/2 px-1 mb-2">
                    <p><strong>Completion Credit:</strong> {editMode ?
                        <input
                            type="number"
                            name="completionCredit"
                            min={course?.attendanceCredit}
                            max={100}
                            defaultValue={editCourse?.completionCredit}
                            onChange={handleInputChange}
                            onKeyDown={handleNumericInput}
                            className="border border-gray-300 rounded" />
                            : course?.completionCredit}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Max Attendance:</strong> {editMode ?
                        <input
                            type="number"
                            name="maxAttendance"
                            defaultValue={editCourse?.maxAttendance}
                            onChange={handleInputChange}
                            onKeyDown={handleNumericInput}
                            className="border border-gray-300 rounded"/>
                            : course?.maxAttendance}</p>
                </div>
                <div className="w-full sm:w-1/2  px-1 mb-2">
                    <p><strong>Enrollment Deadline:</strong> {editMode ?
                        <input
                            type="date"
                            name="enrollmentDeadline"
                            defaultValue={formatDate(editCourse?.enrollmentDeadline)}
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
                            : course?.location?.room}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Remote Link:</strong> {editMode ? 
                        <input
                            type="url"
                            name="locationUrl"
                            defaultValue={editCourse?.location?.remoteLink || ''}
                            onChange={(e)=> handleLocationInputChange(e, "remoteLink")}
                            className="border border-gray-300 rounded w-1/2" />
                            : course?.location?.remoteLink}</p>
                </div>
                <div className="w-full px-1 mb-2">
                    <p><strong>Address Line 1:</strong> {editMode ?
                        <input
                            type="text"
                            name="locationAddressLine1"
                            maxLength={50}
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
                            maxLength={50}
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
                            maxLength={50}
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
                            maxLength={50}
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
                            maxLength={10}
                            defaultValue={editCourse?.location?.postalCode}
                            onChange={(e) => handleLocationInputChange(e, "postalCode")}
                            onKeyDown={handleNumericInput}
                            className="border border-gray-300 rounded" />
                            : course?.location?.postalCode}</p>
                </div>
            </div>
            <button 
                className="btn btn-primary text-white m-1"
                onClick={toggleEditMode}>
                    {editMode ? 'Apply' : 'Edit'}
            </button>

            {editMode &&(
                <button
                    className="btn btn-warning text-white m-1"
                    onClick={handleCancel}>
                        Cancel
                </button>
            )}

            {showSelectTopicModal && (
                <SelectTopicModal
                    open={showSelectTopicModal}
                    onClose={handleSelectTopicModalClose}
                    onSelect={(topics: Topic[]) => {handleSelectTopicaModalSelect(topics)}}
                    topics={editCourse?.topics || []}
                />
            )}

        </div>

        

    );
}

export default CourseInfoCard;