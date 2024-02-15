import AddCourseComponent from '@/app/components/CourseComponents/AddCourseComponents'
import React from 'react'

const AddCourse: React.FC = () => {

    return (
        <main>
            <h1 className="p-2 text-3xl text-center font-bold">Add Course</h1>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <AddCourseComponent />
                </div>
            </div>
        </main>
    )
}

export default AddCourse
