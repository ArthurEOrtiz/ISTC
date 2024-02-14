'use client';
import React, { FormEvent } from 'react';

const CourseForm = () => {
    

function handleCreditInput(event: FormEvent<HTMLInputElement>): void {
    const inputValue = event.currentTarget.value;
    const parsedValue = parseInt(inputValue);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100) {
    event.currentTarget.value = '';
    }
}

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="courseName"
            >
                Course Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="courseName"
                type="text"
                placeholder="Course Name"
            />
        </div>
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="courseDescription"
            >
                Course Description
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="courseDescription"
                placeholder="Course Description"
            />
        </div>
        <div className="flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="attendanceCredit"
                    >
                    Attendance Credit
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="attendanceCredit"
                    type="text"
                    onInput={handleCreditInput}
                    placeholder="Whole Numbers Only, 1-100"
                />
            </div>
            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="completionCredit"
                >
                    Completion Credit
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="completionCredit"
                    type="text"
                    onInput={handleCreditInput}
                    placeholder="Whole Numbers Only, 1-100"
                />
            </div>
        </div>
        <div className="flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="instructorName"
                    >
                    Instructor Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="instructorName"
                    type="text"
                    placeholder="Instructor Name"
                />
            </div>
            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="instructorEmail"
                >
                    Instructor Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="instructorEmail"
                    type="email"
                    placeholder="valid@Email.com"
                />
            </div>
        </div>

        <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
            >
                Add Course
            </button>
        </div>
    </form>
  )
}

export default CourseForm
