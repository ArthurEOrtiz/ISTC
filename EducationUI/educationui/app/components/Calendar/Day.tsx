import React from 'react';

interface DayProps {
    day: string;
    event?: {
        name: string;
        startDay: number;
        endDay: number;
    };
}

const Day: React.FC<DayProps> = ({ day, event }) => {
    if (day === '') return null;

    
    let content = day;

    // Check if an event is provided and if the current day falls within the event duration
    if (event && event.startDay <= parseInt(day) && parseInt(day) <= event.endDay) {
    
        // If the current day is the first day of the event, display the event name
        if (parseInt(day) === event.startDay) {
            content = event.name;
        } else {
            // Otherwise, hide the day number
            content = "************";
        }
    }

    return (
        <div className="bg-white">
            <div className="text-center font-semibold">
                {day}
            </div>
      
        </div>
    );
}

export default Day;
