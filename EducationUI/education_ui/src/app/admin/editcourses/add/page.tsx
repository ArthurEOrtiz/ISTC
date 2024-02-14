import CourseForm from '@/app/admin/editcourses/CourseForm';
import React from 'react'

const AddCourse = () => {
  return (
    <main>
      <div>
        <h1>Add Course</h1>
      </div>
      <div>
          <CourseForm />
      </div>
    </main>
  );
}

export default AddCourse
