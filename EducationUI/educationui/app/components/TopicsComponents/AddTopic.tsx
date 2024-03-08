'use client';
import { Topic } from "@/app/shared/types/sharedTypes"
import NewTopicForm from "./NewTopicForm"
import { useState } from "react";
import TopicInfoCard from "./TopicInfoCard";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import { useRouter } from "next/navigation";
import SavingModal from "../SavingModal";
import { postTopic } from "@/Utilities/api";

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
            await postTopic(topic);
        }
        catch (error) {
            throw error;
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