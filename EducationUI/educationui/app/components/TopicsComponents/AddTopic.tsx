'use client';
import { Topic } from "@/app/shared/types/sharedTypes"
import NewTopicForm from "./NewTopicForm"
import { useState } from "react";
import TopicInfoCard from "./TopicInfoCard";
import axios from 'axios';
import ConfirmationModal from "../ConfirmationModal";
import { useRouter } from "next/navigation";
import SavingModal from "../SavingModal";

const AddTopic: React.FC = () => {
    const [topic, setTopic] = useState<Topic>();
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router = useRouter();

    const handleSaveTopic = () => {
        setShowConfirmationModal(true);
    }

    const handleConfirmationModalOnConfirm = async () => {

        setIsSaving(true);

        try {
            setShowConfirmationModal(false);
            await saveTopicAsync();
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            router.push('/admin/edittopics/edit');
            setIsSaving(false);
        }

    }

    const handleNewTopicFormOnSubmit = (topic: Topic) => {
        setTopic(topic);
    }

    const handleTopicInfoCardOnApply = (topic: Topic)=> {
        setTopic(topic);
    }

    // Helper Methods 

    const saveTopicAsync = async () => {
        try {
            const response = await axios.post('https://localhost:7144/Topic/PostTopic', topic);

            if (response.status !== 201) {
                throw new Error(`Error saving topic. Status: ${response.status} - ${response.statusText}`);
            }

            console.log(response.data);
         } catch (error) {
            throw new Error(`${error}`);
       }
    }

    return (
        <>
            {topic === undefined ? (
                <NewTopicForm onSubmit={ handleNewTopicFormOnSubmit} />
            ): (
                <>
                    <TopicInfoCard topic={topic} onApply={handleTopicInfoCardOnApply} />
                    <button 
                        onClick={handleSaveTopic}
                        className="btn btn-primary text-white mt-4"
                    >
                        Save Topic
                    </button>
                </>
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title={"Save Topic"}
                    message={"Are you sure you want to save this topic?"}
                    onConfirm={handleConfirmationModalOnConfirm}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            )}

            {isSaving && (
                <SavingModal text={"Saving Topic..."} />
            )}
        </>

       
    );
}

export default AddTopic