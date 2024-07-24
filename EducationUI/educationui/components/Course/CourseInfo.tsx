'use client';
import { Class, Course, User, WaitList } from "@/Utilities/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import { SignedIn } from "@clerk/nextjs";
import ActionBar from "../shared/ActionBar";
import moment from "moment-timezone";
import { DeleteWaitListById, GetWaitListByUserIdCourseId, HasAttendedByClassIdUserId, IsUserEnrolledInCourse, IsUserWaitListed, PostWaitList } from "@/Utilities/api";
import { useEffect, useState } from "react";
import ErrorModal from "@/components/modals/ErrorModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

interface CourseInfoProps {
    course: Course | null;
    user: User | null;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course, user }) => {
    const [ isEnrolled, setIsEnrolled ] = useState<boolean>(false);
    const [ isWaitListed, setIsWaitListed ] = useState<boolean>(false);
    const [ userWaitList, setUserWaitList ] = useState<WaitList | null>(null);
    const [ attendance, setAttendance ] = useState<boolean[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ confirmationTitle, setConfirmationTitle ] = useState<string>("");
    const [ confirmationMessage, setConfirmationMessage ] = useState<string>("");
    const courseId = course !== null ? course.courseId : 0;
    const classes = course?.classes as Class[];
    const userId = user !== null ? user.userId : 0;

    const defaultWaitListToEnroll: WaitList = {
        waitListId: 0,
        courseId: courseId,
        userId: userId,
        dateAdded: new Date(),
        toEnroll: true
    }

    const defaultWaitListToDrop: WaitList = {
        waitListId: 0,
        courseId: courseId,
        userId: userId,
        dateAdded: new Date(),
        toEnroll: false
    }

    useEffect(() => {
        if (course !== null && user !== null) {
            checkUserEnrollment(user.userId, course.courseId).then((enroll) => {
                if(enroll) {
                    console.log("User is enrolled");
                    setIsEnrolled(true);
                } else {
                    console.log("User is not enrolled");
                    setIsEnrolled(false);
                }
            });

            checkUserWaitList(user.userId, course.courseId).then((isWaitListed) => {
                setIsWaitListed(isWaitListed);

                if (isWaitListed) {
                    getUserWaitList(user.userId, course.courseId);
                } 
            });

            checkUserAttendance();
            setIsLoading(false);
        }
    }, []);

    const handleEnroll = () => {
        if (isEnrolled && !isWaitListed) {
            // if the user is enrolled and not on the waitlist, add the user to the waitlist to drop the course (toEnroll = false).
            setConfirmationTitle("Apply to Drop Course");
            setConfirmationMessage('Are you sure you want to request to drop this course? A confirmation email will be sent to you upon approval.');
            setShowConfirmationModal(true);
            return;
        } 

        if (isEnrolled && isWaitListed) {
            // if the user is enrolled and on the waitlist.
            if (userWaitList?.toEnroll) {
                // and the wait is to enroll (toEnroll = true), then there has been some sort of error because that should be impossible, and you should probably remove that record. 
                setErrorMessage("An enrollment error has occured. You are enrolled and on the waitlist to enroll. Please contact support.");  
                return; 
            } else {
                // and the waitlist is to drop (toEnroll = false), then the user is probably trying to cancel the request to drop the course.
                setConfirmationTitle('Remove from Wait List');
                setConfirmationMessage('Are you sure you want to cancel your request to drop this course?');
                setShowConfirmationModal(true);
                return;
            }
        }

        if (!isEnrolled && isWaitListed) {
            if (!userWaitList?.toEnroll) {
                // if the user is not enroll and is on the waitlist to drop the course (toEnroll = false), then an error has probable occured, and you should probably remove the waitlist.
                setErrorMessage("You are already on the wait list to drop this course. A confirmation email will be sent to you upon approval.");
                return; 
            } else {
                // if the user is not enroll and is on the wait list to be added to the course, remove the user from the waitlist.
                setConfirmationTitle('Remove from Wait List');
                setConfirmationMessage('Are you sure you want to remove yourself from the wait list of this course?');
                setShowConfirmationModal(true);
                return;
            }
        }

        if (!isWaitListed && !isEnrolled) {
            // if the user is not enrolled and not on the waitlist, add the user to the waitlist.
            setConfirmationTitle('Application Confirmation');
            setConfirmationMessage('Are you sure you want to apply to enroll in this course? You will be added to the wait list and a confirmation email will be sent to you upon approval.');
            setShowConfirmationModal(true);
            return;
        }
    }

    const handleOnConfirm = () => {
        switch(confirmationTitle) {
            case "Apply to Drop Course":
                // The user is enrolled and will and will need to be added to the waitlist to drop the course. 
                addUserToWaitList(defaultWaitListToDrop);    
                break;
            case "Remove from Wait List":
                // The user is or is not enrolled and is on the waitlist.
                // first make sure that its true, if not throw an error.
                if (!isWaitListed || userWaitList === null) {
                    setErrorMessage("Error removing user from wait list");
                    return;
                } else {
                    if ((isEnrolled && !userWaitList.toEnroll) || (!isEnrolled && userWaitList.toEnroll)) {
                        // if the user is enrolled and on the waitlist to drop the course, or if the user is not enrolled and on the waitlist to add the course, remove the user from the waitlist.
                        removeUserFromWaitList(userWaitList.waitListId);
                        return;
                    } 
                    
                    if ((isEnrolled && userWaitList.toEnroll) || (!isEnrolled && !userWaitList.toEnroll)) {
                        // if the user is enrolled and on the waitlist to enroll, or if the user is not enrolled and on the waitlist to drop, throw an error.
                        setErrorMessage("Error removing user from wait list");
                        return;
                    }
                }
                break;
            case "Application Confirmation":
                // The user is not enrolled and not on the waitlist. Add the user to the waitlist.
                addUserToWaitList(defaultWaitListToEnroll);
                break;
        }

    }

    const checkUserEnrollment = async (userId: number, courseId: number) => {
        const response = await IsUserEnrolledInCourse(userId, courseId);
        if (response.status === 200) {
            return response.data as boolean;
        } else {
            setErrorMessage("Error checking user enrollment");
            return false;
        }
    }

    const checkUserWaitList = async (userId: number, courseId: number) => {
        const response = await IsUserWaitListed(courseId, userId);
        if (response.status === 200) {
            return response.data as boolean;
        } else {
            setErrorMessage("Error checking user wait list");
            return false;
        }
    }

    const checkUserAttendance = async () => {
        const attendance = await Promise.all(classes.map(cls =>
            isEnrolled ? hasUserAttended(cls.classId, userId) : Promise.resolve(false)
        ));
        setAttendance(attendance);
    }

    const hasUserAttended = async (classId: number, userId: number) => {
        const response = await HasAttendedByClassIdUserId(classId, userId);
        if (response.status === 200) {
            return response.data as boolean;
        } else {
            setErrorMessage("Error checking if user has attended");
            return false;
        }
    }

    const getUserWaitList = async (userId: number, courseId: number) => {
        const response = await GetWaitListByUserIdCourseId(userId, courseId);
        if (response.status === 200) {
            setUserWaitList(response.data as WaitList);
        } else {
            setErrorMessage("Error getting user wait list");
        }
    }

    const addUserToWaitList = async (waitList: WaitList) => {
        const response = await PostWaitList(waitList);
        if (response.status === 201) {
            return response.data as WaitList;
        } else {
            setErrorMessage("Error adding user to wait list");
            return null;
        }
    }

    const removeUserFromWaitList = async (waitListId: number) => {
        const response = await DeleteWaitListById(waitListId);
        if (response.status === 204) {
            setUserWaitList(null);
            setIsWaitListed(false);
        } else {
            setErrorMessage("Error removing user from wait list");
        }
    }

    const renderNavList = () => {
        return (
            <li>
                <button 
                    className={`font-bold text-nowrap ${isEnrolled ? (isWaitListed ? "text-warning" : "text-success") : (isWaitListed ? 'text-warning' : 'text-success' )}`}
                    onClick={handleEnroll}>
                        {isEnrolled ? (isWaitListed ? "Remove from Wait List" : "Apply To Drop Course") : (isWaitListed ? "Remove from Wait List" : " Apply to Enroll")}
                        {/*                            true true                 true false                                false true                 false false    */}
                </button>
            </li>
        );
    }

    const renderClasses = () => {
        return (
            <>
                {classes.map((cls, index) => {

                    const hasAttended = attendance[index];
                    const day = moment.utc(cls.scheduleStart).tz('America/Denver').format('dddd');
                    const date = moment.utc(cls.scheduleStart).tz('America/Denver').format('MMMM Do YYYY');
                    const startTime = moment.utc(cls.scheduleStart).tz('America/Denver').format('hh:mm a');
                    const endTime = moment.utc(cls.scheduleEnd).tz('America/Denver').format('hh:mm a');

                    return (
                        <div key={index} className='bg-base-100 rounded-xl p-5 min-w-72 m-1'>
                            <div className='flex justify-between'>
                                <p className='text-2xl font-bold'>Class {index + 1}</p>     
                                <p className='text-base'>Class Id: {cls.classId}</p>
                            </div>
                            <hr />
                            <div className='flex justify-between mt-2'>
                                <p className='text-lg font-bold'>{day}</p>
                                <p className='text-lg'>{date}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-lg font-bold'>Start Time</p>
                                <p className='text-lg'>{startTime}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-lg font-bold'>End Time</p>
                                <p className='text-lg'>{endTime}</p>
                            </div>

                            <SignedIn>
                                {isEnrolled ? (
                                    <div className='flex justify-between'>
                                        <p className='text-lg font-bold'>Attended?</p>
                                        <p className={`${hasAttended ? 'text-success' : 'text-error'}`}>{hasAttended ? "Yes" : "No"}</p>
                                    </div> 
                                ) : null}
                            </SignedIn>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <div className="p-2 space-y-2">
    
            <div className='bg-base-100 rounded-xl p-5'>
                <div className='bg-base-300 rounded-xl p-4'>
                    {course !== null ? (
                        <CourseInfoCard
                            course={course}                            
                            expanded={true}
                        />
                    ) : (
                        <div className='text-center text-lg text-error p-4'>Course not found</div>
                    )}
                </div>
                
                <SignedIn>
                    {isLoading ? (
                        <div className="flex justify-center mt-2">
                            <span className="loading loading-spinner"></span>
                        </div>
                        ) : (
                            <div className="flex justify-center space-x-4 mt-2">
                                <div>
                                    <p className='text-center'>Enrollment Status</p>
                                    <hr />
                                    {isEnrolled && !isWaitListed ? (
                                        <p className="text-success">Enrolled</p>
                                    ) : isEnrolled && isWaitListed ? (
                                        <p className="text-warning">On Wait List To Drop</p>
                                    ) : !isEnrolled && isWaitListed ? (
                                        <p className="text-warning">On Wait List To Enroll</p>
                                    ) : (
                                        <p className="text-error">Not Enrolled</p>
                                    )}
                                </div>
                                {/* {course?.status !== "Archived" ? (
                                    <div>
                                        <ActionBar navList = {renderNavList()}/> 
                                    </div>
                                ) : null} */}

                                <button 
                                    className={`btn font-bold ${isEnrolled ? (isWaitListed ? "text-warning" : "text-success") : (isWaitListed ? 'text-warning' : 'text-success' )}`}
                                    onClick={handleEnroll}
                                    disabled={course?.status === "Archived"}>
                                        {isEnrolled ? (isWaitListed ? "Remove from Wait List" : "Apply To Drop Course") : (isWaitListed ? "Remove from Wait List" : " Apply to Enroll")}
                                        {/*                            true true                 true false                                false true                 false false    */}
                                </button>

                            </div>   
                    )}
                </SignedIn>
            </div>

            <div className='flex flex-wrap justify-start  items-center'>
                {renderClasses()}
            </div>

            {errorMessage !== "" && (
                <ErrorModal
                    title="Error"
                    message={errorMessage}
                    onClose={() => setErrorMessage("")}
                />
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title={confirmationTitle}
                    message={confirmationMessage}
                    isOpen={showConfirmationModal}
                    onConfirm={() => {
                        handleOnConfirm()
                        setShowConfirmationModal(false)
                        setConfirmationMessage("")
                        setConfirmationTitle("")
                    }}
                    onCancel={() => {
                        setShowConfirmationModal(false)
                        setConfirmationMessage("")
                        setConfirmationTitle("")
                    }}
                />
            )}
        </div>
  );

}

export default CourseInfo;
