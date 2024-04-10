'use client';
import { AddClassByCourseId, DeleteClassById, EditClassById } from "@/Utilities/api";
import { Class } from "@/app/shared/types/sharedTypes";
import { ChangeEvent, useEffect, useState } from "react";
import moment from 'moment-timezone';
import { on } from "events";

interface ClassInfoCardProps {
    class: Class;
    onAdd: (updatedClassSchdedule : Class | null) => void;
    onDelete: (id: number | null) => void;
    editMode: boolean;
    onError: (message: string) => void;
};

/**
 * Renders a card component for displaying class information. 
 * 
 * @param class - The class object.
 * @param onAdd - Callback function to add a class schedule.
 * @param onDelete - Callback function to delete a class schedule.
 * @param editMode - Flag indicating whether the card is in edit mode.
 */
const ClassInfoCard: React.FC<ClassInfoCardProps> = ({class : cls, onAdd, onDelete, editMode, onError}) => {
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
        
        // If the classId is 0, then we are adding a new class
        // Otherwise, we are editing an existing class.
         
        if (cls.classId == 0) {
            const response = await AddClassByCourseId(cls.courseId, editedClass.scheduleStart, editedClass.scheduleEnd);
            // This API will return the new class object with the classId set.
            // If the response is successful, add the new class to the parent component
            if (response.status === 201) {
                const newClass: Class = response.data;
                setEditedClass(newClass);
                setClassId(newClass.classId);
                onAdd(newClass);
                setEditClass(false);
               
            } else
            {
                console.error(response);
            }
        }
        else // if cls.classId  != 0
        {
            const response = await EditClassById(cls.classId, editedClass.scheduleStart, editedClass.scheduleEnd);
            if (response.status === 200) {
                onAdd(editedClass);
            } else {
                console.error(response);
            }
        }

        setEditClass(false);
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

            const response = await DeleteClassById(editedClass.classId);
            
            if (response.status !== 200) {
                onError('Error deleting class \n' + response);
                return;
            }
            
            onDelete(editedClass.classId);
            setDeleted(true);

        } else {

            onDelete(null);
            setDeleted(true);

        }
    }


    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>): void => {

        const updateDate = (date: string) => {
            const oldTime = moment.utc(date).format('HH:mm:ss.SS');
            return moment.utc(`${event.target.value}T${oldTime}`).format('YYYY-MM-DDTHH:mm:ss[Z]')
        };

        const newStartDateTime = updateDate(editedClass.scheduleStart);
        const newEndDateTime = updateDate(editedClass.scheduleEnd);

        setEditedClass((prevState) => ({
            ...prevState,
            scheduleStart: newStartDateTime, scheduleEnd: newEndDateTime,
        }));

    }

    const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {

        const newScheduleStart = updateTime(editedClass.scheduleStart, event.target.value)
        
        setEditedClass((prevState) => ({
            ...prevState,
            scheduleStart: newScheduleStart,
        }));
    }

    const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
       
        const newScheduleEnd = updateTime(editedClass.scheduleEnd, event.target.value)
        
        setEditedClass((prevState) => ({
            ...prevState,
            scheduleEnd: newScheduleEnd,
        }));

    }

    // Helper Methods

    const updateTime = (date: string, time: string) => {
        const localTime = moment.tz(date, 'America/Denver');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        localTime.hours(hours).minutes(minutes).seconds(seconds);
        return localTime.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
    }
   

    const getStartDate = (date: string | null) => {
        
        if (date === null) {
            return null;
        }

        return moment.utc(date).tz('America/Denver').format('dddd, MMMM DD, YYYY');
    }

    const formatStringToDate = (dateString: string) => {
        return moment(dateString).format('YYYY-MM-DD');
    }

    const getTime = (date: string) => {
        return moment.utc(date).tz('America/Denver').format('h:mm A'); 
    }

    const formatTime = (time: string) => {
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
