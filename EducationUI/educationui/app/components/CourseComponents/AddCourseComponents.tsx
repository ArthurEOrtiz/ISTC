'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { Course, ClassSchedule, CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewClassMenu from './NewClassMenu';
import ConfirmationDialog from '../ConfirmationDialog';
import axios from 'axios';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);
    const [classes, setClasses] = useState<{ scheduleDate: Date; startTime: string; endTime: string; }[]>([]);
    const [classDate, setClassDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<string>("09:00");
    const [endTime, setEndTime] = useState<string>("17:00");
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        setIsCourseFormVisible(false); 
    }

    const handleBackToCourseForm = () => {
        setIsCourseFormVisible(true);
    }

    const addClass = () => {
        // Calculate the date for the new class
        const today = new Date();
        let nextClassDate;
        if (classes.length === 0) {
            nextClassDate = today;
        } else {
            nextClassDate = new Date(new Date(classDate.getTime() + 86400000));
        }

        setClassDate(nextClassDate);

        const newClass = {
            scheduleDate: nextClassDate,
            startTime: startTime,
            endTime: endTime,
        };

        setClasses(previousClasses => [...previousClasses, newClass]);
    };

    const deleteClass = (index: number) => {
        setClasses(previousClasses => {
            const updatedClasses = previousClasses.filter((_, i) => i !== index);
            if (updatedClasses.length === 0) {
                setClassDate(new Date()); // Reset classDate to today if all classes are deleted
            }
            return updatedClasses;
        });
    };

    const handleClassDateChange = (date: Date) => {
        setClassDate(date);
    };

    const handleStartTimeChange = (time: string) => {
        setStartTime(time);
    }

    const handleEndTimeChange = (time: string) => {
        setEndTime(time);
    }

    const onSaveCourse = (): void  => {
        console.log("Save course");
        setShowConfirmationDialog(true);
    }

    const handleCancelSave = () => {
        setShowConfirmationDialog(false);
    }

    const handleConfirmSave = () => {   
        setShowConfirmationDialog(false);
        const transformedClasses = transformClasses();
        const combinedData = combineData(transformedClasses);
        handleSaveToApi(combinedData);
    }

    const transformClasses = (): ClassSchedule[] => {
        const transformedClasses = classes.map(({ scheduleDate, startTime, endTime }) => {
            // Convert scheduleDate string to Date object
            const date = new Date(scheduleDate);
            
            // Split startTime and endTime strings into hours and minutes
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);
    
            // Set hours and minutes for start and end times
            const scheduleStart = new Date(date);
            scheduleStart.setUTCHours(startHour, startMinute, 0, 0);
    
            const scheduleEnd = new Date(date);
            scheduleEnd.setUTCHours(endHour, endMinute, 0, 0);
    
            return {
                classId: 0,
                courseId: 0,
                ScheduleStart: scheduleStart.toISOString(),
                ScheduleEnd: scheduleEnd.toISOString()
            };
        });
        return transformedClasses;
    };

    const combineData = (transformedClasses : ClassSchedule []) : Course => {
        return {
            courseId: 0,
            title: courseFormData?.title ||'',
            description: courseFormData?.description ||'',
            attendanceCredit: courseFormData?.attendanceCredit || 0,
            completionCredit: courseFormData?.completionCredit || 0,
            maxAttendance: courseFormData?.maxAttendance || 0,
            enrollmentDeadline: courseFormData?.enrollmentDeadline ||'',
            instructorName: courseFormData?.instructorName ||'',
            instructorEmail: courseFormData?.instructorEmail ||'',
            pdf: courseFormData?.pdf ||'',
            location: 
            {
                locationId: 0,
                description: courseFormData?.locationDescription ||'',
                room : courseFormData?.room ||'',
                remoteLink: courseFormData?.remoteLink ||'',
                addressLine1: courseFormData?.addressLine1 ||'',
                addressLine2: courseFormData?.addressLine2 ||'',
                city: courseFormData?.city ||'',
                state: courseFormData?.state ||'',
                postalCode: courseFormData?.postalCode ||'',
            },
            classes: transformedClasses
        };
    }

    const handleSaveToApi = async (combinedData: Course) => {
        try {
            const response = await axios.post('https://localhost:7144/course/postcourse', combinedData);
            localStorage.removeItem('courseFormData');
            console.log('Course saved successfully', response);
        } catch (error) {
            console.error('Error saving course', error);
        }
    }

    return (
        <div>
            {isCourseFormVisible ?
                (<CourseForm onSubmit={handleFormSubmit} />) :
                (<div>
                    <ClassForm
                        courseFormData={courseFormData}
                        classes={classes}
                        onDeleteClass={deleteClass}
                        onClassDateChange={handleClassDateChange}
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                    />
                    <div>
                        <NewClassMenu onBack={handleBackToCourseForm} onAddClass={addClass} onSaveCourse={onSaveCourse} />
                    </div>
                </div>)
            }
            {showConfirmationDialog && (
                <ConfirmationDialog
                    title="Save Course"
                    message="Are you sure you want to save the course?"
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                    />
            )}
        </div>
    );
    
}

export default AddCourseComponent


