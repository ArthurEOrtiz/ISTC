import { getAllTopics } from '@/Utilities/api';
import { Topic } from '@/app/shared/types/sharedTypes';
import { useEffect, useState } from 'react';

interface SelectTopicModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (topics: Topic[]) => void;
    topics: Topic[]; // Topics from AddCourseComponent
}

const SelectTopicModal: React.FC<SelectTopicModalProps> = ({ open, onClose, onSelect, topics: preselectedTopics }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>(preselectedTopics); // Initialize with preselected topics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                const responseData = await getAllTopics();
                setTopics(responseData);
            } catch (error) {
                setError('Failed to fetch topics');
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchTopics();
        }
    }, [open]);

    const toggleTopicSelection = (topic: Topic) => {
        const isSelected = selectedTopics.some((selectedTopic) => selectedTopic.topicId === topic.topicId);
        if (isSelected) {
            setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic.topicId !== topic.topicId));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleSelect = () => {
        onSelect(selectedTopics);
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 p-8 rounded-lg z-50">

                <h2 className="text-xl font-semibold mb-4">Select Topics</h2>
                
                {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p className="text-lg mb-4">Please select topics from the list below</p>

                        <ul className="mb-4">

                            {topics.map((topic) => (
                                <li key={topic.topicId} className="mb-2">
                                    <button
                                        className={`w-full text-left p-2 rounded border ${selectedTopics.some((selectedTopic) => selectedTopic.topicId === topic.topicId) ? "bg-green-500" : ""}`}
                                        onClick={() => toggleTopicSelection(topic)}
                                    >
                                        {topic.title}
                                    </button>
                                </li>
                            ))}
                            
                        </ul>
                    </>
                )}
                <div className="flex justify-between">
                    <button onClick={handleSelect} className="btn btn-primary text-white px-4 py-2 mr-2">Select</button>
                    <button onClick={onClose} className="btn btn-ghost dark:text-white px-4 py-2">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SelectTopicModal;
