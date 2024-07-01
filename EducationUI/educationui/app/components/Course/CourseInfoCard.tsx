'use client';
import { Course } from "@/app/shared/types/sharedTypes";
import moment from 'moment-timezone';
import { useEffect, useState } from "react";

interface CourseInfoCardProps {
    course: Course;
    expanded?: boolean;
};

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({ course, expanded = true }) => {
    // state
    const [ courseStatusColor, setCourseStatusColor ] = useState<'badge-success' | 'badge-warning' | 'badge-error'>();
    const [ courseStatusText, setCourseStatusText ] = useState<'Upcoming' | 'In Progress' | 'Archived'>();
    const [ pdfUrl, setPdfUrl ] = useState<string | null>(null);
    
    // effects
    useEffect(() => {
        switch (course.status) {
            case 'Upcoming':
                setCourseStatusColor('badge-success');
                setCourseStatusText('Upcoming');
                break;
            case 'InProgress':
                setCourseStatusColor('badge-warning');
                setCourseStatusText('In Progress');
                break;
            case 'Archived':
                setCourseStatusColor('badge-error');
                setCourseStatusText('Archived');
                break;
            default:
                break;
        }
    }, [course.status]);

    useEffect(() => {
        if (course.pdfId !== null) {
            setPdfUrl(downloadPDF());
        }
    }, [course.pdfId]);
    
    // helpers
    const formatToMountainTime = (utcDate: Date): string => {
        const mountainTime = moment.utc(utcDate).tz('America/Denver').format('dddd, MMMM Do YYYY, h:mm a');
        return mountainTime;
    }

    const downloadPDF = () => {
        if (course.pdf?.data) {
            const byteCharacters = atob(course.pdf.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: "application/pdf"});
            const url = URL.createObjectURL(blob);
            return url;
        }
        return "#";
    };

    // render
    // if course is empty, return a message
    if (Object.keys(course).length === 0) {
        return <p className="text-error">No information avaiable for this course. </p>;
    }
    // else, return the course information.
    return (
        <div className="space-y-2">
            {course.title ?(
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold">{course.title} </p>
                        <div className={`badge ${courseStatusColor ? courseStatusColor : 'badge-error'}`}>
                            <p className="text-white">{courseStatusText? courseStatusText : 'unknown'}</p>
                        </div>
                        {course.hasExam && (
                        <div className="badge badge-error">
                            <p className="text-white">{course.hasExam ? 'Exam' : 'No Exam'}</p>
                        </div>
                        )}
                    </div>
                    <p className="text-base">Course Id: {course.courseId}</p>
                </div>
            ) : (
                <p className="text-warning">This course is empty!</p>
            )}

            
            <div className="space-y-2">
                
                <p className="text-1xl font-bold">Topics</p>
                
                <div className="flex flex-wrap items-baseline space-x-2 space-y-2">
                    {course.topics && course.topics.length > 0 ? (
                        course.topics.map((topic, index) => (
                            <div key={index}>
                                <div className="badge badge-primary p-3">
                                    <p className="font-bold text-white">{topic.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="badge badge-error p-3">
                            <p className="font-bold text-white">None</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-2">
                <p className="text-1xl font-bold">Description</p>
                {course.description ? (
                    <p className="text-base">{course.description}</p>
                ) : (
                    <p className="text-error">No description has been defined for this course!</p>
                )}
            </div>
            
            <div className="flex">

                <div className="flex w-full">
                    <div className="flex space-x-2">
                        <p className="text-1xl font-bold">Instructor :</p>
                        {course.instructorName ? (
                            <p className="text-base">{course.instructorName}</p>
                        ) : (
                            <p className="text-error">None</p>
                        )}
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="flex space-x-2">
                        <p className="text-1xl font-bold">Instructor Email :</p>
                        {course.instructorEmail ? (
                            <p className="text-base">{course.instructorEmail}</p>
                        ) : (
                            <p className="text-error">None</p>
                        )}
                    </div>
                </div>
            </div>
        
            <div className="flex justify-between">
                {course.classes && course.classes.length > 0 ? (
                    <>
                        <div className="w-full">
                            <p className="text-1xl font-bold">Start Date</p>
                            <p>{formatToMountainTime(course.classes[0].scheduleStart)}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-1xl font-bold">End Date</p>
                            <p>{formatToMountainTime(course.classes[course.classes.length - 1].scheduleEnd)}</p>
                        </div>
                    </>    
                    ) : (
                        <p className="text-error">No classes have been defined for this course!</p>
                    )}
            </div>

            <div className="flex justify-between">
                <div className="w-full">
                    <p className="text-1xl font-bold">Enrollment Deadline</p>
                    {course.enrollmentDeadline ? (
                        <p>{new Date(course.enrollmentDeadline)
                            .toLocaleDateString(
                                'en-US', 
                                {
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric'
                                }
                            )}
                        </p>
                    ) : (
                        <p className="text-error">None</p>
                    )}
                </div>

                <div className="w-full">
                    <p className="text-1xl font-bold">PDF</p>
                    {course.pdf ? (
                        <a
                            className="link link-info"
                            href={pdfUrl || "#"}
                            download={course.pdf?.fileName}
                        >
                            {course.pdf?.fileName}
                        </a>
                    ) : (
                        <p className="text-error">None</p>
                    )}
                </div>
                
            </div>

            {expanded && (
                <div className="space-y-2">
                    
                    <hr></hr>

                    <div className="flex">

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Has Exam? :</p>
                                {course.hasExam ? (
                                    <p className="text-success">Yes</p>
                                ) : (
                                    <p className="text-error">No</p>
                                )}
                            </div>
                        </div>

                        {course.hasExam && (
                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">Exam Credit :</p>
                                    {course.examCredit ? (
                                        <p className="text-base">{course.examCredit}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                    </div>
        
                    <div className="flex">

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Attendance Credit :</p>
                                {course.attendanceCredit ? (
                                    <p className="text-base">{course.attendanceCredit}</p>
                                ) : (
                                    <p className="text-error">Undefined</p>
                                )}
                            </div>
                        </div>

                    
                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Max Attendance :</p>
                                {course.maxAttendance ? (
                                    <p className="text-base">{course.maxAttendance}</p>
                                ) : (
                                    <p className="text-error">Undefined</p>
                                )}
                            </div>
                        </div>
                    
                    </div>

                    <hr></hr>
                
                    {course.location !== null ? (
                    <div className="space-y-2">
                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Location :</p>
                                {course.location?.description ? (
                                    <p className="text-base">{course.location.description}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex">
                            <div className="flex w-full"> 
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">Room :</p>
                                    {course.location?.room ? (
                                        <p className="text-base">{course.location.room}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">Remote Link :</p>
                                    {course.location?.remoteLink ? (
                                        <p className="text-base">{course.location.remoteLink}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>
                        </div>

                
                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Address Line 1 :</p>
                                {course.location?.addressLine1 ? (
                                    <p className="text-base">{course.location.addressLine1}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Address Line 2 :</p>
                                {course.location?.addressLine2 ? (
                                    <p className="text-base">{course.location.addressLine2}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">City :</p>
                                    {course.location?.city ? (
                                        <p className="text-base">{course.location.city}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">State :</p>
                                    {course.location?.state ? (
                                        <p className="text-base">{course.location.state}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Zip Code :</p>
                                {course.location?.postalCode ? (
                                    <p className="text-base">{course.location.postalCode}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                

                    </div>   
                    ) : (
                        <p className="text-error">No location has been defined for this course!</p>
                    )}
        
                </div>   
            )} 

        </div>
    )

};

export default CourseInfoCard;