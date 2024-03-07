import { getAllTopics } from "@/Utilities/api"
import TopicList from "@/app/components/TopicsComponents/TopicList";
import { Topic } from "@/app/shared/types/sharedTypes";

const EditTopicPage: React.FC = async() => {
    const responseData = await getAllTopics();
    const topics = responseData as Topic[];

    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Edit Topic</h1>
            <div className="flex justify-center">
                <TopicList topics={topics} />
            </div>
        </main>
    )
}

export default EditTopicPage