'use client';
import React, { useEffect, useState } from 'react';


interface NewClassProps {
    scheduleStart: Date; // Prop to receive the schedule start date
    scheduleEnd: Date; // Prop to receive the schedule end date
    onDelete: () => void; // Prop to receive the delete event
    onScheduleStartChange: (date: Date) => void; // Prop to receive the schedule start change event
    onScheduleEndChange: (date: Date) => void; // Prop to receive the schedule end change event
}

const NewClass: React.FC<NewClassProps> = ({ scheduleStart, scheduleEnd,  onDelete, onScheduleStartChange, onScheduleEndChange }) => {
    // console.log("NewClass.scheduleStart: ", scheduleStart);
    // console.log("NewClass.scheduleEnd: ", scheduleEnd);
    
    const [classDate, setClassDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        // Extract date and time components from schedulStart. 
        const startDate = new Date(scheduleStart);
        const startDateString = startDate.toISOString().split('T')[0];
        const startTimeString = startDate.toTimeString().split(' ')[0].slice(0, 5);
;


        setClassDate(startDateString);
        setStart(startTimeString);
    }, [scheduleStart]);

    useEffect(() => {
        // Extract date and time components from schedulEnd. 
        const endDate = new Date(scheduleEnd);
        const endTimeString = endDate.toTimeString().split(' ')[0].slice(0, 5);

        setEnd(endTimeString);
    }, [scheduleEnd]);


    
    
    const handleRemoveClick = () => {
        onDelete();
    };

    const handleClassDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setClassDate(date);
        const combinedDateTime = new Date(`${date}T${start}:00`);
        onScheduleStartChange(combinedDateTime);
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
                    <input
                        type="date"
                        name="classDate"
                        id="classDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={classDate}
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
                        defaultValue={start}
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
                        defaultValue={end}
                        onChange = {handleEndTimeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClass;
