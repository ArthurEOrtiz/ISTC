'use client';
import { Topic } from "@/app/shared/types/sharedTypes";
import TopicInfoCard from "./TopicInfoCard";
import { updateTopicById } from "@/Utilities/api";
import { useState } from "react";


interface TopicListProps {
    topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
    const [topicList, setTopicList] = useState<Topic[]>(topics);

    const handleTopicInfoCardOnApply = async(topic: Topic) => {
        console.log("   Topic:", topic);
        try {
            const response = await updateTopicById(topic.topicId, topic);
            console.log("Response:", response);

            const index = topicList.findIndex( topic => topic.topicId === response.topicId);
            if (index !== -1) {
                const newTopicList = [...topicList];
                newTopicList[index] = response;
                setTopicList(newTopicList);
            } else {
                console.error("Topic not found in list");
            }
        } catch (error) {
            console.error("Error updating topic:", error);
        }
       
       
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {topicList.map((topic, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">
                    <TopicInfoCard topic={topic} onApply={handleTopicInfoCardOnApply}/>
                </div>
            ))}
        </div>
    );
};

export default TopicList;
