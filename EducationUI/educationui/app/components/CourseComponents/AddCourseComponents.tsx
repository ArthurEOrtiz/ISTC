'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewClass from './NewClass';
import NewClassMenu from './NewClassMenu';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);
    const [classes, setClasses] = useState<{ scheduleDate: Date; startTime: string; endTime: string; }[]>([]);
    const [classDate, setClassDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<string>("09:00");
    const [endTime, setEndTime] = useState<string>("17:00");

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        setIsCourseFormVisible(false); 
    }

    const handleBackToCourseForm = () => {
        setIsCourseFormVisible(true);
    }

    const addClass = () => {
        // Calculate the date for the new class
        const today = new Date();
        let nextClassDate;
        if (classes.length === 0) {
            nextClassDate = today;
        } else {
            nextClassDate = new Date(new Date(classDate.getTime() + 86400000));
        }

        setClassDate(nextClassDate);

        const newClass = {
            scheduleDate: nextClassDate,
            startTime: startTime,
            endTime: endTime,
        };

        setClasses(previousClasses => [...previousClasses, newClass]); // TODO: Refactor after testing. 
    };

    const deleteClass = (index: number) => {
        setClasses(previousClasses => {
            const updatedClasses = previousClasses.filter((_, i) => i !== index);
            if (updatedClasses.length === 0) {
                setClassDate(new Date()); // Reset classDate to today if all classes are deleted
            }
            return updatedClasses;
        });
    };

    const handleClassDateChange = (date: Date) => {
        setClassDate(date);
    };

    const handleStartTimeChange = (time: string) => {
        setStartTime(time);
    }

    const handleEndTimeChange = (time: string) => {
        setEndTime(time);
    }

    return (
        <>
            {isCourseFormVisible ? 
                (<CourseForm onSubmit={handleFormSubmit}/>) :
                (<>
                    <NewClassMenu onBack={handleBackToCourseForm} onAddClass={addClass} />
                    <ClassForm 
                        courseFormData={courseFormData} 
                        classes={classes} 
                        onDeleteClass={deleteClass} 
                        onClassDateChange={handleClassDateChange}
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                    />
                </>)
            }
        </>
        
    );
}

export default AddCourseComponent