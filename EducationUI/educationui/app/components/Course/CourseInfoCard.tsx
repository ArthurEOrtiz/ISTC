import { Course } from "@/app/shared/types/sharedTypes";
import moment from 'moment-timezone';

interface CourseInfoCardProps {
    course: Course;
    expanded?: boolean;
};

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({ course, expanded = true }) => {
    // helpers
    const formatToMountainTime = (utcDate: string): string => {
        const mountainTime = moment.utc(utcDate).tz('America/Denver').format('dddd, MMMM Do YYYY, h:mm a');
        return mountainTime;
    }

    return (
        <div className="space-y-2">
            <p className="text-2xl font-bold">{course.title}</p>
            <p className="text-1xl font-bold">Topics</p>
           
            {course.topics && course.topics.length > 0 ? (
            course.topics.map((topic, index) => (
                <div key={index} className="mr-2 mb-1">
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

            <p className="text-base">{course.description}</p>
            
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

            <div>
                <p className="text-1xl font-bold">Enrollment Deadline</p>
                <p>{new Date(course.enrollmentDeadline).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </div>

            {expanded && (
                <div className="space-y-2">
                    
                    <hr></hr>

                    <div className="flex">

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Has Exam? :</p>
                                {course.hasExam ? (
                                    <p className="text-base">Yes</p>
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
                                <p className="text-base">{course.attendanceCredit}</p>
                            </div>
                        </div>

                    
                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Max Attendance :</p>
                                <p className="text-base">{course.maxAttendance}</p>
                            </div>
                        </div>
                    
                    </div>

                    <hr></hr>
                
                    {course.location !== null ? (
                    <div className="space-y-2">
                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Location :</p>
                                {course.location.description ? (
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
                                    {course.location.room ? (
                                        <p className="text-base">{course.location.room}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">Remote Link :</p>
                                    {course.location.remoteLink ? (
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
                                {course.location.addressLine1 ? (
                                    <p className="text-base">{course.location.addressLine1}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Address Line 2 :</p>
                                {course.location.addressLine2 ? (
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
                                    {course.location.city ? (
                                        <p className="text-base">{course.location.city}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">State :</p>
                                    {course.location.state ? (
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
                                {course.location.postalCode ? (
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