'use client';
import { Topic } from "@/app/shared/types/sharedTypes";
import { getAllTopics } from "@/Utilities/api";
import { useEffect, useState } from "react";
import TopicList from "./TopicList";
import ErrorModal from "@/app/shared/modals/ErrorModal";

const TopicCatalog: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);  

    // Effects
    useEffect(() => {
        fetchTopics();
    }, []);

    // Helpers
    const fetchTopics = async () => {
        setIsLoading(true);
        const response = await getAllTopics();
        if (response.status === 200) {
            setTopics(response.data);
        } else {
            setError(response as unknown as string);
        }
        setIsLoading(false);
    }

    return (
        <div className='p-2'>
            {isLoading && <span className="loading loading-lg"></span>}
            
            {topics && !isLoading && 
                <TopicList 
                    topics={topics} 
                    onError={(error) => setError(error)}
                />
            }

            {error && (
                <ErrorModal
                    title="Error"
                    message={error}
                    onClose={() => setError(null)}
                />
            )}  
        </div>
    );
}

export default TopicCatalog;

