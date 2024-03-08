import { Course, Topic } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";
import CharacterCounter from "../CharacterCounter";
import { getCoursesByTopicId } from "@/Utilities/api";
import SelectCourseModal from "../CourseComponents/SelectCourseModal";

interface TopicInfoCardProps {
    topic: Topic;
    onApply: (topic: Topic) => void;
}

const TopicInfoCard: React.FC<TopicInfoCardProps> = ({ topic, onApply }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editTopic, setEditTopic] = useState<Topic>(topic);
    const [courses, setCourses] = useState<Course[]>([]);
    const [showSelectCourseModal, setShowSelectCourseModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (topic.topicId === 0) return setCourses([]);
            const responseData = await getCoursesByTopicId(topic.topicId);
            setCourses(responseData);
        };
        fetchData();
    }, [topic]);

    const toggleEditMode = () => {
        
        setEditMode(!editMode);

        if (!editMode) {
            setEditTopic(topic);
        }

        if (editMode) {
            onApply(editTopic);
        }
    };

    const handleSelectCourseModalOnSelect = (selectedCourses: Course[]) => {
        setCourses(selectedCourses);
        setEditTopic({ ...editTopic, courses: selectedCourses });
        setShowSelectCourseModal(false);
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-3 w-full">

            <div className="flex justify-between">
            
                <h1 className="text-xl font-bold"> {editMode ? 
                    <input
                        type="text"
                        name = "title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                <strong>Description:</strong> 

                {editMode ?
                    <>
                        <textarea
                            name="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                            maxLength={255}
                            defaultValue={editTopic.description}
                            onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                        />
                        <CharacterCounter value={editTopic.description} limit={255} />
                    </>

                : topic.description}

            </div>

            {topic.topicId != 0 && (
                <div className="m-2">
                    <strong>Courses: </strong>

                    <ul>
                        {courses.map((course, index) => (
                            <li key={index}>{course.title}</li>
                        ))}
                    </ul>
                
                    { editMode ? (
                    <button
                        className="btn btn-primary text-white btn-xs"
                        onClick={() => setShowSelectCourseModal(true)}
                    >
                        Edit Courses...
                    </button>
                    ) : null
                    }
                
                </div>
                )}
            
            

            <button
                onClick={toggleEditMode}
                className="btn btn-primary text-white mt-4"
            >
                {editMode ? "Apply" : "Edit"}
            </button>

            <button 
                onClick={() => console.log("Test Courses: ", courses)}
                className="btn btn-primary text-white mt-4 ml-2"
            >
                Test Courses
            </button>

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