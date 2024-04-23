import TopicCatalog from "@/app/components/Topics/TopicCatalog";

const EditTopicPage: React.FC = async() => {

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">Edit Topic</h1>
            <div className="flex justify-center">
                <TopicCatalog/>
            </div>
        </div>
    )
}

export default EditTopicPage