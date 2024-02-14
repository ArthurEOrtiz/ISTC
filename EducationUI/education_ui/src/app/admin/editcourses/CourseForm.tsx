'use client';
import { FormEvent, useState } from 'react';

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

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    console.log("Button clicked");
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
  };
  
  
  function handleCreditInput(event: FormEvent<HTMLInputElement>): void {
    console.log("Input event fired");
    };

  return (
    <form onSubmit={handleSubmit}>
      
      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Course Title</span>
          </div>
          <input 
            type="text"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea 
            className="textarea textarea-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Attendance Credit</span>
          </div>
          <input 
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={formState.attendanceCredit}
            onChange={handleCreditInput}
          />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Completion Credit</span>
          </div>
          <input 
            type="number"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enrollment Deadline</span>
          </div>
          <input 
            type="date"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Instructor Name</span>
          </div>
          <input 
            type="text"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Instructor Email</span>
          </div>
          <input 
            type="email"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <div className="p-1">
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleClick}
          >
          Submit
        </button>
      </div>

    </form>
  );
}


 
