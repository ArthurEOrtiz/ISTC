'use client';
import { useState } from "react";
import { Topic } from "@/app/shared/types/sharedTypes";
import TopicInfoCard from "./TopicInfoCard";
import { deleteTopicById, updateTopicById } from "@/Utilities/api";

interface TopicListProps {
    topics: Topic[];
    onError: (error: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, onError }) => {
    const [ topicList, setTopicList ] = useState<Topic[]>(topics);
    const [ searchString, setSearchString ] = useState<string>("");

    const handleTopicInfoCardOnApply = async (topic: Topic) => {
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
        } catch (error: any) {
           onError(error.message);
        }
    };

    const handleTopicInfoCardOnDelete = async (topicId: number) => { 

        try {
           const response = await deleteTopicById(topicId);
           if (response.status === 204) {
            const newTopicList = topicList.filter(topic => topic.topicId !== topicId);
            setTopicList(newTopicList);
           } else {
            throw new Error("Failed to delete topic");
           }
        } catch (error: any) {
            onError(error.message);
        } finally {
            
        }
    }

    return (
        
        <div className="space-y-2">
            
            {topicList.map((topic, index) => (
                <div key={index} className="card w-full">
                        <TopicInfoCard 
                            topic={topic} 
                            onApply={handleTopicInfoCardOnApply} 
                            onDelete={handleTopicInfoCardOnDelete}
                        />
                    
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
