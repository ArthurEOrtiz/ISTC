'use client';
import { Topic } from "@/app/shared/types/sharedTypes"
import NewTopicForm from "./NewTopicForm"

const AddTopic: React.FC = () => {
    const handleNewTopicFormOnSubmit = (topic: Topic) => {
        console.log(topic)
    }

    return (
        <NewTopicForm onSubmit={ handleNewTopicFormOnSubmit} />
        );
}

export default AddTopic