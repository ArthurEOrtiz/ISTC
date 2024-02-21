'use client';
import { ClassSchedule } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface ClassInfoCardProps {
    classSchedule: ClassSchedule;
};

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({classSchedule}) => {
    const [editClass, setEditClass] = useState<Boolean>(false);

    const getStartDate = (date: string) => {
        const startDate = new Date(date);
        const formattedDate = startDate.toLocaleDateString(
            'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            }
        );
        return formattedDate;
    }

    const getTime = (date: string) => {
        const startTime = new Date(date);
        const formattedTime = startTime.toLocaleTimeString(
            'en-US', {
                hour: 'numeric',
                minute: 'numeric'
            }
        );
        return formattedTime;
    }

    const handleEdit = () => {
        setEditClass(true);
    }

    const handleSave = () => {
        setEditClass(false);
    }
        
    if (!editClass) {
        return (
            <div className="card w-1/2 bg-base-100 shadow-xl m-2">
            <div className="card-body">
                <label className="text-1xl font-bold" htmlFor="date">Date</label>
                <p id="date" className="text-base">{getStartDate(classSchedule.scheduleStart)}</p>
                <div className="flex justify-between">
                    <div>
                        <label className="text-1xl font-bold" htmlFor="startTime">Start Time</label>
                        <p id="startTime" className="text-base">{getTime(classSchedule.scheduleStart)}</p>
                    </div>
                    <div>
                        <label className="text-1xl font-bold" htmlFor="endTime">End Time</label>
                        <p id="endTime" className="text-base">{getTime(classSchedule.scheduleEnd)}</p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button
                    onClick= {handleEdit}
                    className="btn btn-primary text-white">
                        Edit
                    </button>
                </div>
            </div>
        </div>
        )
    } else
    {
        return(
            <>
                <p>EDITCOURSE</p>
                <button onClick={handleSave} className="btn btn-primary text-white">Save Changes</button>
            </>
        )
        
    }
}

export default ClassInfoCard;
