'use client';
import { Class } from '@/app/shared/types/sharedTypes';
import React, { useEffect, useState } from 'react';


interface NewClassProps {
    cls: Class; // Prop to receive the class object
    // scheduleStart: string; // Prop to receive the schedule start date
    // scheduleEnd: string; // Prop to receive the schedule end date
    onDelete: () => void; // Prop to receive the delete event
    onScheduleStartChange: (date: Date) => void; // Prop to receive the schedule start change event
    onScheduleEndChange: (date: Date) => void; // Prop to receive the schedule end change event
}


/**
 * Represents a component for creating a new class during course creation.
 * A thing to remember is that this will save to the database in UTC time, not local time.
 * This is a default behavior of the Date object in JavaScript.
 *
 * @component
 * @param {Class} props.cls - The class object.
 * @param {Date} props.scheduleStart - The schedule start date.
 * @param {Date} props.scheduleEnd - The schedule end date.
 * @param {Function} props.onDelete - The delete event handler.
 * @param {Function} props.onScheduleStartChange - The schedule start change event handler.
 * @param {Function} props.onScheduleEndChange - The schedule end change event handler.
 */
const NewClass: React.FC<NewClassProps> = ({cls,  onDelete, onScheduleStartChange, onScheduleEndChange }) => {
    const [classDate, setClassDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    useEffect(() => {
        // Extract date and time components from schedulStart. 
        const startDate = cls.scheduleStart;
        const startDateString = startDate.toISOString().split('T')[0];
        const startTimeString = startDate.toTimeString().split(' ')[0].slice(0, 5);

        setClassDate(startDateString);
        setStart(startTimeString);
    }, [cls]);

    useEffect(() => {
        // Extract date and time components from schedulEnd. 
        const endDate = cls.scheduleEnd;
        const endTimeString = endDate.toTimeString().split(' ')[0].slice(0, 5);

        setEnd(endTimeString);
    }, [cls]);
    
    // Handlers 
    const handleRemoveClick = () => {
        onDelete();
    };

    const handleClassDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
    
        if (!date) {

            event.target.value = new Date(classDate).toISOString().split('T')[0];
            return;

        } else {
            setClassDate(date);
            const combinedStartDateTime = new Date(`${date}T${start}:00`);
            const combinedEndDateTime = new Date(`${date}T${end}:00`);
            onScheduleStartChange(combinedStartDateTime);
            onScheduleEndChange(combinedEndDateTime);
        }
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const localTime = event.target.value
        setStart(localTime);
        const combinedDateTime = new Date( `${classDate}T${localTime}:00`);
        onScheduleStartChange(combinedDateTime);
    }

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
        setEnd(time);
        const combinedDateTime = new Date(`${classDate}T${time}:00`);
        onScheduleEndChange(combinedDateTime);
    }

    return (
        <div>
            <button
                className="absolute top-0 right-0 mr-2 mt-1 text-error px-2 py-1 rounded-full font-bold"
                onClick={handleRemoveClick}
            >
                Delete
            </button>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="classDate" className="block  text-sm font-bold mb-2">
                        Class Date
                    </label>
                    <input
                        type="date"
                        name="classDate"
                        id="classDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={classDate}
                        onChange= {handleClassDateChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="startTime" className="block  text-sm font-bold mb-2">
                        Start Time
                    </label>
                    <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={start}
                        onChange={handleStartTimeChange}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="endTime" className="block  text-sm font-bold mb-2">
                        End Time
                    </label>
                    <input
                        type="time"
                        name="endTime"
                        id="endTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={end}
                        onChange = {handleEndTimeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClass;


