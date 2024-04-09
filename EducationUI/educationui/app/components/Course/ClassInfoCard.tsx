'use client';
import { AddClassByCourseId, DeleteClassById, EditClassById } from "@/Utilities/api";
import { Class } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, useEffect, useState } from "react";
import moment from 'moment-timezone';

interface ClassInfoCardProps {
    class: Class;
    onAdd: (updatedClassSchdedule : Class | null) => void;
    onDelete: (id: number | null) => void;
    editMode: boolean;
};

/**
 * Renders a card component for displaying class information. 
 * 
 * @param class - The class object.
 * @param onAdd - Callback function to add a class schedule.
 * @param onDelete - Callback function to delete a class schedule.
 * @param editMode - Flag indicating whether the card is in edit mode.
 */
const ClassInfoCard: React.FC<ClassInfoCardProps> = ({class : cls, onAdd, onDelete, editMode}) => {
    const [editClass, setEditClass] = useState<Boolean>(false);
    const [editedClass, setEditedClass] = useState<Class>(cls);
    const [classId, setClassId] = useState<number>(cls.classId);
    const [deleted, setDeleted] = useState<Boolean>(false);
    

    useEffect(() => { // This allows the parent class to set the edit mode
        if (editMode) {
            setEditClass(true);
        }   
    }
    , [editMode]);

    // Handlers
    const handleEdit = () => {
        setEditClass(true);
    }

    const handleSave = async () => {
        // First make sure that the editedClass has the correct format for the API.
        // This is because if the date was ever incorrectly formatted, it will be a string and not a Date object.

        let scheduleStart : string | null = null;
        let scheduleEnd : string | null = null

        try {
            scheduleStart = editedClass.scheduleStart.toISOString();
            scheduleEnd = editedClass.scheduleEnd.toISOString();
        } catch (error) {
            console.error(error);
            return;
        }
        
        // Now we send it to the API, if the classId is 0, then we are adding a new class
        // Otherwise, we are editing an existing class.
         
        if (cls.classId == 0) {
            const response = await AddClassByCourseId(cls.courseId, scheduleStart, scheduleEnd);
            // This API will return the new class object with the classId set.
            // If the response is successful, add the new class to the parent component
            if (response.status === 201) {
                const newClass: Class = response.data;
                setEditedClass(newClass);
                setClassId(newClass.classId);
                onAdd(newClass);
                setEditClass(false);
                console.log('Class added successfully');
            } else
            {
                console.error(response);
            }
        }
        else // if cls.classId  != 0
        {
            const response = await EditClassById(cls.classId, scheduleStart, scheduleEnd);
            if (response.status === 200) {
                onAdd(editedClass);
            } else {
                console.error(response);
            }
        }

        //setEditClass(false);
    }

    const handleCancel = () => {

        if (cls.classId == 0) {
            onDelete(null);
            setDeleted(true);
        } else {
            setEditClass(false);
            setEditedClass(cls);
        }

    }

    const handleDelete = async () => {

        if (cls.classId != 0) {

            await DeleteClassById(editedClass.classId);
            
            onDelete(editedClass.classId);
            setDeleted(true);

        } else {

            onDelete(null);
            setDeleted(true);

        }
    }


    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const oldStartTime = editedClass.scheduleStart.toISOString().split('T')[1];
        const newStartDateTime = new Date(`${event.target.value}T${oldStartTime}`);

        setEditedClass((prevState) => ({
            ...prevState,
            scheduleStart: newStartDateTime as unknown as Date, 
        }));

    }

    const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const oldStartDate = editedClass.scheduleStart.toISOString();
        const newScheduleStart = new Date(`${oldStartDate.split('T')[0]}T${event.target.value}`);
        
        setEditedClass((prevState) => ({
            ...prevState,
            scheduleStart: newScheduleStart,
        }));
    }

    const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const oldEndDate = editedClass.scheduleEnd.toISOString();
        const newScheduleEnd = new Date(`${oldEndDate.split('T')[0]}T${event.target.value}`);
        
        setEditedClass((prevState) => ({
            ...prevState,
            scheduleEnd: newScheduleEnd,
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
        return moment.utc(date).tz('America/Denver').format('h:mm A'); 
    }

    const formatTime = (time: Date) => {
        return moment.utc(time).tz('America/Denver').format('HH:mm');
    }

    if (deleted) {
        return null;
    }

    if (!editClass) {
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
                                {getStartDate(cls.scheduleStart)}
                            </p>
                        </div>


                        <div className="flex items-center">
                            <label 
                                className="text-1xl font-bold mr-1"
                                htmlFor="classId">
                                    Class Id:
                            </label>
                            <p id="classId" className="text-base">
                                {classId}
                            </p>
                        </div>
 
                    </div>
                    

                    <div className="flex justify-between">
                        <div>
                            <label className="text-1xl font-bold" htmlFor="startTime">Start Time</label>
                            <p id="startTime" className="text-base">{getTime(cls.scheduleStart)}</p>
                        </div>
                        <div>
                            <label className="text-1xl font-bold" htmlFor="endTime">End Time</label>
                            <p id="endTime" className="text-base">{getTime(cls.scheduleEnd)}</p>
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
                        defaultValue={formatStringToDate(cls.scheduleStart)}/>

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
                                defaultValue={formatTime(cls.scheduleStart)}/>
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
                                defaultValue={formatTime(cls.scheduleEnd)}/>
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
