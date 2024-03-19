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

    
    let content;

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
            <div className="text-center font-semibold text-sm">
                {day}
            </div>
            <div className="p-2">
            {}
                <div className="badge badge-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {content}
                    </div>
                </div>
      
        </div>
    );
}

export default Day;
