// NewClass.tsx
import { time } from 'console';
import React, { useState } from 'react';

interface NewClassProps {
    scheduleDate: Date; // Prop to receive the class date
    onDelete: () => void; // Prop to receive the delete event
    onDateChange: (date: Date) => void; // Prop to receive the date change event
    onStartTimeChange: (time: string) => void; // Prop to receive the start time change event
}


const NewClass: React.FC<NewClassProps> = ({ scheduleDate, onDelete, onDateChange, onStartTimeChange }) => {
    // const [isVisible, setIsVisible] = useState<boolean>(true);
    const [startTime, setStartTime] = useState<string>(); // Set the default start time to 09:00
    const handleRemoveClick = () => {
        onDelete();
    };

    const handleClassDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDateChange(new Date(event.target.value));
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startTime = event.target.value;
        onStartTimeChange(startTime);
        setStartTime(startTime);
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
                        defaultValue={scheduleDate.toISOString().split('T')[0]}
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
                        defaultValue="09:00"
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
                        defaultValue="17:00"
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClass;
