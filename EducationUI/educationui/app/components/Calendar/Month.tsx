import React from 'react';
import Day from './Day';

interface MonthProps {
    month: number; 
    year: number;
}

const Month: React.FC<MonthProps> = ({ month, year }) => {


    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Get the first day of the month
    // For march this returns 5, which is a Friday
    const firstDay = new Date(year, month - 1, 1).getDay();

    // Create an array of day numbers for the month
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Now I need to append the correct number of days to adjust for the first day of the month
    const daysArrayWithPadding: string[] = Array.from({ length: firstDay }, (_, index) => '');

    // Concatenate the two arrays
    daysArrayWithPadding.push(...daysArray.map(String));
    
    // Array of days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Helper function to convert month number to name
    const numberToMonth = (month: number): string => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1];
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 w-auto mx-auto">

            {/* Render the Month and Year */}
            <div className="bg-gray-100 text-gray-800 font-semibold text-center mb-2">
                {numberToMonth(month)} {year}
            </div>

            
            <div className="grid grid-cols-7 ">
                {/* Render the days of the week */}
                {daysOfWeek.map(day => (
                    <div key={day} className="bg-gray-100 border border-gray-300  p-2 text-center font-semibold">
                        {day}
                    </div>
                ))}

                {/* Render the days of the month */}
                {daysArrayWithPadding.map(day => {

                    return (
                        <div key={day} className="bg-gray-200 border border-gray-300  p-2 h-40">
                            <Day day={day} event={{name:"Some Course aboutstuff", startDay: 1, endDate: 5}} />
                        </div>
                    );
                    
                })}
                
            </div>
        </div>
    );
}

export default Month;
