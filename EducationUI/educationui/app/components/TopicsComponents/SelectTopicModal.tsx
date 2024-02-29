import axios from 'axios';
import { useEffect, useState } from 'react';

interface SelectTopicModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (topic: Topic) => void;
}

const SelectTopicModal: React.FC<SelectTopicModalProps> = ({ open, onClose, onSelect }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://localhost:7144/Topic/GetAllTopics');
                setTopics(response.data);
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

    const handleSelect = () => {
        if (selectedTopic) {
            onSelect(selectedTopic);
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg z-50">
                <h2 className="text-xl font-semibold mb-4">Select a Topic</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p className="text-lg mb-4">Please select a topic from the list below</p>
                        <ul className="mb-4">
                            {topics.map((topic) => (
                                <li key={topic.topicId} className="mb-2">
                                    <button
                                        className={`w-full text-left p-2 rounded border hover:bg-gray-100 ${selectedTopic?.topicId === topic.topicId ? "bg-gray-100" : ""}`}
                                        onClick={() => setSelectedTopic(topic)}
                                    >
                                        {topic.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <div className="flex justify-between">
                    <button onClick={handleSelect} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Select</button>
                    <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SelectTopicModal;
