'use client';
import { useState } from 'react';

export default function CourseForm() {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    attendanceCredit: '',
    completionCredit: '',
    enrollmentDeadline: '',
    instructorName: '',
    instructorEmail: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8 bg-white rounded-xl shadow-md">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} className="input input-bordered" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="textarea textarea-bordered"></textarea>
      <input type="text" name="attendanceCredit" placeholder="Attendance Credit" onChange={handleChange} className="input input-bordered" />
      <input type="text" name="completionCredit" placeholder="Completion Credit" onChange={handleChange} className="input input-bordered" />
      <input type="date" name="enrollmentDeadline" placeholder="Enrollment Deadline" onChange={handleChange} className="input input-bordered" />
      <input type="text" name="instructorName" placeholder="Instructor Name" onChange={handleChange} className="input input-bordered" />
      <input type="email" name="instructorEmail" placeholder="Instructor Email" onChange={handleChange} className="input input-bordered" />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}