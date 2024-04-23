'use client';
import { useState } from "react";
import { Topic } from "@/app/shared/types/sharedTypes";
import TopicInfoCard from "./TopicInfoCard";
import { deleteTopicById, updateTopicById } from "@/Utilities/api";

interface TopicListProps {
    topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
    const [topicList, setTopicList] = useState<Topic[]>(topics);

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

    const handleTopicInfoCardOnDelete = async (topicId: number) => { 
        try {
            await deleteTopicById(topicId);
        } catch (error) {
            throw error;
        } finally {
            const newTopicList = topicList.filter(topic => topic.topicId !== topicId);
            setTopicList(newTopicList);
        }
    }

    return (
        
        <div className="flex flex-wrap justify-center gap-4 p-4">
            
            {topicList.map((topic, index) => (
                <div key={index} className="card w-full">
                    <label className="flex items-center">
                        <TopicInfoCard 
                            topic={topic} 
                            onApply={handleTopicInfoCardOnApply} 
                            onDelete={handleTopicInfoCardOnDelete}
                        />
                    </label>
                </div>
            ))}

        {/* <button
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
        </button> */}
        </div>
    );
};

export default TopicList;
