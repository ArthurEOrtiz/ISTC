'use client';
import { Course, Topic } from '@/app/shared/types/sharedTypes';
import { useEffect, useState } from 'react';
import CourseForm from './CourseForm';
import ClassCard from '../Class/ClassCard';
import SelectTopicModal from '../Topics/SelectTopicModal';
import ConfirmationModal from '../../shared/modals/ConfirmationModal';
import { useRouter } from 'next/navigation';
import SavingModal from '../../shared/modals/SavingModal';
import { postCourse } from '@/Utilities/api';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import CourseInfoCard from './CourseInfoCard';
import CourseFormModal from './CourseFormModal';
import SelectPDFModal from '../PDF/SelectPDFModal';
import { areClassesOrderedByDate, courseHasClasses, sortClassesByDate } from '@/Utilities/class';

/*
 * Component for adding a new course. 
 * This component is under the CourseComponents folder, and is the central component for 
 * creating a new course. 
 */
const AddCourse: React.FC = () => {

    const defaultCourse : Course = {
        courseId: 0,
        status: "Upcoming",
        title: '',
        description: null,
        attendanceCredit: 0,
        examCredit: null,
        hasExam: false,
        maxAttendance: 0,
        enrollmentDeadline: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), // today plus on day, no time.
        instructorName: null,
        instructorEmail: null,
        pdfId: null,
        locationId: 0,
        location: {
            locationId: 0,
            description: null,
            room: null,
            remoteLink: null,
            addressLine1: null,
            addressLine2: null,
            city: 'Boise',
            state: 'ID',
            postalCode: null,
        },
        pdf: null,
        topics: [],
        classes: [],
        exams: [],
        waitLists: [],
    };
    // State variables for the component
    const [course, setCourse] = useState<Course>(defaultCourse);
    const [showCourseForm, setShowCourseForm] = useState<boolean>(false);
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);
    const [showPDFModal, setShowPDFModal] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    
    // Effects
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }
    , [course.classes.length]);

    useEffect(() => {
        if (courseHasClasses(course.classes) && !areClassesOrderedByDate(course.classes)) {
            setCourse({
                ...course,
                classes: sortClassesByDate(course.classes)
            });
        }
    }
    , [course.classes]);

            

    // Event Handlers 
    const handleAddClass = () => {
        const today = new Date();
    
        let scheduleStart;
        let scheduleEnd;

        if (course && course.classes.length > 0) {
            // If there are existing classes, get the last class's end time
            const lastClassEnd = new Date(course.classes[course.classes.length - 1].scheduleStart);
            
            // Increment the date by one day
            const nextDay = new Date(lastClassEnd);
            nextDay.setDate(nextDay.getDate() + 1);
    
            // Set the start time to 9 AM of the next day
            scheduleStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate(), 9, 0);
    
            // Set the end time to 5 PM of the same day
            scheduleEnd = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate(), 17, 0);
        } else {
            // If there are no existing classes, set the start time to 9 AM of today
            scheduleStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0);
            
            // Set the end time to 5 PM of today
            scheduleEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0);
        }

        const tempId : number = -course.classes.length;
    
        // Create the new class object
        const newClass = {
            classId: tempId,
            courseId: 0,
            scheduleStart: scheduleStart,
            scheduleEnd: scheduleEnd,
            attendances: [],
        };
    
        // Update the course state by adding the new class to the classes array
        if (course) {
            setCourse({
                ...course,
                classes: [...course.classes, newClass],
            });
        };
    };

    // NewClass
    const handleClassOnDelete = (index: number) => {
        if (course) {
            const newClasses = [...course.classes];
            newClasses.splice(index, 1); // Remove the class at the specified index
            setCourse({
                ...course,
                classes: newClasses
            });
        }
    }

    // SelectTopicModal
    const handleSelectTopicModalOnClose = () => {
        setShowSelectTopicModal(false);
    }

    const handleSelectTopicModalOnSelect = (topic: Topic[]) => {
        if (course) {
            setCourse({
                ...course,
                topics: topic
            });
        }
    }

    // ConfirmationModal
    const handleConfirmationModalOnConfirm = async () => {
        setIsSaving(true);
        setShowConfirmationModal(false);
        const response = await postCourse(course as Course);
        console.log(response);
        if (response.status === 204) {
            setIsSaving(false);
            router.push('/admin/editcourse/edit');
        } else {
            setIsSaving(false);
            setHasError(true);
            setErrorMessage(response as unknown as string);
        }
    }

    const handleConfirmationModalOnCancel = () => {
        setShowConfirmationModal(false);
    }

    const handleCourseFormModalSubmit = (c: Course): void => {
        setShowCourseForm(false);
        setCourse(c);
    }

    const renderActions = () => {
        return (    
            <>
                <li>
                    <details>
                        <summary>Edit</summary>
                        <ul className="p-2 z-10 bg-base-300 rounded-xl">
                            <li>
                                <button
                                    className="text-nowrap"
                                    onClick={() => setShowCourseForm(true)}
                                >
                                    Information
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-nowrap"
                                    onClick={() => setShowSelectTopicModal(true)}
                                >
                                    Topics
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-nowrap"
                                    onClick={() => setShowPDFModal(true)}
                                >
                                    PDF
                                </button>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <button
                        className="text-nowrap text-success font-bold"
                        onClick={() => setShowConfirmationModal(true)}
                    >
                        Save
                    </button>
                </li>
                <li>
                    <button
                        className="text-nowrap text-error font-bold"
                        onClick={() => setCourse(defaultCourse)}
                    >
                        Reset
                    </button>
                </li>
            </>
        );
    }

    return (
        <div className='w-full m-4'>
            {course.title === '' ? (
                <div className='flex justify-center'>
                    <div className='bg-base-100 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-2/3'>
                        <CourseForm 
                            course={course} 
                            onSubmit={(course) => setCourse(course)}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <div className='bg-base-100 shadow-md rounded-xl p-5'>
                        <div className='mb-4 bg-base-300 rounded-xl p-4'>
                            <CourseInfoCard course={course} />
                        </div>
                        <div className="navbar">
                            <div className="navbar-start">
                                <div className="dropdown">
                                    <div 
                                        tabIndex={0} 
                                        role="button" 
                                        className="btn btn-circle btn-outline btn-primary text-white lg:hidden"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                    </div>
                                    <ul 
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        {renderActions()}
                                    </ul>
                                </div>
                            </div>
                            <div className="navbar-center hidden bg-base-300 rounded-xl lg:flex justify-start">
                                <ul className="menu menu-horizontal space-x-16">
                                    {renderActions()}
                                </ul>
                            </div>
                            <div className="navbar-end">
                            </div>
                        </div>
                        {/* <div className='mt-2 space-x-2'>
                            <button 
                                className='btn btn-primary text-white'
                                onClick={()=>setShowCourseForm(true)}
                                >
                                    Edit Course Information
                            </button>
                            <button 
                                className='btn btn-primary text-white'
                                onClick={()=>setShowSelectTopicModal(true)}
                                >
                                    Select Topics
                            </button>
                            <button
                                className='btn btn-primary text-white'
                                onClick={() => setShowPDFModal(true)}
                                >
                                    Select PDF
                            </button>
                            <button 
                                className='btn btn-success border-none text-white'
                                onClick={()=>setShowConfirmationModal(true)}
                                >
                                    Save Course
                            </button>
                            <button
                                className="btn btn-primary text-white"
                                onClick={() => console.log(course)}
                            >
                                Log Course
                            </button>
                        </div> */}
                    </div>

                    <div>
                        {course.classes.map((cls, index) => (
                            <div className="bg-base-100 shadow-md rounded-xl p-4 relative mt-2" key={cls.classId}> 
                                <h2 className="text-xl font-bold mb-2">Class {index + 1}</h2>
                                <ClassCard
                                    cls={cls}
                                    onChange={(newCls) => {
                                        const newClasses = [...course.classes];
                                        newClasses[index] = newCls;
                                        setCourse({
                                            ...course,
                                            classes: newClasses
                                        });
                                    }}
                                    onDelete={() => handleClassOnDelete(index)}
                                />
                            </div>
                            ))
                        }
                        <div className="mt-2">
                            <button
                                className="btn btn-success text-white"
                                onClick={handleAddClass}
                            >
                                &#x2B; Class
                            </button>
                            {/* <button
                                className="btn btn-primary text-white ml-2"
                                onClick={() => console.log(course)}
                            >
                                Log Course
                            </button> */}
                        </div>
                    </div>
                </div>
            )}

            {/* Dialogs - also known as Modals */}
            {showSelectTopicModal && (
                <SelectTopicModal 
                    open={showSelectTopicModal} 
                    onClose={handleSelectTopicModalOnClose} 
                    onSelect={(topic: Topic[]) => handleSelectTopicModalOnSelect(topic)} 
                    topics={course?.topics || []} 
                    /> 
            )}

            <CourseFormModal
                course={course}
                isVisable={showCourseForm}
                onSubmit={(c) => handleCourseFormModalSubmit(c)}
                onClose={()=>setShowCourseForm(false)}
            />

            {showConfirmationModal && (
                <ConfirmationModal 
                    title={'Save Course'} 
                    message={'Are you sure you want to save this course to the database?'} 
                    onConfirm={handleConfirmationModalOnConfirm} 
                    onCancel={handleConfirmationModalOnCancel}
                />
            )}

            <SelectPDFModal
                open={showPDFModal}
                onClose={() => setShowPDFModal(false)}
                onAdd={(pdf) => {
                    setCourse({...course, pdf: pdf, pdfId: pdf.pdfId})
                    setShowPDFModal(false);
                }}
                onRemove={() => {
                    setCourse({...course, pdf: null, pdfId: null})
                    setShowPDFModal(false);
                }}
                PDF={course.pdf}
            />

            {isSaving && (
                <SavingModal text={'Saving Course...'} />
                )
            }

            {hasError && (
                <ErrorModal
                    title={'Error'}
                    message={errorMessage}
                    onClose={() => setHasError(false)}
                />
            )}

        </div>
    );
}

export default AddCourse;
