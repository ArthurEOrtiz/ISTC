import { Topic } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface TopicInfoCardProps {
    topic: Topic;
    onApply: (topic: Topic) => void;
}

const TopicInfoCard: React.FC<TopicInfoCardProps> = ({ topic, onApply }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editTopic, setEditTopic] = useState<Topic>(topic);

    const toggleEditMode = () => {
        
        setEditMode(!editMode);

        if (!editMode) {
            setEditTopic(topic);
        }

        if (editMode) {
            onApply(editTopic);
        }
    };


    return (
        <div className="bg-white shadow-md rounded-xl p-3">
            <h1 className="text-xl font-bold"> {editMode ? 
                <input
                    type="text"
                    name = "title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={editTopic.title}
                    onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                /> : topic.title}</h1>
            <p><strong>Description:</strong> {editMode ?
                <textarea
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    defaultValue={editTopic.description}
                    onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                /> : topic.description} </p>
            <button
                onClick={toggleEditMode}
                className="btn btn-primary text-white mt-4"
            >
                {editMode ? "Apply" : "Edit"}
            </button>
        </div>
    );
};

export default TopicInfoCard