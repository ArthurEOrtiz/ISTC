'use client';
import { Class } from '@/app/shared/types/sharedTypes';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';


interface NewClassProps {
    cls: Class; // Prop to receive the class object
    disabled?: boolean; // Prop to disable the input fields
    onChange: (cls: Class) => void; // Prop to receive the change event
    onDelete: (cls: Class) => void; // Prop to receive the delete event
}

/**
 * Represents a component for creating a new class during course creation.
 * A thing to remember is that this will save to the database in UTC time, not local time.
 * This is a default behavior of the Date object in JavaScript.
 *
 * @component
 * @param {Class} props.cls - The class object.
 * @param {Function} props.onDelete - The delete event handler.
 */
const NewClass: React.FC<NewClassProps> = ({cls: incomingClass, disabled = false, onChange, onDelete }) => {
    const [cls, setCls] = useState(incomingClass);
    const [classDate, setClassDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        const startDateInMountainTime = moment.utc(incomingClass.scheduleStart).tz('America/Denver');
        
        const startDateString = startDateInMountainTime.format('YYYY-MM-DD');
        const startTimeString = startDateInMountainTime.local().format('HH:mm');

        setClassDate(startDateString);
        setStart(startTimeString);
    }, [incomingClass]);

    useEffect(() => {
        const endDate = incomingClass.scheduleEnd;
        const endDateInMountainTime = moment.utc(endDate).tz('America/Denver');
        const endTimeString = endDateInMountainTime.local().format('HH:mm');

        setEnd(endTimeString);
    }, [incomingClass]);

    useEffect(() => {
        onChange(cls);
    }
    , [cls])
    
    // Handlers 
    const handleRemoveClick = () => {
        onDelete(cls);
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
            setCls({
                ...cls,
                scheduleStart: combinedStartDateTime,
                scheduleEnd: combinedEndDateTime
            });
           
        }
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const localTime = event.target.value
        setStart(localTime);
        const combinedDateTime = new Date( `${classDate}T${localTime}:00`);
        // cls.scheduleStart = combinedDateTime;
        setCls({
            ...cls,
            scheduleStart: combinedDateTime
        });
    }

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
        setEnd(time);
        const combinedDateTime = new Date(`${classDate}T${time}:00`);
        //cls.scheduleEnd = combinedDateTime;
        setCls({
            ...cls,
            scheduleEnd: combinedDateTime
        });
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClass;


