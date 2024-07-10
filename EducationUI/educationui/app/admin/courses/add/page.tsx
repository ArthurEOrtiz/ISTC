import AddCourse from "@/app/components/Course/AddCourse"


const AddCoursePage: React.FC = () => {

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">Add Course</h1>
            <div className="flex justify-center">
                <AddCourse />
            </div>
        </div>
    )
}

export default AddCoursePage
