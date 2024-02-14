'use client';
import React, { FormEvent, FocusEvent, useState } from 'react';

const CourseForm = () => {
    const [courseNameTouched, setCourseNameTouched] = useState<boolean>(false);
    const [isCourseNameValid, setIsCourseNameValid] = useState<boolean>(false);
    const [emailTouched, setEmailTouched] = useState<boolean>(false);  
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [instructorNameTouched, setInstructorNameTouched] = useState<boolean>(false);
    const [isInstructorNameValid, setIsInstructorNameValid] = useState<boolean>(false);
    const [attendanceCreditTouched, setAttendanceCreditTouched] = useState<boolean>(false);
    const [isAttendanceCreditValid, setIsAttendanceCreditValid] = useState<boolean>(false);
    const [isCompletionCreditValid, setIsCompletionCreditValid] = useState<boolean>(false);
    const [completionCreditTouched, setCompletionCreditTouched] = useState<boolean>(false);
    const [maxAttendanceTouched, setMaxAttendanceTouched] = useState<boolean>(false);
    const [isMaxAttendanceValid, setIsMaxAttendanceValid] = useState<boolean>(false);
    const [enrollmentDeadlineTouched, setEnrollmentDeadlineTouched] = useState<boolean>(false);
    const [isEnrollmentDeadlineValid, setIsEnrollmentDeadlineValid] = useState<boolean>(false);
    const [addressLine1Touched, setAddressLine1Touched] = useState<boolean>(false);
    const [isAddressLine1Valid, setIsAddressLine1Valid] = useState<boolean>(false);
    const [cityTouched, setCityTouched] = useState<boolean>(false);
    const [isCityValid, setIsCityValid] = useState<boolean>(false);
    const [stateTouched, setStateTouched] = useState<boolean>(false);
    const [isStateValid, setIsStateValid] = useState<boolean>(false);
    const [zipTouched, setZipTouched] = useState<boolean>(false);
    const [isZipValid, setIsZipValid] = useState<boolean>(false);


    const handleCreditInput = (event: FormEvent<HTMLInputElement>): void => {
        const inputValue = event.currentTarget.value;
        const parsedValue = parseInt(inputValue);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100) {
        event.currentTarget.value = '';
        }
    }

    const handleMaxAttendanceInput = (event: FormEvent<HTMLInputElement>): void => {
        const inputValue = event.currentTarget.value;
        const parsedValue = parseInt(inputValue);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 999) {
        event.currentTarget.value = '';
        }
    }

    const handleZipInput = (event: FormEvent<HTMLInputElement>): void => {
        const inputValue = event.currentTarget.value;
        const parsedValue = parseInt(inputValue);
        const prevValue = event.currentTarget.getAttribute('data-prev-value');
    
        if (inputValue === '') {
            // If input is empty, clear the previous value attribute
            event.currentTarget.removeAttribute('data-prev-value');
        } else if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 99999) {
            // If input is incorrect, restore the previous value if available
            if (prevValue !== null) {
                event.currentTarget.value = prevValue;
            } else {
                event.currentTarget.value = '';
            }
        } else {
            // Store the current value as the previous value
            event.currentTarget.setAttribute('data-prev-value', inputValue);
        }
    }
    
    const handleCourseNameBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCourseNameTouched(true);
        const isValid = event.target.value.length > 0;
        setIsCourseNameValid(isValid);
    }

    const handleEmailBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEmailTouched(true);
        const isValid = validatEamil(event.target.value);
        setIsEmailValid(isValid);
    }

    const validatEamil = (email: any) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleInstructorNameBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setInstructorNameTouched(true);
        const isValid = event.target.value.length > 0;
        setIsInstructorNameValid(isValid);
    }

    const handleAttendanceCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setAttendanceCreditTouched(true);
        const isValid = event.target.value.length > 0;
        setIsAttendanceCreditValid(isValid);
    }

    const handleCompletionCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCompletionCreditTouched(true);
        const isValid = event.target.value.length > 0;
        setIsCompletionCreditValid(isValid);
    }

    const handleMaxAttendanceBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setMaxAttendanceTouched(true);
        const isValid = event.target.value.length > 0;
        setIsMaxAttendanceValid(isValid);
    }

    const handleEnrollmentDeadlineBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEnrollmentDeadlineTouched(true);
        const isValid = validateEnrollmentDeadline(event.target.value);
        setIsEnrollmentDeadlineValid(isValid);
    }

    const validateEnrollmentDeadline = (value: string): boolean => {
        const selectedDate = new Date(value);
        return selectedDate > new Date();
    }

    const handleAddressLine1Blur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setAddressLine1Touched(true);
        const isValid = event.target.value.length > 0;
        setIsAddressLine1Valid(isValid);
    }

    const handleCityBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCityTouched(true);
        const isValid = event.target.value.length > 0;
        setIsCityValid(isValid);
    }

    const handleStateBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setStateTouched(true);
        const isValid = event.target.value.length > 0;
        setIsStateValid(isValid);
    }

    const handleZipBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setZipTouched(true);
        const isValid = event.target.value.length > 0;
        setIsZipValid(isValid);
    }

    
    const isFormValid = isCourseNameValid && isEmailValid && isInstructorNameValid && isAttendanceCreditValid && isCompletionCreditValid && isMaxAttendanceValid && isEnrollmentDeadlineValid && isAddressLine1Valid && isCityValid && isStateValid && isZipValid;


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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isCourseNameValid && courseNameTouched? 'border-red-500' : ''}`}
                id="courseName"
                type="text"
                placeholder="Course Name"
                onBlur={handleCourseNameBlur}
            />
            {!isCourseNameValid && courseNameTouched && <p className="text-red-500 text-xs italic">Please enter a course name.</p>}
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
                placeholder="Optional"
            />
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
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isInstructorNameValid && instructorNameTouched ? 'border-red-500' : ''}`}
                    id="instructorName"
                    type="text"
                    placeholder="John Smith"
                    onBlur={handleInstructorNameBlur}
                />
                {!isInstructorNameValid && instructorNameTouched && <p className="text-red-500 text-xs italic">Please enter an instructor name.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="instructorEmail"
                >
                    Instructor Email
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEmailValid && emailTouched ? 'border-red-500' : ''}`}
                    id="instructorEmail"
                    type="email"
                    placeholder="valid@Email.com"
                    onBlur={handleEmailBlur}
                />
                {!isEmailValid && emailTouched && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
            </div>

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
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isAttendanceCreditValid && attendanceCreditTouched ? 'border-red-500' : ''}`}
                    id="attendanceCredit"
                    type="text"
                    onInput={handleCreditInput}
                    placeholder="1-100"
                    onBlur={handleAttendanceCreditBlur}
                />
                {!isAttendanceCreditValid && attendanceCreditTouched && <p className="text-red-500 text-xs italic">Please enter a valid attendance credit.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="completionCredit"
                >
                    Completion Credit
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isCompletionCreditValid && completionCreditTouched ? 'border-red-500' : ''}`}
                    id="completionCredit"
                    type="text"
                    onInput={handleCreditInput}
                    placeholder="1-100"
                    onBlur={handleCompletionCreditBlur}
                />
                {!isCompletionCreditValid && completionCreditTouched && <p className="text-red-500 text-xs italic">Please enter a valid completion credit.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="maxAttendance"
                >
                    Max Attendance
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isMaxAttendanceValid && maxAttendanceTouched ? 'border-red-500' : ''}`}
                    id="maxAttendance"
                    type="text"
                    onInput={handleMaxAttendanceInput}
                    placeholder="1-999"
                    onBlur={handleMaxAttendanceBlur}
                />
                {!isMaxAttendanceValid && maxAttendanceTouched && <p className="text-red-500 text-xs italic">Please enter a valid max attendance.</p>}
            </div>

        </div>
        <div className="flex justify-between">
            
            <div className="mb-4 w-1/2 pr-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="enrollmentDeadline"
                >
                    Enrollment Deadline
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEnrollmentDeadlineValid && enrollmentDeadlineTouched ? 'border-red-500' : ''}`}
                    id="enrollmentDeadline"
                    min = {new Date().toISOString().split('T')[0]}
                    type="date"
                    onBlur={handleEnrollmentDeadlineBlur}
                />
                {!isEnrollmentDeadlineValid && enrollmentDeadlineTouched && <p className="text-red-500 text-xs italic">Please enter a valid enrollment deadline.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="pdf"
                >
                    PDF
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pdf"
                    type="text"
                    placeholder='PDF URL, Optional'
                />
            </div>

        </div>

        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="locationDescription"
            >
                Location Description
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="locationDescription"
                type="text"
                placeholder="Optional"
            />
        </div>

        <div className="flex justify-between">

            <div className="mb-4 w-1/2 pr-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="room"
                    >
                    Room
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="room"
                    type="text"
                    placeholder="Optional"
                />
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="remoteLink"
                >
                    Remote Link
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="courseLink"
                    type="url"
                    placeholder="https://zoom.us/j/1234567890?pwd=abc123"
                />
            </div>

        </div>

        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="addressLine1"
            >
                Address Line 1
            </label>
            <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isAddressLine1Valid && addressLine1Touched ? 'border-red-500' : ''}`}
                id="addressLine1"
                type="text"
                placeholder="123 Main St"
                onBlur={handleAddressLine1Blur}
            />
            {!isAddressLine1Valid && addressLine1Touched && <p className="text-red-500 text-xs italic">Please enter an address.</p>}
        </div>

        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="addressLine2"
            >
                Address Line 2
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="addressLine2"
                type="text"
                placeholder="Optional"
            />
        </div>

        <div className="flex justify-between">

            <div className="mb-4 w-1/2 pr-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                    >
                    City
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isCityValid && cityTouched ? 'border-red-500' : ''}`}
                    id="city"
                    type="text"
                    placeholder="Boise"
                    onBlur = {handleCityBlur}
                />
                {!isCityValid && cityTouched && <p className="text-red-500 text-xs italic">Please enter a city.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                >
                    State
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isStateValid && stateTouched ? 'border-red-500' : ''}`}
                    id="state"
                    type="text"
                    placeholder="Idaho"
                    onBlur = {handleStateBlur}
                />
                {!isStateValid && stateTouched && <p className="text-red-500 text-xs italic">Please enter a state.</p>}
            </div>

            <div className="mb-4 w-1/2 pl-2">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="zip"
                >
                    Zip
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isZipValid && zipTouched ? 'border-red-500' : ''}`}
                    id="zip"
                    type="text"
                    onInput = {handleZipInput}
                    placeholder="83706"
                    onBlur = {handleZipBlur}
                />
                {!isZipValid && zipTouched && <p className="text-red-500 text-xs italic">Please enter a valid zip.</p>}
            </div>  
        </div>


        <div className="flex items-center justify-between">
            <button
                className={`bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? ' opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                type="button"
                disabled={!isFormValid}
            >
                Continue To Add Classes
            </button>
        </div>
    </form>
  )
}

export default CourseForm




