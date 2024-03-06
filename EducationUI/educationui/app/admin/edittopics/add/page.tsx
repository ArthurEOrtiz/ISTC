import AddTopic from "@/app/components/TopicsComponents/AddTopic"

const AddTopicPage: React.FC = () => {
    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Add Topic</h1>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <AddTopic />
                </div>
            </div>
        </main>
    )
}

export default AddTopicPage