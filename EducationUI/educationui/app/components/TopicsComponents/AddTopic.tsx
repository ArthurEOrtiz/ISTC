'use client';
import { Topic } from "@/app/shared/types/sharedTypes"
import NewTopicForm from "./NewTopicForm"
import { useState } from "react";
import TopicInfoCard from "./TopicInfoCard";

const AddTopic: React.FC = () => {
    const [topic, setTopic] = useState<Topic>();

    const handleNewTopicFormOnSubmit = (topic: Topic) => {
        setTopic(topic);
    }

    const handleTopicInfoCardOnApply = (topic: Topic)=> {
        setTopic(topic);
    }

    return (
        <>
            {topic === undefined ? (
                <NewTopicForm onSubmit={ handleNewTopicFormOnSubmit} />
            ): (
                <>
                    <TopicInfoCard topic={topic} onApply={handleTopicInfoCardOnApply} />
                </>
            )}
        </>

       
    );
}

export default AddTopic