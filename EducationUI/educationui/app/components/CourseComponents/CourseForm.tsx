'use client';
import React, { FormEvent, FocusEvent, useState, useEffect } from 'react';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import CharacterCounter from '../CharacterCounter';

interface CourseFormProps {
    onSubmit: (formData: CourseFormData) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }: {onSubmit: (formData: CourseFormData) => void}) => {
    
    const initialFormData : CourseFormData  = {
        title: '',
        description: '',
        instructorName: '',
        instructorEmail: '',
        attendanceCredit: 0,
        completionCredit: 0,
        maxAttendance: 0,
        enrollmentDeadline: '',
        pdf: '',
        locationDescription: '',
        room: '',
        remoteLink: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: 'ID',
        postalCode: ''
    }

    const [formData, setFormData] = useState<CourseFormData>(() => {
        let savedFormData;
        if (typeof localStorage !== 'undefined') {
            savedFormData = localStorage.getItem('courseFormData');
        }
        return savedFormData ? JSON.parse(savedFormData) : initialFormData;
    });

    const validatEamil = (email: any) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateCompletionCredit = (value: string): boolean => {
        const parsedValue = parseInt(value);
        return parsedValue >= attendanceCredit 
    }

    const validateEnrollmentDeadline = (value: string): boolean => {
        const selectedDate = new Date(value);
        return selectedDate > new Date();
    }

    const [titleTouched, setTitleTouched] = useState<boolean>(initialFormData.title !== '');
    const [istitleValid, setIsTitleValid] = useState<boolean>(initialFormData.title !== '');

    const [emailTouched, setEmailTouched] = useState<boolean>(initialFormData.instructorEmail !== '');  
    const [isEmailValid, setIsEmailValid] = useState<boolean>(validatEamil(initialFormData.instructorEmail));

    const [instructorNameTouched, setInstructorNameTouched] = useState<boolean>(initialFormData.instructorName !== '');
    const [isInstructorNameValid, setIsInstructorNameValid] = useState<boolean>(initialFormData.instructorName !== '');

    const [attendanceCreditTouched, setAttendanceCreditTouched] = useState<boolean>(initialFormData.attendanceCredit !== 0);
    const [isAttendanceCreditValid, setIsAttendanceCreditValid] = useState<boolean>(initialFormData.attendanceCredit !== 0);

    const [attendanceCredit, setAttendanceCredit] = useState<number>(0);

    const [completionCreditTouched, setCompletionCreditTouched] = useState<boolean>(initialFormData.completionCredit !== 0);
    const [isCompletionCreditValid, setIsCompletionCreditValid] = useState<boolean>(initialFormData.completionCredit >= attendanceCredit);

    const [maxAttendanceTouched, setMaxAttendanceTouched] = useState<boolean>(initialFormData.maxAttendance !== 0);
    const [isMaxAttendanceValid, setIsMaxAttendanceValid] = useState<boolean>(initialFormData.maxAttendance !== 0);

    const [enrollmentDeadlineTouched, setEnrollmentDeadlineTouched] = useState<boolean>(initialFormData.enrollmentDeadline !== '');
    const [isEnrollmentDeadlineValid, setIsEnrollmentDeadlineValid] = useState<boolean>(validateEnrollmentDeadline(initialFormData.enrollmentDeadline));

    const [addressLine1Touched, setAddressLine1Touched] = useState<boolean>(initialFormData.addressLine1 !== '');
    const [isAddressLine1Valid, setIsAddressLine1Valid] = useState<boolean>(initialFormData.addressLine1 !== '');

    const [cityTouched, setCityTouched] = useState<boolean>(initialFormData.city !== '');
    const [isCityValid, setIsCityValid] = useState<boolean>(initialFormData.city !== '');

    const [postalCodeTouched, setPostalCodeTouched] = useState<boolean>(initialFormData.postalCode !== '');
    const [isPostalCodeValid, setIsPostalCodeValid] = useState<boolean>(initialFormData.postalCode !== '');

    useEffect(() => {
        localStorage.setItem('courseFormData', JSON.stringify(formData));

        setIsTitleValid(formData.title !== '');
        setIsEmailValid(validatEamil(formData.instructorEmail));
        setIsInstructorNameValid(formData.instructorName !== '');
        setIsAttendanceCreditValid(formData.attendanceCredit !== 0);
        setIsCompletionCreditValid(validateCompletionCredit(formData.completionCredit.toString()));
        setIsMaxAttendanceValid(formData.maxAttendance !== 0);
        setIsEnrollmentDeadlineValid(validateEnrollmentDeadline(formData.enrollmentDeadline));
        setIsAddressLine1Valid(formData.addressLine1 !== '');
        setIsCityValid(formData.city !== '');
        setIsPostalCodeValid(formData.postalCode !== '');
    }, [formData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { id, value } = event.currentTarget;

        // speciail case for description
        let updatedValue = value;
        if (id === "description" && value.length > 255) {
            updatedValue = value.substring(0, 255);

            setFormData((prev) => ({
                ...prev,
                [id]: updatedValue
            }));

        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: updatedValue
            }));
        }
  
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        onSubmit(formData);
    }

    const handleIntInput = (event: FormEvent<HTMLInputElement>, minValue: number, maxValue: number): void => {
        const inputValue = event.currentTarget.value;
        const parsedValue = parseInt(inputValue);
        const prevValue = event.currentTarget.getAttribute('data-prev-value');
    
        if (inputValue === '') {
            // If input is empty, clear the previous value attribute
            event.currentTarget.removeAttribute('data-prev-value');
        } else if (isNaN(parsedValue) || parsedValue < minValue || parsedValue > maxValue) {
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
    
    const handlePostalCodeInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 0, 99999);
    }
    
    const handleCreditInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 0, 100);
    }

    const handleMaxAttendanceInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 1, 999);
    }

    
    const handleCourseTitleBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setTitleTouched(true);
        const isValid = event.target.value.length > 0;
        setIsTitleValid(isValid);
    }

    const handleEmailBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEmailTouched(true);
        const isValid = validatEamil(event.target.value);
        setIsEmailValid(isValid);
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
        const parsedValue = parseInt(event.target.value);
        setAttendanceCredit(parsedValue);
    }

    const handleCompletionCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCompletionCreditTouched(true);
        const isValid = validateCompletionCredit(event.target.value);
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

    const handlePostalCodeBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setPostalCodeTouched(true);
        const isValid = event.target.value.length > 0;
        setIsPostalCodeValid(isValid);
    }

    const isFormValid = istitleValid &&
        isEmailValid && 
        isInstructorNameValid && 
        isAttendanceCreditValid &&
        isCompletionCreditValid && 
        isMaxAttendanceValid &&
        isEnrollmentDeadlineValid &&
        isAddressLine1Valid &&
        isCityValid && 
        isPostalCodeValid;

    return (
        <>
        <button onClick={() => localStorage.clear()}>Clear Local Storage</button>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!istitleValid && titleTouched? 'border-red-500' : ''}`}
                    id="title"
                    type="text"
                    placeholder="Title"
                    value = {formData.title}
                    onChange = {handleChange}
                    onBlur={handleCourseTitleBlur}
                />
                {!istitleValid && titleTouched && <p className="text-red-500 text-xs italic">Please enter a Title.</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                >
                    Course Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Optional"
                    value = {formData.description}
                    onChange = {handleChange}
                />
                <CharacterCounter value={formData.description} limit={255} />
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
                        placeholder="John Doe"
                        value = {formData.instructorName}
                        onChange = {handleChange}
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
                        value = {formData.instructorEmail}
                        onChange = {handleChange}
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
                        value = {formData.attendanceCredit}
                        onChange = {handleChange}
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
                        value = {formData.completionCredit}
                        onChange = {handleChange}
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
                        value = {formData.maxAttendance}
                        onChange = {handleChange}
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
                        value = {formData.enrollmentDeadline}
                        onChange = {handleChange}
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
                        value = {formData.pdf}
                        onChange = {handleChange}
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
                    value = {formData.locationDescription}
                    onChange = {handleChange}
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
                        value = {formData.room}
                        onChange = {handleChange}
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
                        id="remoteLink"
                        type="url"
                        placeholder="https://zoom.us/j/1234567890?pwd=abc123"
                        value = {formData.remoteLink}
                        onChange = {handleChange}
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
                    value = {formData.addressLine1}
                    onChange = {handleChange}
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
                    value = {formData.addressLine2}
                    onChange = {handleChange}
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
                        value = {formData.city}
                        onChange = {handleChange}
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
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="state"
                        onChange = {handleChange}
                        value = {formData.state}
                    >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="postalCode"
                    >
                        Zip Code
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isPostalCodeValid && postalCodeTouched ? 'border-red-500' : ''}`}
                        id="postalCode"
                        type="text"
                        placeholder="83706"
                        onInput = {handlePostalCodeInput}
                        value = {formData.postalCode}
                        onChange = {handleChange}
                        onBlur = {handlePostalCodeBlur}
                    />
                    {!isPostalCodeValid && postalCodeTouched && <p className="text-red-500 text-xs italic">Please enter a valid Zip Code.</p>}
                </div>  
            </div>


            <div className="flex items-center justify-between">
                <button
                    className={`bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? ' opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    type="submit"
                    disabled={!isFormValid}
                >
                    Continue To Add Classes
                </button>
                {!isFormValid && <p className="text-red-500 text-xs italic w-1/2">Please fill out all required fields.</p>}
            </div>
        </form>
        </>
  )
}

export default CourseForm



