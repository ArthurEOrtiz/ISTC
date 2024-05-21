'use client';   
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCoursesByDateRange } from '@/Utilities/api';
import { Course } from '@/app/shared/types/sharedTypes';
import { useRouter } from 'next/navigation';

interface CourseCalendarProps {
    isAdmin: boolean;
    courses: Course[];  
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({isAdmin, courses}) => {
    // The router is used to redirect the user to the course detail page when a course is clicked on the calendar.
    const router = useRouter();

    // The localizer is what will be used to format the dates on the calendar and it also handles all interanal
    // date calculations. We are using moment.js as the localizer here.
    const localizer = momentLocalizer(moment);

    // The current range is what will be used to limit the search of events to the current month.
    const [currentRange, setCurrentRange] = useState({
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate(),
    });

    // This is the state that will hold the courses that will be displayed on the calendar.
    // const [courses, setCourses ] = useState<Course []>([]);

    // This effect will run when the component mounts and when the currentRange changes. It will fetch the courses
    // that are within the current range and set the courses state with the result.
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const startDate = moment(currentRange.start).format('YYYY-MM-DD');
    //         const endDate = moment(currentRange.end).format('YYYY-MM-DD');
    //         const data = await getCoursesByDateRange(startDate, endDate);
    //         setCourses(data);
    //     };
    //     fetchData();
    // }
    // , [currentRange]);
        
    // This function will convert the courses to events that can be displayed on the calendar.
    // It will take the first class of the course as the start date and the last class of the course as the end date.
    // Then if the course has a first class and a last class it will add the course to the events array.
    const convertCoursesToEvents = (courses: Course[]) => {
        const events: any[] = [];
        courses.forEach((course) => {
            const firstClass = course.classes[0];
            const lastClass = course.classes[course.classes.length - 1];
            if (firstClass && lastClass){
                events.push({
                id: course.courseId,
                title: course.title,
                start: new Date(firstClass.scheduleStart),
                end: new Date(lastClass.scheduleEnd),
            });
            }
        });
        return events;
    }
    
    // This is the events that will be displayed on the calendar.
    const events = convertCoursesToEvents(courses);


    // This function will be called when the user navigates to a different month. It will set the currentRange state
    const handleNaigate = (date: Date) => {
        setCurrentRange({
            start: moment(date).startOf('month').toDate(),
            end: moment(date).endOf('month').toDate(),
        });
    }

    const handleSelectEvent = (event: any) => {
        if (isAdmin) {
            router.push(`/admin/editcourse/edit/course/${event.id}`)
        } else {
            router.push(`/courses/course/${event.id}`);
        }
    }

    return (
        <div className="h-screen flex justify-center">
            <div className="max-w-screen-lg w-full h-3/4 bg-base-200 p-4 rounded-lg">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={['month']}
                    onNavigate={handleNaigate}
                    onSelectEvent={handleSelectEvent}
                   
                />
            </div>
        </div>
    );
};

export default CourseCalendar;
