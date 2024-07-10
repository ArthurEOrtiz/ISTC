import TopicCatalog from "@/app/components/Topics/TopicCatalog";

const EditTopicPage: React.FC = async() => {

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mt-2">Edit Topic</h1>
            <div>
                <TopicCatalog/>
            </div>
        </div>
    )
}

export default EditTopicPage