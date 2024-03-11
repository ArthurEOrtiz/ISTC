'use client';
import { Course, Topic } from '@/app/shared/types/sharedTypes';
import { useEffect, useState } from 'react';
import NewCourseForm from './NewCourseForm';
import CourseInfoCard from './CourseInfoCard';
import NewClass from './NewClass';
import SelectTopicModal from '../TopicsComponents/SelectTopicModal';
import ConfirmationModal from '../../shared/modals/ConfirmationModal';
import { useRouter } from 'next/navigation';
import SavingModal from '../../shared/modals/SavingModal';
import { postCourse } from '@/Utilities/api';

/**
 * Component for adding a new course. 
 * This component is under the CourseComponents folder, and is the central component for 
 * creating a new course. It Contains the NewCourseForm, CourseInfoCard, NewClass, and Select
 * TopicModal components.
 */
const AddCourse: React.FC = () => {    
    const [course, setCourse] = useState<Course>();
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }
    , [course?.classes.length]);

    // Event Handlers this component. 
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
    
        // Create the new class object
        const newClass = {
            classId: 0,
            courseId: 0,
            scheduleStart: scheduleStart,
            scheduleEnd: scheduleEnd,
            attendance: [],
        };

        //console.log("AddCourse.handleAddClass: newClass: ", newClass);
    
        // Update the course state by adding the new class to the classes array
        if (course) {
            setCourse({
                ...course,
                classes: [...course.classes, newClass],
            });
        };
    };

    const handleSaveCourse = async () => {
        setShowConfirmationModal(true);
    };

    // Event Handlers for Components

    // NewCourseForm
    const handleNewCourseFormOnSubmit = (course: Course) => {
        setCourse(course);
    }

    const handleCourseInfoCardOnApply = (course: Course) => {
        setCourse(course);
    }

    // NewClass
    const handleNewClassOnDelete = (index: number) => {
        if (course) {
            const newClasses = [...course.classes];
            newClasses.splice(index, 1); // Remove the class at the specified index
            setCourse({
                ...course,
                classes: newClasses
            });
        }
    }

    const handleNewClassOnScheduleStartChange = (index: number, date: Date) => {
        if (course) {
            const newClasses = [...course.classes];
            newClasses[index].scheduleStart = date;
            setCourse({
                ...course,
                classes: newClasses
            });
        }
    }

    const handleNewClassOnScheduleEndChange = (index: number, date: Date) => {
        if (course) {
            const newClasses = [...course.classes];
            newClasses[index].scheduleEnd = date;
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
        
        try {
            setShowConfirmationModal(false);
            // imported from api.ts
            await postCourse(course);

        } catch (error) {
            throw error;
        } finally {
            router.push('/admin/editcourse/edit');
            // this might not do anything. 
            setIsSaving(false);
            setCourse(undefined);
        }
    }

    const handleConfirmationModalOnCancel = () => {
        setShowConfirmationModal(false);
    }

    return (
        <>
            {course === undefined ? (
                <NewCourseForm onSubmit={handleNewCourseFormOnSubmit}/>
            ) : (
                
                <>
                    <div >
                            <button
                                className="btn btn-primary text-white mb-4"
                                onClick={handleSaveCourse}
                            >Save Course</button>
                    </div>
                    
                    <div>
                        <CourseInfoCard course={course} onApply={handleCourseInfoCardOnApply} />
                    </div>
                    <div>
                        {course.classes.map((classItem, index) => (
                            
                            <div className="mt-2" key={index}> 
                                <NewClass
                                    scheduleStart={classItem.scheduleStart}
                                    scheduleEnd={classItem.scheduleEnd}
                                    onDelete={() => handleNewClassOnDelete(index)}
                                    onScheduleStartChange={(date: Date) => handleNewClassOnScheduleStartChange(index, date)}
                                    onScheduleEndChange={(date: Date) => handleNewClassOnScheduleEndChange(index, date)}
                                />
                            </div>
                            ))
                        }
                        <div className = "mt-2">
                            <button
                                className="btn btn-primary text-white"
                                onClick={handleAddClass}
                            >Add Class</button>

                            {/* <button
                                className="btn btn-primary text-white ml-2"
                                onClick={() => console.log(course)}
                            >Console Log Course</button> */}

                        </div>
                    </div>
                </>

            )}

            {/* Dialogs - also known as Modals - and the saving spinner */}
            {showSelectTopicModal && (
                <SelectTopicModal 
                    open={showSelectTopicModal} 
                    onClose={handleSelectTopicModalOnClose} 
                    onSelect={(topic: Topic[]) => handleSelectTopicModalOnSelect(topic)} 
                    topics={course?.topics || []} 
                    /> 
            )}
            {showConfirmationModal && (
                <ConfirmationModal 
                    title={'Save Course'} 
                    message={'Are you sure you want to save this course to the database?'} 
                    onConfirm={handleConfirmationModalOnConfirm} 
                    onCancel={handleConfirmationModalOnCancel}
                />
            )}
            {isSaving && (
                <SavingModal text={'Saving Course...'} />
                )
            } 

        </>
    );
}

export default AddCourse;
