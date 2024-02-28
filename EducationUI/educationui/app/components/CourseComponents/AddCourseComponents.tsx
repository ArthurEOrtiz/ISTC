'use client';
import { ClassSchedule, Course } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewCourseForm from './NewCourseForm';
import CourseInfoCard from './CourseInfoCard';
import NewClass from './NewClass';

const AddCourseComponent: React.FC = () => {    
    const [course, setCourse] = useState<Course>();

    // Event Handlers this component. 
    const handleAddClass = () => {
        
        // Create a Date object for today
        const today = new Date();
    
        // Set hours and minutes for the start time (9 am)
        const startHour = 9;
        const startMinutes = 0;
        const scheduleStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinutes).toISOString();
    
        // Set hours and minutes for the end time (5 pm)
        const endHour = 17; // 5 pm in 24-hour format
        const endMinutes = 0;
        const scheduleEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinutes).toISOString();
    
        // Create the new class object
        const newClass: ClassSchedule = {
            classId: null,
            courseId: null,
            scheduleStart: scheduleStart,
            scheduleEnd: scheduleEnd,
            attendance: [],
        };
    
         // Update the course state by adding the new class to the classes array only if 
         // the course state is not undefined.
        if (course) {
            setCourse({
                ...course,
                classes: [...course.classes, newClass]
            });
        }

        console.log("AddCourseComponent.handleAddClass: course", course); // REMOVE AFTER DEBUGGING
    };
    

    // Event Handlers for Components
    const handleNewCourseFormOnSubmit = (course: Course) => {
        console.log("AddCourseComponent.handleNewCourseFormOnSubmit: course: ", course);
        setCourse(course);
    }

    const handleCourseInfoCardOnSave = (course: Course) => {
        console.log("AddCourseComponent.handleCourseInfoCardOnSave: course: ", course);
        setCourse(course);
    }

    const handleNewClassOnDelete = (index: number) => {
        console.log("AddCourseComponent.handleNewClassOnDelete: index: ", index);
        if (course) {
            const newClasses = course.classes.filter((classItem, classIndex) => classIndex !== index);
            setCourse({
                ...course,
                classes: newClasses
            });
        }
    }

    

    return (
        <>
            {course === undefined ? (
                <NewCourseForm onSubmit={handleNewCourseFormOnSubmit}/>
            ) : (
                
                <>
                    <div>
                        <CourseInfoCard course={course} onSave={handleCourseInfoCardOnSave} />
                    </div>
                    <div>
                        {course.classes.map((classItem, index) => (
                            
                            <div className="mt-2">
                                <NewClass
                                    key={index}
                                    scheduleStart={classItem.scheduleStart}
                                    scheduleEnd={classItem.scheduleEnd}
                                    onDelete={() => handleNewClassOnDelete(index)}
                                    onDateChange={(date: string) => console.log("Date changed to: ", date)}
                                    onStartTimeChange={(time: string) => console.log("Start time changed to: ", time)}
                                    onEndTimeChange={(time: string) => console.log("End time changed to: ", time)}
                                />
                            </div>
                            ))
                        }
                        <div className = "mt-2">
                            <button
                                className="btn btn-primary text-white"
                                onClick={handleAddClass}
                            > Add Class </button>
                        </div>
                    </div>
                </>

            )}
        </>
    );
}

export default AddCourseComponent;
