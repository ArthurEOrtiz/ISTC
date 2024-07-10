'use client';
import { Topic } from "@/app/shared/types/sharedTypes"
import TopicForm from "./TopicForm"
import { useState } from "react";
import TopicInfoCard from "./TopicInfoCard";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import { useRouter } from "next/navigation";
import SavingModal from "../../shared/modals/SavingModal";
import { postTopic } from "@/Utilities/api";

const AddTopic: React.FC = () => {
    const defaultTopic: Topic = {
        topicId: 0,
        title: "",
        description: null,
        courses: []
    }

    const [topic, setTopic] = useState<Topic>(defaultTopic);
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
            router.push('/admin/topics/edit');
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
        <div className='w-1/2'>
            {topic.title === '' ? (
                <div className='bg-base-100 shadow-md rounded-xl '>
                    <TopicForm onSubmit={ handleNewTopicFormOnSubmit} topic={topic} />
                </div>
                
            ): (
                <div>
                    <TopicInfoCard topic={topic} onApply={handleTopicInfoCardOnApply} />
                    <button 
                        onClick={handleSaveTopic}
                        className="btn btn-primary text-white mt-4"
                    >
                        Save Topic
                    </button>
                </div>
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title={"Save Topic"}
                    message={"Are you sure you want to save this topic?"}
                    isOpen={showConfirmationModal}
                    onConfirm={handleConfirmationModalOnConfirm}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            )}

            {isSaving && (
                <SavingModal text={"Saving Topic..."} />
            )}
        </div>

       
    );
}

export default AddTopic