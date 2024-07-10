import Link from 'next/link'
import React from 'react'

const AddEditCourse: React.FC = () => {
  return (
    <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Add/Edit Course</h1>
          <p className="text-lg">
            This page is where you can add or edit courses for your education program. 
            Please choose an option from the navigation menu, or the cards below, to get started.
          </p>

          <div className="flex mt-8 w-1/2 space-x-4">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Add Course</h2>
                <p>Add a new course to your education program.</p>
                <div className="card-actions justify-end">
                  <Link href="/admin/courses/add" className="btn btn-primary text-white">Add Course</Link>
                </div>
              </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Edit Course</h2>
                <p>Edit an existing course in your education program.</p>
                <div className="card-actions justify-end">
                  <Link href="/admin/courses/edit" className="btn btn-primary text-white">Edit Course</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddEditCourse
