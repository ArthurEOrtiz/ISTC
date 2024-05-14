'use client';
import { Course } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import CharacterCounter from "../../shared/CharacterCounter";

interface CourseFormProps {
    onSubmit: (course : Course) => void;
    course: Course;
}

const CourseForm: React.FC<CourseFormProps> = ({onSubmit, course:inboundCourse }) => {
    
    const [course, setCourse] = useState<Course>(inboundCourse);

    const [titleTouched, setTitleTouched] = useState<boolean>(false);
    const [istitleValid, setIsTitleValid] = useState<boolean>();

    const [emailTouched, setEmailTouched] = useState<boolean>(false);  
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const [attendanceCreditTouched, setAttendanceCreditTouched] = useState<boolean>(false);
    const [isAttendanceCreditValid, setIsAttendanceCreditValid] = useState<boolean>();

    const [examCreditTouched, setExamCreditTouched] = useState<boolean>(false);
    const [isExamCreditValid, setIsExamCreditValid] = useState<boolean>(true);

    const [maxAttendanceTouched, setMaxAttendanceTouched] = useState<boolean>(false);
    const [isMaxAttendanceValid, setIsMaxAttendanceValid] = useState<boolean>();

    const [enrollmentDeadlineTouched, setEnrollmentDeadlineTouched] = useState<boolean>(true);
    const [isEnrollmentDeadlineValid, setIsEnrollmentDeadlineValid] = useState<boolean>(true);

    const isFormValid = istitleValid && isEmailValid && isAttendanceCreditValid && isExamCreditValid && isMaxAttendanceValid && isEnrollmentDeadlineValid;

    // effects
    useEffect(() => {
        setCourse(inboundCourse);
    }, [inboundCourse]);

    useEffect(() => {
        setIsExamCreditValid(validateExamCredit(course.examCredit, course.hasExam));
    }, [course.examCredit, course.hasExam]);

    useEffect(() => {
        if (course.title !== '') {
            setIsTitleValid(true);
        }

        if (course.attendanceCredit > 0) {
            setIsAttendanceCreditValid(true);
        }

        if (course.maxAttendance > 0) {
            setIsMaxAttendanceValid(true);
        }
    }, [course])

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(course);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
    
        switch (true) {
            case id === 'description': {
                // Limit description to 500 characters
                const truncatedValue = value.slice(0, 500);
                setCourse((prevCourse) => ({
                    ...prevCourse,
                    description: truncatedValue,
                }));
                break;
            }
            case id === 'enrollmentDeadline': {
                setCourse((prevCourse) => ({
                    ...prevCourse,
                    enrollmentDeadline: new Date(value),
                }));
                break;
            }
            case id.startsWith('hasExam'): {
                if (value === 'true') {
                    setCourse((prevCourse) => ({
                        ...prevCourse,
                        hasExam: true,
                    }));
                } else {
                    setCourse((prevCourse) => ({
                        ...prevCourse,
                        hasExam: false,
                        examCredit: null,
                    }));
                }
                break;
            }
            case id.startsWith('location.'): {
                // Handle nested location fields
                const locationField = id.split('.')[1];
                setCourse((prevCourse) => ({
                    ...prevCourse,
                    location: {
                        ...prevCourse.location,
                        [locationField]: value,
                    },
                }));
                break;
            }
            default: {
                // Handle other top-level fields
                setCourse((prevCourse) => ({
                    ...prevCourse,
                    [id]: value,
                }));
                break;
            }
        }
    };

    const preventCharInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const validKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        // Prevent non-numeric input
        if (!/[0-9]/.test(event.key) && !validKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
    
    const handleCourseTitleBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setTitleTouched(true);
        setIsTitleValid(!!event.target.value);
    }

    const handleEmailBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setEmailTouched(true);

        if (event.target.value === '') {
            setIsEmailValid(true);
            return;
        }
        
        const isValid = validatEamil(event.target.value);
        setIsEmailValid(isValid);
    }

    const handleAttendanceCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setAttendanceCreditTouched(true);
        const isValid = event.target.value !== '' && parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 100;
        setIsAttendanceCreditValid(isValid); 
    }

    const handleExamCreditBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
        setExamCreditTouched(true);
        let isValid;
        if (course.hasExam) {
            isValid = event.target.value !== '' && parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 100;
        } else {
            isValid = true;
        }

        setIsExamCreditValid(isValid);
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

    // helper methods.
    const validatEamil = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateEnrollmentDeadline = (value: string): boolean => {
        const selectedDate = new Date(value);
        return selectedDate > new Date();
    }

    const validateExamCredit = (credit: number | null, hasExam: boolean): boolean => {
        if (!hasExam) {
            return true;
        }

        if (credit === null) {
            return false;
        }

        return credit > 0 && credit <= 100;
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${!istitleValid && titleTouched? 'border-error' : ''}`}
                    id="title"
                    type="text"
                    placeholder="Title"
                    defaultValue={course.title}
                    required
                    maxLength={50}
                    onChange = {handleChange}
                    onBlur={handleCourseTitleBlur}
                />
                
                <p className="text-error text-xs italic">
                    {(!istitleValid && titleTouched) ? 'Please enter a Title.' : 'Required'}
                </p>
            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="description"
                >
                    Course Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Optional"
                    defaultValue={course.description ?? ''}
                    maxLength={500}
                    onChange = {handleChange}
                    rows={5}
                />
                <div className="flex justify-between">
                    <p className="text-xs text-green-600 italic">Optional</p>
                    <CharacterCounter value={course.description ?? ""} limit={500} />
                </div>
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="instructorName"
                        >
                        Instructor Name
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        id="instructorName"
                        type="text"
                        placeholder="John Doe"
                        defaultValue={course?.instructorName || ''}
                        maxLength={50}
                        onChange = {handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="instructorEmail"
                    >
                        Instructor Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${!isEmailValid && emailTouched ? 'border-error' : ''}`}
                        id="instructorEmail"
                        type="email"
                        placeholder="valid@Email.com"
                        defaultValue={course?.instructorEmail || ''}
                        onChange = {handleChange}
                        onBlur={handleEmailBlur}
                    />
                    <p className={`text-xs italic ${isEmailValid? ('text-green-600') : ('text-error')}`}>
                        {isEmailValid ? 'Optional' : 'Please enter a valid email.'}
                    </p>
                </div>

            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="attendanceCredit"
                        >
                        Attendance Credit
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${!isAttendanceCreditValid && attendanceCreditTouched ? 'border-error' : ''}`}
                        id="attendanceCredit"
                        type="number"
                        min={1}
                        max={100}
                        placeholder="1-100"
                        defaultValue={course.attendanceCredit}
                        onChange = {handleChange}
                        onBlur={handleAttendanceCreditBlur}
                    />
                    <p className="text-error text-xs italic">
                        {(!isAttendanceCreditValid && attendanceCreditTouched) ? 'Please enter a valid attendance credit.' : 'Required'}
                    </p>
                
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="maxAttendance"
                    >
                        Max Attendance
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${!isMaxAttendanceValid && maxAttendanceTouched ? 'border-error' : ''}`}
                        id="maxAttendance"
                        type="number"
                        min={1}
                        max={999}
                        placeholder="1-999"
                        defaultValue={course.maxAttendance}
                        onChange = {handleChange}
                        onBlur={handleMaxAttendanceBlur}
                    />
                    <p className="text-error text-xs italic">
                        {(!isMaxAttendanceValid && maxAttendanceTouched) ? 'Please enter a valid max attendance.' : 'Required'}
                    </p>
                </div>

            </div>
            
            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="hasExam"
                    >
                        Has Exam
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="hasExam"
                        onChange = {handleChange}
                        defaultValue = {course.hasExam.toString()}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                {course.hasExam && (
                    <div className="mb-4 w-1/2 pl-2">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="examCredit"
                        >
                            Exam Credit
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${!isExamCreditValid && examCreditTouched ? 'border-error' : ''}`}
                            id="examCredit"
                            type="number"
                            min={1}
                            max={100}
                            placeholder="1-100"
                            defaultValue={course?.examCredit || 1}
                            onChange = {handleChange}
                            onBlur={handleExamCreditBlur}
                        />
                        <p className="text-error text-xs italic">
                            {(!isExamCreditValid && examCreditTouched) ? 'Please enter a valid exam credit.' : 'Required'}
                        </p>

                        
                    </div>
                )}
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="enrollmentDeadline"
                    >
                        Enrollment Deadline
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${!isEnrollmentDeadlineValid && enrollmentDeadlineTouched ? 'border-error' : ''}`}
                        id="enrollmentDeadline"
                        min={new Date().toISOString().split('T')[0]}
                        type="date"
                        value={new Date(course.enrollmentDeadline).toISOString().split('T')[0]}
                        onChange={handleChange}
                        onBlur={handleEnrollmentDeadlineBlur}
                    />
                    <p className="text-error text-xs italic">
                        {(!isEnrollmentDeadlineValid && enrollmentDeadlineTouched) ? 'Please enter a valid enrollment deadline.' : 'Required'}
                    </p>
                </div>

                {/* <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="pdf"
                    >
                        PDF
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="pdf"
                        type="text"
                        placeholder='PDF URL'
                        onChange={handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div> */}

            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="location.description"
                >
                    Location Description
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="location.description"
                    type="text"
                    placeholder="Chinden Campus"
                    defaultValue={course?.location?.description || ''}
                    maxLength={50}
                    onChange={handleChange}
                />
                <p className="text-xs text-green-600 italic">Optional</p>
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="location.room"
                    >
                        Room
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.room"
                        type="text"
                        placeholder="123B"
                        defaultValue={course?.location?.room || ''}
                        maxLength={50}
                        onChange={handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="location.remoteLink"
                    >
                        Remote Link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.remoteLink"
                        type="url"
                        placeholder="https://zoom.us/j/1234567890?pwd=abc123"
                        defaultValue={course?.location?.remoteLink || ''}
                        onChange={handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>

            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="location.addressLine1"
                >
                    Address Line 1
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    id="location.addressLine1"
                    type="text"
                    placeholder="123 Main St"
                    defaultValue={course?.location?.addressLine1 || ''}
                    maxLength={50}
                    onChange={handleChange}
                />
                <p className="text-xs text-green-600 italic">Optional</p>
            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="location.addressLine2"
                >
                    Address Line 2
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
                    id="location.addressLine2"
                    type="text"
                    placeholder="Apt 3A"
                    defaultValue={course?.location?.addressLine2 || ''}
                    maxLength={50}
                    onChange={handleChange}
                />
                <p className="text-xs text-green-600 italic">Optional</p>
            </div>

            <div className="flex justify-between">

                <div className="mb-4 w-1/2 pr-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="location.city"
                    >
                        City
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        id="location.city"
                        type="text"
                        placeholder="Boise"
                        defaultValue={course?.location?.city || ''}
                        onChange={handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="location.state"
                    >
                        State
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="location.state"
                        onChange={handleChange}
                        defaultValue={course?.location?.state || 'ID'}
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
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>

                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="location.postalCode"
                    >
                        Zip Code
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        id="location.postalCode"
                        type="text"
                        placeholder="83714"
                        defaultValue={course?.location?.postalCode || ''}
                        onKeyDown = {preventCharInput}
                        onChange = {handleChange}
                    />
                    <p className="text-xs text-green-600 italic">Optional</p>
                </div>  
            </div>


            <div className="flex items-center justify-between">
                <button
                    className={`btn btn-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? ' opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={!isFormValid}
                >
                    Submit
                </button>
                {!isFormValid && <p className="text-error text-xs italic w-1/2">Please fill out all required fields.</p>}
            </div>
        </form>
  );
}

export default CourseForm;

