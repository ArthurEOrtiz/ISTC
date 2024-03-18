import React from 'react';
import Month from '../Calendar/Month';

const CourseCalendar: React.FC = () => {

    const currentMonth = 3;
    const currentYear = new Date().getFullYear();

    return (
        <div>
        <h1>Course Calendar</h1>
        <Month month={currentMonth} year={currentYear} />
        </div>
    );
}
    
export default CourseCalendar;
