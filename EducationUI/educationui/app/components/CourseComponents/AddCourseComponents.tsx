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
        const scheduleStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinutes);
    
        // Set hours and minutes for the end time (5 pm)
        const endHour = 17; // 5 pm in 24-hour format
        const endMinutes = 0;
        const scheduleEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinutes);
    
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
        // if (course) {
        //     console.log("AddCourseComponent.handleNewClassOnDateChange: course: ", course);
        // } else {
        //     console.log("AddCourseComponent.handleNewClassOnDateChange: course is undefined");
        // }

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
        // if (course) {
        //     const newClasses = [...course.classes];
        //     newClasses[index].scheduleEnd = date;
        //     setCourse({
        //         ...course,
        //         classes: newClasses
        //     });
        // }
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
