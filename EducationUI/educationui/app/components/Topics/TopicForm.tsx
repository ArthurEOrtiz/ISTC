import { Topic } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";
import CharacterCounter from "../../shared/CharacterCounter";

interface NewTopicFormProps {
    onSubmit: (topic: Topic) => void;
    topic: Topic;
}

const TopicForm: React.FC<NewTopicFormProps> = ({ onSubmit, topic: inboundTopic }) => {
    const [topic, setTopic] = useState<Topic>(inboundTopic);
    const [isTitleValid, setIsTitleValid] = useState<boolean>(false);

    useEffect(() => {
        setIsTitleValid(!!topic.title);
    }
    , [topic.title]);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(topic);
    };

    return (
        <form onSubmit={handleOnSubmit} className="px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-col space-y-2">
                <label 
                    className="block text-sm font-bold mb-2"
                    htmlFor="title"
                    >
                        Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline resize-y"
                    type="text"
                    id="title"
                    value={topic.title || ""}
                    max={50}
                    onChange={(e) => setTopic({ ...topic, title: e.target.value })}
                />
                <p className="text-xs text-error italic">Required</p>
            </div>
            <div className="flex flex-col space-y-2 mt-3">
                <label
                    className="block text-sm font-bold mb-2" 
                    htmlFor="description"
                    >
                        Description
                </label>
                <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    value={topic.description || ""}
                    maxLength={500}
                    rows={5}
                    onChange={(e) => setTopic({ ...topic, description: e.target.value })}
                />
                <div className="flex justify-between">
                    <p className="text-xs text-green-600 italic">Optional</p>
                    <CharacterCounter value={topic.description ?? ''} limit={500}/>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <button 
                    type="submit"
                    className="btn btn-primary text-white  mt-4"
                    disabled={!isTitleValid}
                    >
                        Add Topic
                </button>

                {!isTitleValid && <p className="text-error text-xs italic">Please fill out all required fields.</p>}
            </div>
        </form>
    );
    
    
}

export default TopicForm