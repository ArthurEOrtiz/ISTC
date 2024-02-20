'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewClassMenu from './NewClassMenu';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);
    const [classes, setClasses] = useState<{ scheduleDate: Date; startTime: string; endTime: string; }[]>([]);
    const [classDate, setClassDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<string>("09:00");
    const [endTime, setEndTime] = useState<string>("17:00");
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);

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

        setClasses(previousClasses => [...previousClasses, newClass]);
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

    const onSaveCourse = (): void  => {
        console.log("Save course");
        setShowConfirmationDialog(true);
    }

    const handleCancelSave = () => {
        setShowConfirmationDialog(false);
    }

    const handleConfirmSave = () => {   
        console.log(courseFormData);
        console.log(classes);
        setShowConfirmationDialog(false);
    }

    return (
        <div>
            {isCourseFormVisible ?
                (<CourseForm onSubmit={handleFormSubmit} />) :
                (<div>
                    <ClassForm
                        courseFormData={courseFormData}
                        classes={classes}
                        onDeleteClass={deleteClass}
                        onClassDateChange={handleClassDateChange}
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                    />
                    <div>
                        <NewClassMenu onBack={handleBackToCourseForm} onAddClass={addClass} onSaveCourse={onSaveCourse} />
                    </div>
                </div>)
            }
            {/* Confirmation dialog */}
            {showConfirmationDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-50">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to save?</h2>
                        <div className="flex justify-between">
                            <button onClick={handleConfirmSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Yes</button>
                            <button onClick={handleCancelSave} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default AddCourseComponent