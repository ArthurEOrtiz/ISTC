import { Topic } from "@/app/shared/types/sharedTypes";


interface TopicListProps {
    topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {topics.map((topic, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">
                    <h1 className="text-xl font-bold">{topic.title}</h1>
                    <p><strong>Description:</strong> {topic.description}</p>
                </div>
            ))}
        </div>
    );
};

export default TopicList;
