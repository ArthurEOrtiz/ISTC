import { Topic } from "@/app/shared/types/sharedTypes";

interface TopicInfoCardProps {
    topic: Topic;
    onApply: (topic: Topic) => void;
}

const TopicInfoCard: React.FC<TopicInfoCardProps> = ({ topic, onApply }) => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <p>{topic.description}</p>
            <button
                onClick={() => onApply(topic)}
                className="btn btn-primary text-white mt-4"
            >
                Apply
            </button>
        </div>
    );
};

export default TopicInfoCard