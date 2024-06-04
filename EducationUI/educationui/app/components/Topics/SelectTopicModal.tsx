import { getAllTopics } from '@/Utilities/api';
import { Topic } from '@/app/shared/types/sharedTypes';
import { useEffect, useState } from 'react';

interface SelectTopicModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (topics: Topic[]) => void;
    topics: Topic[];
}

const SelectTopicModal: React.FC<SelectTopicModalProps> = ({ open, onClose, onSelect, topics: preselectedTopics }) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>(preselectedTopics); // Initialize with preselected topics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // New state for the search term

    useEffect(() => {
        const fetchTopics = async () => {
           setLoading(true);
           const response = await getAllTopics();
           if (response.status === 200) {
               setTopics(response.data);
            } else {
                setError(`Failed to fetch topics \n ${response}`);
            }
            setLoading(false);
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

    // Filter the topics based on the search term
    const filteredTopics = topics.filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 p-8 rounded-lg z-50">
                
                <div className="flex items-baseline justify-between mb-4">
                    <h1 className="text-2xl font-bold">Select Topics</h1>
                    <button onClick={onClose} className="text-3xl text-error font-bold">&times;</button>
                </div>

                
                
                {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                ) : error ? (
                    <p className='text-error'>{error}</p>
                ) : (
                    <div className=''>
                        <p className="text-lg mb-4">Please select topics from the list below</p>
                        <div className="mb-4">
                            <label className="input input-bordered flex items-center gap-2">
                                <input 
                                    type="text"
                                    className="grow"
                                    placeholder="Search" 
                                    onChange={(e) => {setSearchTerm(e.target.value)}}
                                />
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 16 16" 
                                    fill="currentColor" 
                                    className="w-4 h-4 opacity-70">
                                        <path 
                                        fillRule="evenodd" 
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" 
                                        clipRule="evenodd" 
                                        />
                                </svg>
                            </label>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold">Selected Topics</p>
                            <hr className='mb-2'></hr>
                            <ul className="mb-4">
                                {selectedTopics && selectedTopics.length > 0 ? (
                                    selectedTopics.map((selectedTopic) => (
                                        <li key={selectedTopic.topicId} className="mb-2">
                                            <button
                                                className="w-full text-left p-2 rounded border bg-green-500"
                                                onClick={() => toggleTopicSelection(selectedTopic)}
                                            >
                                                {selectedTopic.title}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="mb-2">
                                        <button
                                            className="w-full text-left p-2 rounded border bg-error"
                                        >
                                            None
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold">Available Topics</p>
                            <hr className='mb-2'></hr>
                        </div>
                        
                        <div className='overflow-auto h-64 w-full mb-4'>
                            <ul className="mb-4 p-2">
                                {filteredTopics.map((topic) => ( // Use the filtered topics here
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
                        </div>
                    </div>
                )}
                <div className="flex justify-between">
                    <button onClick={handleSelect} className="btn btn-primary text-white px-4 py-2 mr-2">Apply Selection</button>
                </div>
            </div>
        </div>
    );
}

export default SelectTopicModal;