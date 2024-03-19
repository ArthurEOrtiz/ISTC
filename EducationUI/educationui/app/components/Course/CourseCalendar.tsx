'use client';   
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CourseCalendar: React.FC = () => {
    // The localizer is what will be used to format the dates on the calendar and it also handles all interanal
    // date calculations. We are using moment.js as the localizer here.
    const [localizer, setLocalizer] = useState(momentLocalizer(moment));

    // The current range is what will be used to limit the search of events to the current month.
    const [currentRange, setCurrentRange] = useState({
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate(),
    });
    

    const events = [
        {
            id: 1,
            title: 'Event 1',
            start: '2024-03-01T10:00:00',
            end: '2024-03-05T12:00:00',
        },
        {
            id: 2,
            title: 'Event 2',
            start: '2024-03-04T10:00:00',
            end: '2024-03-08T12:00:00',
        },
    ];

    const handleNaigate = (date: Date) => {
        setCurrentRange({
            start: moment(date).startOf('month').toDate(),
            end: moment(date).endOf('month').toDate(),
        });

        
        console.log(currentRange);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-screen-lg w-full h-full bg-gray-100 p-4 rounded-lg">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    
                />
            </div>
        </div>
    );
};

export default CourseCalendar;
