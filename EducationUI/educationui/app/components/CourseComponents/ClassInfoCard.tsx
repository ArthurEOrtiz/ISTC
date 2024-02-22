'use client';
import { ClassSchedule } from "@/app/shared/types/sharedTypes";
import axios from "axios";
import { ChangeEvent, use, useEffect, useState } from "react";

interface ClassInfoCardProps {
    classSchedule: ClassSchedule | null;
    onDelete: (id: number | null) => void;
    editMode: boolean;
};

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({classSchedule, onDelete, editMode}) => {
    const [editClass, setEditClass] = useState<Boolean>(false);
    const [oldClassSchedule, setOldClassSchedule ] = useState<ClassSchedule |null >(classSchedule);
    const [editedClassSchedule, setEditedClassSchedule] = useState<ClassSchedule | null>(classSchedule);
    const [deleted, setDeleted] = useState<Boolean>(false);

    useEffect(() => {
        if (editMode) {
            setEditClass(true);
        }   
    }
    , [editMode]);

    const getStartDate = (date: string | null) => {
        
        if (date === null) {
            return null;
        }

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

    const formatStringToDate = (dateString: string) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
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

    const formatTime = (time: string) => {
        const timeObject = new Date(time);
        const hours = timeObject.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
        const minutes = timeObject.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
        return `${hours}:${minutes}`;
    }
    
    const handleEdit = () => {
        setEditClass(true);
    }

    const handleSave = async () => {
        try {
            const url = `https://localhost:7144/Class/EditClassById?id=${editedClassSchedule.classId}&newScheduleStart=${editedClassSchedule.scheduleStart}&newScheduleStop=${editedClassSchedule.scheduleEnd}`;
            const response = await axios.post(url);
            //console.log('Course saved successfully', response);
            setEditClass(false);
            setOldClassSchedule(editedClassSchedule);

        } catch (error) {
            console.error('Error saving course', error);
        }
    }

    const handleCancel = () => {
        setEditClass(false);
        setEditedClassSchedule(oldClassSchedule);
    }

    const handleDelete = async () => {
        try {
            const url = `https://localhost:7144/Class/DeleteClassById?id=${editedClassSchedule.classId}`;
            const response = await axios.delete(url);
            //console.log('Course deleted successfully', response);
            onDelete(editedClassSchedule.classId);
            setDeleted(true);
        } catch (error) {
            console.error('Error saving course', error);
        }
    }

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newStartDate = event.target.value;
        const oldStartDate = editedClassSchedule.scheduleStart;
        // I just need to update the date part of the string
        const oldStartTime = oldStartDate.split('T')[1];
        const newStartDateTime = `${newStartDate}T${oldStartTime}`;
        //console.log(newStartDateTime);

        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleStart: newStartDateTime,
        }));

    }

    const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newStartTime = event.target.value;
        const oldStartDate = editedClassSchedule.scheduleStart;
        // I just need to update the time part of the string
        const newStartDateTime = `${oldStartDate.split('T')[0]}T${newStartTime}`;
        //console.log(newStartDateTime);
        
        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleStart: newStartDateTime,
        }));

    }

    const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newEndTime = event.target.value;
        const oldEndDate = editedClassSchedule.scheduleEnd;
        // I just need to update the time part of the string
        const newEndDateTime = `${oldEndDate.split('T')[0]}T${newEndTime}`;
        //console.log(newEndDateTime);
        
        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleEnd: newEndDateTime,
        }));

    }

    if (deleted) {
        return null;
    }

    if (!editClass || !oldClassSchedule) {
        return (
            <div className="card w-1/2 bg-base-100 shadow-xl m-2">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <label className="text-1xl font-bold mr-1" htmlFor="date">Date:</label>
                            <p id="date" className="text-base">{getStartDate(oldClassSchedule.scheduleStart)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-1xl font-bold mr-1" htmlFor="classId">Class Id:</label>
                            <p id="classId" className="text-base">{oldClassSchedule.classId}</p>                                        
                        </div>
 
                    </div>
                    

                    <div className="flex justify-between">
                        <div>
                            <label className="text-1xl font-bold" htmlFor="startTime">Start Time</label>
                            <p id="startTime" className="text-base">{getTime(oldClassSchedule.scheduleStart)}</p>
                        </div>
                        <div>
                            <label className="text-1xl font-bold" htmlFor="endTime">End Time</label>
                            <p id="endTime" className="text-base">{getTime(oldClassSchedule.scheduleEnd)}</p>
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
        );
    } else
    {
        return(
            <div className="card w-1/2 bg-base-100 shadow-xl m-2">
                <div className="card-body">
                    <label className="text-1xl font-bold" htmlFor="date">Date</label>
                    <input 
                        type="date"
                        id="date" 
                        className="text-base"
                        onChange = {handleStartDateChange}
                        defaultValue={formatStringToDate(editedClassSchedule.scheduleStart)}/>

                    <div className="flex justify-between">
                        <div>
                            <label className="text-1xl font-bold" htmlFor="startTime">Start Time</label>
                            <input 
                                type="time" 
                                id="startTime" 
                                className="text-base" 
                                onChange = {handleStartTimeChange}
                                defaultValue={formatTime(editedClassSchedule.scheduleStart)}/>
                        </div>
                        <div>
                            <label className="text-1xl font-bold" htmlFor="endTime">End Time</label>
                            <input 
                                type="time" 
                                id="endTime" 
                                className="text-base" 
                                onChange = {handleEndTimeChange}
                                defaultValue={formatTime(editedClassSchedule.scheduleEnd)}/>
                        </div>
                    </div>
                    <div className="card-actions justify-end">

                        <button
                        onClick = {handleDelete}
                        className="btn btn-error text-white">
                            Delete
                        </button>

                        <button
                        onClick= {handleCancel}
                        className="btn btn-warning text-white">
                            Cancel
                        </button>

                        <button
                        onClick= {handleSave}
                        className="btn btn-primary text-white">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
        
    }
}

export default ClassInfoCard;
