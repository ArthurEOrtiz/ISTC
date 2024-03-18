'use client';
import { AddClassByCourseId, DeleteClassById, EditClassById } from "@/Utilities/api";
import { ClassSchedule } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, useEffect, useState } from "react";

interface ClassInfoCardProps {
    classSchedule: ClassSchedule;
    onAdd: (updatedClassSchdedule : ClassSchedule | null) => void;
    onDelete: (id: number | null) => void;
    editMode: boolean;
};

/**
 * Renders a card component for displaying class information. 
 * 
 * @param classSchedule - The class schedule object.
 * @param onAdd - Callback function to add a class schedule.
 * @param onDelete - Callback function to delete a class schedule.
 * @param editMode - Flag indicating whether the card is in edit mode.
 */
const ClassInfoCard: React.FC<ClassInfoCardProps> = ({classSchedule, onAdd, onDelete, editMode}) => {
    const [editClass, setEditClass] = useState<Boolean>(false);
    const [oldClassSchedule, setOldClassSchedule ] = useState<ClassSchedule>(classSchedule);
    const [editedClassSchedule, setEditedClassSchedule] = useState<ClassSchedule>(classSchedule);
    const [deleted, setDeleted] = useState<Boolean>(false);

    useEffect(() => {
        if (editMode) {
            setEditClass(true);
        }   
    }
    , [editMode]);

    // Handlers
    const handleEdit = () => {
        //console.log('Edit Class', oldClassSchedule.classId);
        setEditClass(true);
    }

    const handleSave = async () => {
         
        if (oldClassSchedule?.classId == null) {
            let responseData = null;
            try {
                responseData = await AddClassByCourseId(oldClassSchedule.courseId, editedClassSchedule.scheduleStart, editedClassSchedule.scheduleEnd);
            } catch (error) {
                throw error;
            } finally {
                if (responseData != null) {
                    const newClass: ClassSchedule = responseData;
                    setOldClassSchedule(newClass);
                    setEditedClassSchedule(newClass);
                    onAdd(newClass);
                }
            }
        }
        else if (oldClassSchedule?.classId != null)
        {
            let responseData = null;
            try {
                responseData = await EditClassById(oldClassSchedule.classId, editedClassSchedule.scheduleStart, editedClassSchedule.scheduleEnd);
            } catch (error) {
                throw error;
            } finally {
                if (responseData != null) {
                    setOldClassSchedule(editedClassSchedule);
                    onAdd(editedClassSchedule);
                }
            }
        }
        setEditClass(false);
  
    }

    const handleCancel = () => {

        if (oldClassSchedule?.classId == null) {
            onDelete(null);
            setDeleted(true);
        } else {
            setEditClass(false);
            setEditedClassSchedule(oldClassSchedule);
        }

    }

    const handleDelete = async () => {

        if (oldClassSchedule.classId) {
            await DeleteClassById(editedClassSchedule.classId);
            
            onDelete(editedClassSchedule.classId);
            setDeleted(true);

        } else {

            onDelete(null);
            setDeleted(true);

        }
    }


    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newStartDate = event.target.value;
        const oldStartDate = editedClassSchedule.scheduleStart.toString();

        // I just need to update the date part of the string
        const oldStartTime = oldStartDate.split('T')[1];
        const newStartDateTime = `${newStartDate}T${oldStartTime}`;

        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleStart: newStartDateTime as unknown as Date, 
        }));

    }

    const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newStartTime = event.target.value;
        const oldStartDate = editedClassSchedule.scheduleStart.toString();

        const newStartTimeObject = new Date(`${oldStartDate.split('T')[0]}T${newStartTime}`);
        const newStartTimeString = newStartTimeObject.toISOString().slice(0, -5);

        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleStart: newStartTimeString as unknown as Date,
        }));
    }

    const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newEndTime = event.target.value;
        const oldEndDate = editedClassSchedule.scheduleEnd.toString();
        
        const newEndTimeObject = new Date(`${oldEndDate.split('T')[0]}T${newEndTime}`);
        const newEndTimeString = newEndTimeObject.toISOString().slice(0, -5);
        
        setEditedClassSchedule((prevState) => ({
            ...prevState,
            scheduleEnd: newEndTimeString as unknown as Date,
        }));

    }

    // Helper Methods
    const getStartDate = (date: Date | null) => {
        
        if (date === null) {
            return null;
        }

        const localDateTime = new Date(`${date}Z`);

        const formattedDate = localDateTime.toLocaleDateString(
            'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            }
        );
        return formattedDate;
    }

    const formatStringToDate = (dateString: Date) => {
        const dateObject = new Date(`${dateString}z`);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const getTime = (date: Date) => {
        const startTime = new Date(`${date}z`);
        const formattedTime = startTime.toLocaleTimeString(
            'en-US', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Denver'
            }
        );
        return formattedTime;
    }

    const formatTime = (time: Date) => {
        const timeObject = new Date(`${time}z`);
        const hours = timeObject.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
        const minutes = timeObject.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
        return `${hours}:${minutes}`;
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
                            <label
                                className="text-1xl font-bold mr-1"
                                htmlFor="date">
                                    Date:
                            </label>
                            <p id="date" className="text-base">
                                {getStartDate(oldClassSchedule.scheduleStart)}
                            </p>
                        </div>


                        <div className="flex items-center">
                            <label 
                                className="text-1xl font-bold mr-1"
                                htmlFor="classId">
                                    Class Id:
                            </label>
                            <p id="classId" className="text-base">
                                {oldClassSchedule.classId}
                            </p>
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
                    <label className="text-1xl font-bold" htmlFor="date">
                        Date
                    </label>
                    <input 
                        type="date"
                        id="date" 
                        className="text-base"
                        onChange = {handleStartDateChange}
                        defaultValue={formatStringToDate(oldClassSchedule.scheduleStart)}/>

                    <div className="flex justify-between">
                        <div>
                            <label className="text-1xl font-bold mr-1" htmlFor="startTime">
                                Start Time
                            </label>
                            <input 
                                type="time" 
                                id="startTime" 
                                className="text-base" 
                                onChange = {handleStartTimeChange}
                                defaultValue={formatTime(oldClassSchedule.scheduleStart)}/>
                        </div>
                        <div>
                            <label className="text-1xl font-bold mr-1" htmlFor="endTime">
                                End Time
                            </label>
                            <input 
                                type="time" 
                                id="endTime" 
                                className="text-base" 
                                onChange = {handleEndTimeChange}
                                defaultValue={formatTime(oldClassSchedule.scheduleEnd)}/>
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