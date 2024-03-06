'use client';
import { Course, Location, Topic } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import CharacterCounter from "../CharacterCounter";

interface NewCourseFormProps {
    onSubmit: (course : Course) => void;
}

const NewCourseForm: React.FC<NewCourseFormProps> = ({onSubmit}) => {
    const [titleTouched, setTitleTouched] = useState<boolean>(false);
    const [istitleValid, setIsTitleValid] = useState<boolean>();

    const [emailTouched, setEmailTouched] = useState<boolean>(false);  
    const [isEmailValid, setIsEmailValid] = useState<boolean>();

    const [instructorNameTouched, setInstructorNameTouched] = useState<boolean>(false);
    const [isInstructorNameValid, setIsInstructorNameValid] = useState<boolean>();

    const [attendanceCreditTouched, setAttendanceCreditTouched] = useState<boolean>(false);
    const [isAttendanceCreditValid, setIsAttendanceCreditValid] = useState<boolean>();

    const [completionCreditTouched, setCompletionCreditTouched] = useState<boolean>(false);
    const [isCompletionCreditValid, setIsCompletionCreditValid] = useState<boolean>();

    const [maxAttendanceTouched, setMaxAttendanceTouched] = useState<boolean>(false);
    const [isMaxAttendanceValid, setIsMaxAttendanceValid] = useState<boolean>();

    const [enrollmentDeadlineTouched, setEnrollmentDeadlineTouched] = useState<boolean>(false);
    const [isEnrollmentDeadlineValid, setIsEnrollmentDeadlineValid] = useState<boolean>();

    const [addressLine1Touched, setAddressLine1Touched] = useState<boolean>(false);
    const [isAddressLine1Valid, setIsAddressLine1Valid] = useState<boolean>();

    const [cityTouched, setCityTouched] = useState<boolean>(false);
    const [isCityValid, setIsCityValid] = useState<boolean>();

    const [postalCodeTouched, setPostalCodeTouched] = useState<boolean>(false);
    const [isPostalCodeValid, setIsPostalCodeValid] = useState<boolean>();

    const [course , setCourse] = useState<Course>({
        courseId: 0,
        title: '',
        description: '',
        attendanceCredit: 0,
        completionCredit: 0,
        maxAttendance: 0,
        enrollmentDeadline: '',
        instructorName: '',
        instructorEmail: '',
        pdf: '',
        location: {
            locationId: 0,
            description: '',
            room: '',
            remoteLink: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: 'ID',
            postalCode: ''
        },
        topics: [],
        classes: []
    });

    const isFormValid = istitleValid && isEmailValid && isInstructorNameValid && isAttendanceCreditValid && isCompletionCreditValid && isMaxAttendanceValid && isEnrollmentDeadlineValid && isAddressLine1Valid && isCityValid && isPostalCodeValid;

    // const isFormValid = true // remove after testing

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(course);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
    
        if (id === 'description') {
            // Limit description to 255 characters
            const truncatedValue = value.slice(0, 255);
            setCourse((prevCourse) => ({
                ...prevCourse,
                description: truncatedValue,
            }));
        } else if (id.startsWith('location.')) {
            // Handle nested location fields
            const locationField = id.split('.')[1];
            setCourse((prevCourse) => ({
                ...prevCourse,
                location: {
                    ...prevCourse.location,
                    [locationField]: value,
                },
            }));
        } else {
            // Handle other top-level fields
            setCourse((prevCourse) => ({
                ...prevCourse,
                [id]: value,
            }));
        }
    };

    const handleIntInput = (event: FormEvent<HTMLInputElement>, minValue: number, maxValue: number): void => {
        const inputValue = event.currentTarget.value;
        const prevValue = event.currentTarget.getAttribute('data-prev-value');
    
        // Remove any non-alphanumeric characters
        const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
    
        if (sanitizedValue === '') {
            // If input is empty, clear the previous value attribute
            event.currentTarget.removeAttribute('data-prev-value');
        } else {
            const parsedValue = parseInt(sanitizedValue);
    
            if (isNaN(parsedValue) || parsedValue < minValue || parsedValue > maxValue) {
                // If input is incorrect, restore the previous value if available
                if (prevValue !== null) {
                    event.currentTarget.value = prevValue;
                } else {
                    event.currentTarget.value = '';
                }
            } else {
                // Store the current value as the previous value
                event.currentTarget.setAttribute('data-prev-value', sanitizedValue);
                event.currentTarget.value = sanitizedValue;
            }
        }
    };
    
    const handleCourseTitleBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setTitleTouched(true);
        setIsTitleValid(!!event.target.value);
    }

    const handleInstructorNameBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setInstructorNameTouched(true);
        setIsInstructorNameValid(!!event.target.value);
    }

    const handleEmailBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEmailTouched(true);
        const isValid = validatEamil(event.target.value);
        setIsEmailValid(isValid);
    }

    const handleCreditInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 0, 100);
    }

    const handleAttendanceCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setAttendanceCreditTouched(true);
        const isValid = event.target.value.length > 0;
        setIsAttendanceCreditValid(isValid); 
    }

    const handleCompletionCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCompletionCreditTouched(true);
        const completionCreditValue = parseInt(event.target.value);
        const attendanceCreditValue = course.attendanceCredit;
        const isValid = completionCreditValue >= attendanceCreditValue;
        setIsCompletionCreditValid(isValid);
    }

    const handleMaxAttendanceInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 1, 999);
    }

    const handleMaxAttendanceBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setMaxAttendanceTouched(true);
        const isValid = event.target.value !== '' && parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 999;
        setIsMaxAttendanceValid(isValid);
    }

    const handleEnrollmentDeadlineBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEnrollmentDeadlineTouched(true);
        const isValid = validateEnrollmentDeadline(event.target.value);
        setIsEnrollmentDeadlineValid(isValid);
    }

    const handleAddressLine1Blur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setAddressLine1Touched(true);
        setIsAddressLine1Valid(!!event.target.value);
    }

    const handleCityBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setCityTouched(true);
        setIsCityValid(!!event.target.value);
    }

    const handlePostalCodeInput = (event: FormEvent<HTMLInputElement>): void => {
        handleIntInput(event, 0, 99999);
    }

    const handlePostalCodeBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setPostalCodeTouched(true);
        const isValid = event.target.value !== '' && parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 99999;
        setIsPostalCodeValid(isValid);
    }

    // helper validation methods.
    const validatEamil = (email: any) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateEnrollmentDeadline = (value: string): boolean => {
        const selectedDate = new Date(value);
        return selectedDate > new Date();
    }


    return (
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
                    value = {course?.title}
                    maxLength={50}
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
                    value = {course?.description}
                    maxLength={255}
                    onChange = {handleChange}
                />
                <CharacterCounter value={course.description} limit={255} />
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
                        value = {course?.instructorName}
                        maxLength={50}
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
                        value = {course?.instructorEmail}
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
                        value = {course?.attendanceCredit}
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
                        value = {course?.completionCredit}
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
                        value = {course?.maxAttendance}
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
                        value = {course?.enrollmentDeadline}
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
                        value = {course?.pdf}
                        onChange = {handleChange}
                    />
                </div>

            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location.description"
                >
                    Location Description
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="location.description"
                    type="text"
                    placeholder="Optional"
                    maxLength={50}
                    defaultValue = {course?.location?.description}
                    onChange = {handleChange}
                />
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="location.room"
                        >
                        Room
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.room"
                        type="text"
                        placeholder="Optional"
                        maxLength={50}
                        defaultValue = {course?.location?.room}
                        onChange = {handleChange}
                    />
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="location.remoteLink"
                    >
                        Remote Link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.remoteLink"
                        type="url"
                        placeholder="https://zoom.us/j/1234567890?pwd=abc123"
                        defaultValue = {course?.location?.remoteLink}
                        onChange = {handleChange}
                    />
                </div>

            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location.addressLine1"
                >
                    Address Line 1
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isAddressLine1Valid && addressLine1Touched ? 'border-red-500' : ''}`}
                    id="location.addressLine1"
                    type="text"
                    placeholder="123 Main St"
                    defaultValue = {course?.location?.addressLine1}
                    maxLength={50}
                    onChange = {handleChange}
                    onBlur={handleAddressLine1Blur}
                />
                {!isAddressLine1Valid && addressLine1Touched && <p className="text-red-500 text-xs italic">Please enter an address.</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location.addressLine2"
                >
                    Address Line 2
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    id="location.addressLine2"
                    type="text"
                    placeholder="Optional"
                    maxLength={50}
                    defaultValue = {course?.location?.addressLine2}
                    onChange = {handleChange}
                />
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="location.city"
                        >
                        City
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isCityValid && cityTouched ? 'border-red-500' : ''}`}
                        id="location.city"
                        type="text"
                        placeholder="Boise"
                        defaultValue = {course?.location?.city}
                        onChange = {handleChange}
                        onBlur = {handleCityBlur}
                    />
                    {!isCityValid && cityTouched && <p className="text-red-500 text-xs italic">Please enter a city.</p>}
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="location.state"
                    >
                        State
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.state"
                        onChange = {handleChange}
                        defaultValue = {course?.location?.state}
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
                        htmlFor="location.postalCode"
                    >
                        Zip Code
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isPostalCodeValid && postalCodeTouched ? 'border-red-500' : ''}`}
                        id="location.postalCode"
                        type="text"
                        placeholder="83706"
                        onInput = {handlePostalCodeInput}
                        defaultValue = {course?.location?.postalCode}
                        onChange = {handleChange}
                        onBlur = {handlePostalCodeBlur}
                    />
                    {!isPostalCodeValid && postalCodeTouched && <p className="text-red-500 text-xs italic">Please enter a valid Zip Code.</p>}
                </div>  
            </div>


            <div className="flex items-center justify-between">
                <button
                    className={`btn btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? ' opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={!isFormValid}
                >
                    Continue To Add Classes
                </button>
                {!isFormValid && <p className="text-red-500 text-xs italic w-1/2">Please fill out all required fields.</p>}
            </div>
        </form>
  );
}

export default NewCourseForm;

