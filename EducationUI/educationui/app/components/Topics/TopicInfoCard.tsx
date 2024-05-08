import { Course, Topic } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";
import CharacterCounter from "../../shared/CharacterCounter";
import { getCoursesByTopicId } from "@/Utilities/api";
import SelectCourseModal from "../Course/SelectCourseModal";

interface TopicInfoCardProps {
    topic: Topic;
    onApply: (topic: Topic) => void;
    onDelete?: (topicId : number) => void;
}

const TopicInfoCard: React.FC<TopicInfoCardProps> = ({ topic, onApply, onDelete }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editTopic, setEditTopic] = useState<Topic>(topic);
    const [courses, setCourses] = useState<Course[]>([]);
    const [showSelectCourseModal, setShowSelectCourseModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
    
            if (topic.topicId === 0) return setCourses([]);
            
            setLoading(true);
            try {
                const responseData = await getCoursesByTopicId(topic.topicId);
                setCourses(responseData);
            } catch (error) {
                console.error("Error fetching courses by topic id: ", error);
            } finally {
                setLoading(false);
            }

        };
        fetchData();
    }, [topic]);
    
    // Handlers
    const handleSelectCourseModalOnSelect = (selectedCourses: Course[]) => {
        setShowSelectCourseModal(false);
        setCourses(selectedCourses); // This is not working.
        setEditTopic({ ...editTopic, courses: selectedCourses }); // This is working.
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevents the default behavior of the event
        setEditMode(false);
        setEditTopic(topic);
    }

    const handleDelete = () => {
        if (onDelete && topic.topicId && topic.topicId !== 0) {
            onDelete(topic.topicId);
        }
    }

    const handleApplyEdit = () => {
        console.log("Applying edit");
        console.log("Applying edit: editMode: ", editMode);
        if (editMode) {
            setEditMode(false);
            onApply(editTopic);
        } else {
            setEditMode(true);
        }
    }

    return (
        <div className="bg-base-100 shadow-md rounded-xl p-3 w-full">

            <div className="flex justify-between">
            
                <h1 className="text-xl font-bold"> {editMode ? 
                    <input
                        type="text"
                        name = "title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        maxLength={50}
                        defaultValue={editTopic.title}
                        onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                    /> : topic.title}
                </h1>
                
                {topic.topicId != 0 && (
                    <div className="flex items-center">
                        <label
                            className="text-1xl font-bold mr-1"
                            htmlFor="topicId">
                                Topic Id:
                        </label> 
                        <p id="topicId" className="text-base">
                            {topic.topicId}
                        </p>
                    </div>
                    )
                }

            </div>
            
            <div className="m-2">

                <strong>Description: </strong> 

                {editMode ?
                    <>
                        <textarea
                            name="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                            maxLength={500}
                            defaultValue={editTopic.description|| ''}
                            onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                        />
                        <CharacterCounter value={editTopic.description ?? ''} limit={500} />
                    </>

                : topic.description}

            </div>

            <div>
            {topic.topicId !== 0 ? (
                    <>
                        <strong>Courses: </strong>
                        {courses.length > 0 ? (
                            <div className="m-2">
                                {loading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <div className="flex flex-wrap">
                                        {courses.map((course, index) => (
                                            <div key={index} className="mr-2">
                                                <div className="badge badge-info p-3">
                                                    <p className="font-bold text-white">{course.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="badge badge-error p-3 mr-2">
                                <p className="font-bold text-white">None</p>
                            </div>
                        )}
                        {editMode ? (
                            <button
                                className="btn btn-primary text-white btn-xs"
                                onClick={() => setShowSelectCourseModal(true)}
                            >
                                Edit Courses...
                            </button>
                        ) : null}
                    </>
                ) : null}
            </div>
            
            <button
                onClick={handleApplyEdit}
                className="btn btn-primary text-white mt-4"
            >
                {editMode ? "Apply" : "Edit"}
            </button>

            {editMode && (
                <button
                    onClick={handleCancel}
                    className="btn btn-warning text-white mt-4 ml-2"
                >
                    Cancel
                </button>
            )}

            {editMode && topic.topicId !== 0  && (
                <button
                    onClick={handleDelete}
                    className="btn btn-error text-white mt-4 ml-2"
                >
                    Delete
                </button>
            )}

            {/* <button 
                onClick={() => console.log("Test Courses: ", courses)}
                className="btn btn-primary text-white mt-4 ml-2"
            >
                Test Courses
            </button>

            <button
                onClick={() => console.log("Edit Topic: ", editTopic)}
                className="btn btn-primary text-white mt-4 ml-2">
                Test Edit Topic
            </button> */}

            {showSelectCourseModal && (
                <SelectCourseModal 
                    open={showSelectCourseModal}
                    onClose={() => setShowSelectCourseModal(false)}
                    onSelect={(selectedCourses) => {handleSelectCourseModalOnSelect(selectedCourses)}}
                    courses = {courses? courses : []}
                />
            )}
        </div>
    );
};

export default TopicInfoCard