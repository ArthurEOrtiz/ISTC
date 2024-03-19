'use client';   
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Course } from '@/app/shared/types/sharedTypes';

const CourseCalendar: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    
    
    const localizer = momentLocalizer(moment);


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
