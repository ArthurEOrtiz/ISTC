'use client';
import { Course, Topic } from '@/app/shared/types/sharedTypes';
import { useEffect, useState } from 'react';
import NewCourseForm from './NewCourseForm';
import CourseInfoCard from './CourseInfoCard';
import NewClass from './NewClass';
import SelectTopicModal from '../TopicsComponents/SelectTopicModal';
import axios from 'axios';

const AddCourseComponent: React.FC = () => {    
    const [course, setCourse] = useState<Course>();
    const [showSelectTopicModal, setShowSelectTopicModal] = useState<boolean>(false);
    
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
            const lastClassEnd = new Date(course.classes[course.classes.length - 1].scheduleEnd);
            
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
    
        // Update the course state by adding the new class to the classes array
        if (course) {
            setCourse({
                ...course,
                classes: [...course.classes, newClass],
            });
        };
    };

    const handleAddTopic = () => {
        /*
        I need a way for the user to assign a topic to the course.
        The user should be able to create a new topic or select an existing topic.
        The best way to accomplish this would probably be with a modal. 
        */
        setShowSelectTopicModal(true);
    }



    const handleSaveCourse = async () => {
        try {
            // Perform the POST request to save the course
            const response = await axios.post("https://localhost:7144/Course/PostCourse", course);

            // Log the response or handle it as needed
            console.log("Response from server:", response);
        } catch (error) {
            // Log and handle any errors
            console.error("Error saving course:", error);
        }
    };


    // Event Handlers for Components

    // NewCourseForm
    const handleNewCourseFormOnSubmit = (course: Course) => {
        // console.log("AddCourseComponent.handleNewCourseFormOnSubmit: course: ", course);
        setCourse(course);
    }

    const handleCourseInfoCardOnApply = (course: Course) => {
        console.log("AddCourseComponent.handleCourseInfoCardOnApply: course: ", course);
        setCourse(course);
    }

    // NewClass
    const handleNewClassOnDelete = (index: number) => {
        console.log("AddCourseComponent.handleNewClassOnDelete: index: ", index);
        if (course) {
            const newClasses = [...course.classes];
            // console.log("AddCourseComponent.handleNewClassOnDelete: newClasses: ", newClasses);
            newClasses.splice(index, 1); // Remove the class at the specified index
            // console.log("AddCourseComponent.handleNewClassOnDelete: newClasses: ", newClasses);
            setCourse({
                ...course,
                classes: newClasses
            });
        }
    }

    const handleNewClassOnScheduleStartChange = (index: number, date: Date) => {
        // console.log("AddCourseComponent.handleNewClassOnDateChange: index: ", index, " date: ", date);
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
        // console.log("AddCourseComponent.handleNewClassOnDateChange: index: ", index, " date: ", date);
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
        //console.log("AddCourseComponent.handleSelectTopicModalOnSelect: topic: ", topic);
        
        if (course) {
            setCourse({
                ...course,
                topics: topic
            });
        }

    }

    return (
        <>
            {course === undefined ? (
                <NewCourseForm onSubmit={handleNewCourseFormOnSubmit}/>
            ) : (
                
                <>
                    <div className="navbar bg-primary text-primary-content rounded-xl border  mb-2">
                            <button 
                                className="btn btn-ghost text-white"
                                onClick={handleAddTopic}
                            >Add/Edit Topic</button>
                     
                
                            <button
                                className="btn btn-ghost text-white"
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
                        </div>
                        <div className = "mt-2">
                            <button
                                className="btn btn-primary text-white"
                                onClick={() => console.log("Course: ", course)}
                            >Test Course</button>
                        </div>
                    </div>
                </>

            )}
            {showSelectTopicModal && (
                <SelectTopicModal 
                    open={showSelectTopicModal} 
                    onClose={handleSelectTopicModalOnClose} 
                    onSelect={(topic: Topic[]) => handleSelectTopicModalOnSelect(topic)} 
                    topics={course?.topics || []} 
                    /> 
            )}

        </>
    );
}

export default AddCourseComponent;
