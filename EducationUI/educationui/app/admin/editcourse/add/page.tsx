import AddCourse from "@/app/components/Course/AddCourse"


const AddCoursePage: React.FC = () => {

    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Add Course</h1>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <AddCourse />
                </div>
            </div>
        </main>
    )
}

export default AddCoursePage
