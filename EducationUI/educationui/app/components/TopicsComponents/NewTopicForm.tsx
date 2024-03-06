import { Topic } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface NewTopicFormProps {
    onSubmit: (topic: Topic) => void;
}

const NewTopicForm: React.FC<NewTopicFormProps> = ({ onSubmit }) => {
    const [topic, setTopic] = useState<Topic>({
        topicId: null,
        title: "",
        description: "",
    });

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(topic);
        setTopic({ topicId: null, title: "", description: "" });
    };

    return (
        <form onSubmit={handleOnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-col space-y-2">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                    >
                        Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="title"
                    value={topic.title || ""}
                    onChange={(e) => setTopic({ ...topic, title: e.target.value })}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2" 
                    htmlFor="description"
                    >
                        Description
                </label>
                <textarea
                    id="description"
                    value={topic.description || ""}
                    onChange={(e) => setTopic({ ...topic, description: e.target.value })}
                />
            </div>
            <button type="submit">Add Topic</button>
        </form>
    );
    
    
}

export default NewTopicForm