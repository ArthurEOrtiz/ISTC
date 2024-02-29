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
            classId: null,
            courseId: null,
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
        }
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
            const newClasses = [...course.classes];
            console.log("AddCourseComponent.handleNewClassOnDelete: newClasses: ", newClasses);
            newClasses.splice(index, 1); // Remove the class at the specified index
            console.log("AddCourseComponent.handleNewClassOnDelete: newClasses: ", newClasses);
            // setCourse({
            //     ...course,
            //     classes: newClasses
            // });
        }
    }

    const handleNewClassOnScheduleStartChange = (index: number, date: Date) => {
        console.log("AddCourseComponent.handleNewClassOnDateChange: index: ", index, " date: ", date);
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
        console.log("AddCourseComponent.handleNewClassOnDateChange: index: ", index, " date: ", date);
        if (course) {
            const newClasses = [...course.classes];
            newClasses[index].scheduleEnd = date;
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
                            
                            <div className="mt-2" key="index"> 
                                <NewClass
                                    key={index}
                                    scheduleStart={classItem.scheduleStart}
                                    scheduleEnd={classItem.scheduleEnd}
                                    onDelete={() => handleNewClassOnDelete(index)}
                                    onScheduleStartChange={(date: string) => handleNewClassOnScheduleStartChange(index, date)}
                                    onScheduleEndChange={(date: string) => handleNewClassOnScheduleEndChange(index, date)}
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
                        <div className = "mt-2">
                            <button
                                className="btn btn-primary text-white"
                                onClick={() => console.log("Course: ", course)}
                            > Test Course </button>
                        </div>
                    </div>
                </>

            )}
        </>
    );
}

export default AddCourseComponent;
