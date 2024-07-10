import Link from 'next/link'
import React from 'react'

const Admin: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the admin area of the application.</p>
        <p className="text-lg mt-4">Here you can manage users, courses, topics, and other administrative tasks.</p>
      </div>

      <div className="flex justify-normal gap-4 mt-4">

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add Course</h2>
            <p>Add a course to the current selection. </p>
            <p>Use this feature to add a new course to the current selection of courses.</p>
            <div className="card-actions justify-end">
              <Link href="/admin/courses/add" className="btn btn-primary text-white">Add a course.</Link>
            </div>
          </div>
        </div>


        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Course</h2>
            <p>Edit an existing course.</p>
            <p>Update a courses with new information, or make changes to the class schedule.</p>
            <div className="card-actions justify-end">
              <Link href="/admin/courses/edit" className="btn btn-primary text-white">Edit a course.</Link>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add Topic</h2>
            <p>Add a topic to the current selection.</p>
            <p> Topics are tag used to group a selection of courses together.</p>
            <p><em>Examples</em></p>
            <ul>
              <li><em>Summer School 2024</em></li>
              <li><em>Property Tax</em></li>
              <li><em>Mapping Courses</em></li>
            </ul>
            <div className="card-actions justify-end">
              <Link href="admin/edittopic/add" className="btn btn-primary text-white">Add a topic.</Link>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Topics</h2>
            <p>Edit an existings topics.</p>
            <p>Update a topics with new information, or update their affliated courses.</p>
            <div className="card-actions justify-end">
              <Link href="/admin/edittopic/edit" className="btn btn-primary text-white">Edit a topic.</Link>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}

export default Admin
