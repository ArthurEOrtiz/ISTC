import CourseForm from '@/app/components/courseform'
import React from 'react'

const AddCourse = () => {
  return (
 <main>
    <h1 className="p-2 text-3xl text-center font-bold">Add Course</h1>
    <div className="flex justify-center">
        <div className="w-1/2">
            <CourseForm />
        </div>
    </div>
 </main>
  )
}

export default AddCourse
