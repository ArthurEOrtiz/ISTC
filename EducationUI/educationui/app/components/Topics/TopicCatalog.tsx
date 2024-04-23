'use client';
import { Topic } from "@/app/shared/types/sharedTypes";
import { getAllTopics } from "@/Utilities/api";
import { useEffect, useState } from "react";
import TopicList from "./TopicList";

const TopicCatalog: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>();
    const [error, setError] = useState<string | null>(null);

    // Effects
    useEffect(() => {
        fetchTopics();
    }, []);

    // Helpers
    const fetchTopics = async () => {
        const response = await getAllTopics();
        if (response.status === 200) {
            setTopics(response.data);
        } else {
            setError(response as unknown as string);
        }
    }

    return (
        <div>
            {topics && <TopicList topics={topics} /> }
            {error && <p className="text-error">{error}</p>}
        </div>
    
        
    );
}

export default TopicCatalog;

