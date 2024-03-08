'use client';
import { useState } from "react";
import { Topic } from "@/app/shared/types/sharedTypes";
import TopicInfoCard from "./TopicInfoCard";
import { updateTopicById } from "@/Utilities/api";

interface TopicListProps {
    topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
    const [topicList, setTopicList] = useState<Topic[]>(topics);
    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

    const handleToggleSelect = (topicId: number) => {
        setSelectedTopics(prevSelected => {
            if (prevSelected.includes(topicId)) {
                return prevSelected.filter(id => id !== topicId);
            } else {
                return [...prevSelected, topicId];
            }
        });
    };

    const handleTopicInfoCardOnApply = async (topic: Topic) => {
        console.log(topic);
        try {
            const response = await updateTopicById(topic.topicId, topic);
            const index = topicList.findIndex(topic => topic.topicId === response.topicId);
            if (index !== -1) {
                const newTopicList = [...topicList];
                newTopicList[index] = response;
                setTopicList(newTopicList);
            } else {
                throw new Error("Topic not found in list");
            }
        } catch (error) {
           throw error
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {topicList.map((topic, index) => (
                <div key={index} className="card w-full">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedTopics.includes(topic.topicId as number)}
                            onChange={() => handleToggleSelect(topic.topicId as number)}
                            className="mr-2"
                        />
                        <TopicInfoCard topic={topic} onApply={handleTopicInfoCardOnApply} />
                    </label>
                </div>
            ))}

        <button
            className="btn btn-primary text-white"
            onClick={() => console.log(topics)}
        >
            Test Topics
        </button>

        <button
            className="btn btn-primary text-white"
            onClick={() => console.log(selectedTopics)}
        >
            Delete Selected Topics
        </button>

        <button
            className="btn btn-primary text-white"
            onClick={() => console.log(selectedTopics)}
        >
            Test Selected Courses
        </button>
        </div>
    );
};

export default TopicList;
