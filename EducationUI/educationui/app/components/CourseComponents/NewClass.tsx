// NewClass.tsx
import React, { useEffect, useState } from 'react';

interface NewClassProps {
    scheduleDate: Date; // Prop to receive the class date
    startTime: string; // Prop to receive the start time
    endTime: string; // Prop to receive the end time
    onDelete: () => void; // Prop to receive the delete event
    onDateChange: (date: Date) => void; // Prop to receive the date change event
    onStartTimeChange: (time: string) => void; // Prop to receive the start time change event
    onEndTimeChange: (time: string) => void; // Prop to receive the end time change event
}

const NewClass: React.FC<NewClassProps> = ({ scheduleDate, startTime, endTime,  onDelete, onDateChange, onStartTimeChange, onEndTimeChange }) => {
    const [classDate, setClassDate] = useState(scheduleDate);
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime)

    useEffect(() => {
        setClassDate(scheduleDate);
    }, [scheduleDate]);

    useEffect(() => {
        setStart(startTime);
    }, [startTime]);

    useEffect(() => {
        setEnd(endTime);
    }, [endTime]);
    
    
    const handleRemoveClick = () => {
        onDelete();
    };

    const handleClassDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setClassDate(date);
        onDateChange(date);
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
        setStart(time);
        onStartTimeChange(time);
    }

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
        setEnd(time);
        onEndTimeChange(time);
    }


    return (
        <div className="bg-white shadow-md rounded-md p-4 relative">
            <button
                className="absolute top-0 right-0 mr-2 mt-1 bg-red-500 text-white px-2 py-1 rounded"
                onClick={handleRemoveClick}
            >
                Remove
            </button>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="classDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Class Date
                    </label>
                    {/* Set the default value of the class date input field */}
                    <input
                        type="date"
                        name="classDate"
                        id="classDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={classDate.toISOString().split('T')[0]}
                        onChange= {handleClassDateChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
                        Start Time
                    </label>
                    <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={start}
                        onChange={handleStartTimeChange}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">
                        End Time
                    </label>
                    <input
                        type="time"
                        name="endTime"
                        id="endTime"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={end}
                        onChange = {handleEndTimeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClass;
