import React from 'react';

interface DayProps {
    day: string;
}

const Day: React.FC<DayProps> = ({ day }) => {

    if (day === '') return null;


    return (
        <div className=" bg-white">
            <div>
                {day}
            </div>
            <div>
                {/* Add events here */}
                <p>Some Class or Something</p>
            </div>
        </div>
    )
           
}

export default Day;