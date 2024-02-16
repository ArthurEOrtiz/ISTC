import React from 'react';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import CourseCard from './CourseCard';
import NewClass from './NewClass';

interface ClassFormProps {
    courseFormData: CourseFormData | null;
    classes: { scheduleDate: Date; startTime: string; endTime: string; }[];
    onDeleteClass: (index: number) => void;
    onClassDateChange: (date: Date) => void;
    onStartTimeChange: (time: string) => void;
    onEndTimeChange: (time: string) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ courseFormData, classes, onDeleteClass, onClassDateChange, onStartTimeChange, onEndTimeChange }) => {

    return (
        <>
            <div className="mb-3">
                <CourseCard courseFormData={courseFormData} />
            </div>
            <div>
                {classes.map((classItem, index) => (
                    <div key={index} className="mb-4">
                        <NewClass 
                            scheduleDate={classItem.scheduleDate} 
                            startTime={classItem.startTime} 
                            endTime={classItem.endTime}
                            onDelete={() => onDeleteClass(index)}
                            onDateChange={onClassDateChange}
                            onStartTimeChange={onStartTimeChange}
                            onEndTimeChange={onEndTimeChange}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ClassForm;
