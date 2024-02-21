import React, { useEffect, useRef, useState } from 'react';
import { Course, CourseFormData } from '@/app/shared/types/sharedTypes';
import NewClass from './NewClass';
import CourseInfoCard from './CourseInfoCard';

interface ClassFormProps {
    courseFormData: CourseFormData | null;
    classes: { scheduleDate: Date; startTime: string; endTime: string; }[];
    onDeleteClass: (index: number) => void;
    onClassDateChange: (date: Date) => void;
    onStartTimeChange: (time: string) => void;
    onEndTimeChange: (time: string) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ courseFormData, classes, onDeleteClass, onClassDateChange, onStartTimeChange, onEndTimeChange }) => {
    const [course, setCourse] = useState<Course >(
        {
            courseId: null,
            title: '',
            description: '',
            attendanceCredit: 0,
            completionCredit: 0,
            maxAttendance: 0,
            enrollmentDeadline: '',
            instructorName: '',
            instructorEmail: '',
            pdf: '',
            location: {
                locationId: null,
                description: '',
                room: '',
                remoteLink: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: ''
            },
            classes: []
        }
    );

    useEffect(() => {
        // Scroll to the bottom of the window after classes change
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }, [classes]);

    useEffect(() => {
        if (courseFormData) {
            setCourse({
                courseId: null,
                title: courseFormData.title,
                description: courseFormData.description,
                attendanceCredit: courseFormData.attendanceCredit,
                completionCredit: courseFormData.completionCredit,
                maxAttendance: courseFormData.maxAttendance,
                enrollmentDeadline: courseFormData.enrollmentDeadline,
                instructorName: courseFormData.instructorName,
                instructorEmail: courseFormData.instructorEmail,
                pdf: courseFormData.pdf,
                location: {
                    locationId: null,
                    description: courseFormData.locationDescription,
                    room: courseFormData.room,
                    remoteLink: courseFormData.remoteLink,
                    addressLine1: courseFormData.addressLine1,
                    addressLine2: courseFormData.addressLine2,
                    city: courseFormData.city,
                    state: courseFormData.state,
                    postalCode: courseFormData.postalCode
                },
                classes: classes.map(classItem => ({
                    classId: null,
                    courseId: null,
                    ScheduleStart: classItem.scheduleDate.toISOString(),
                    ScheduleEnd: classItem.scheduleDate.toISOString()
                }))
            });
        }
    }, []);

    return (
        <div>
            <div className="mb-3">
                <CourseInfoCard course={course} />
            </div>
            <div>
                {classes.map((classItem, index) => (
                    <div key={index} className="mb-4">
                        <NewClass 
                            scheduleDate={classItem.scheduleDate} 
                            startTime={classItem.startTime} 
                            endTime={classItem.endTime}
                            onDelete={() => onDeleteClass(index)}
                            onDateChange={onClassDateChange}
                            onStartTimeChange={onStartTimeChange}
                            onEndTimeChange={onEndTimeChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClassForm;
