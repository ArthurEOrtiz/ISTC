import AddTopic from "@/app/components/Topics/AddTopic"

const AddTopicPage: React.FC = () => {
    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Add Topic</h1>
            <div className="flex justify-center">
                <AddTopic />
            </div>
        </main>
    )
}

export default AddTopicPage