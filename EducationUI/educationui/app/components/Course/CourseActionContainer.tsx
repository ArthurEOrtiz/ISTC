import { Course, User, WaitList } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import { use, useEffect, useState } from "react";
import { DeleteWaitListById, IsUserEnrolledInCourse, IsUserWaitListed, PostWaitList } from "@/Utilities/api";
import ConfirmationModal from "@/app/shared/modals/ConfirmationModal";

interface CourseActionContainerProps {
    course: Course;
    user: User; 
    isAdmin: boolean;
    onError: (message: string) => void;
    handleManageAttendanceClick: (course: Course) => void;
    handleEditCourseClick?: (course: Course) => void;
    handleDeleteCourseClick?: (course: Course) => void;
    handleViewCourseClick?: (course: Course) => void;
}

const CourseActionContainer: React.FC<CourseActionContainerProps> = ({course, user, isAdmin, onError, handleManageAttendanceClick, handleEditCourseClick, handleDeleteCourseClick, handleViewCourseClick}) => {
    // console.log(user);
    // console.log(course);
    // console.log(course.waitLists);
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
    const [isWaitListed, setIsWaitListed] = useState<boolean>(false);
    const [waitList, setWaitList] = useState<WaitList>();
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [confirmationTitle, setConfirmationTitle] = useState<string>();  
    const [confirmationMessage, setConfirmationMessage] = useState<string>();
  
    const defaultWaitList: WaitList = {
        waitListId: 0,
        courseId: course.courseId,
        userId: user.userId,
        dateAdded: new Date(),
        toEnroll: true
    }

    // effects
    useEffect(() => {
        checkUserEnrollment();
        checkUserWaitList();
        checkIfUserIsWaitListed();
    }, []);

    useEffect(() => {
        checkUserWaitList();
    }
    , [waitList]);

    
    // handlers
    const handleEnrollmentClick = () => {

        if (isEnrolled || isWaitListed) {
            if (isEnrolled) {
                setConfirmationTitle('Drop Course');
                setConfirmationMessage('Are you sure you want to drop this course?');
                
            }
            if (isWaitListed) {
                setConfirmationTitle('Remove from Wait List');
                setConfirmationMessage('Are you sure you want to remove yourself from the wait list of this course?');
            }
        } else {
            setConfirmationTitle('Application Confirmation');
            setConfirmationMessage('Are you sure you want to apply to enroll in this course? You will be added to the wait list and a confirmation email will be sent to you upon approval.');
            
        }
        setShowConfirmationModal(true);
    };

    const handleOnConfirm = () => { 
        switch (confirmationTitle) {
            case 'Application Confirmation':
                waitListUser();
                break;
            case 'Remove from Wait List':
                removeUserFromWaitList();
                break;
        }
    }


    // helpers
    const checkUserEnrollment = async() => {
         const response = await IsUserEnrolledInCourse(user.clerkId!, course.courseId);
         if (response.status === 200) {
                setIsEnrolled(response.data);
         } else {
                onError(`Failed to check user enrollment. \n ${response as unknown as string}`);
         }
    }

    const checkUserWaitList = async() => {
        const response = await IsUserWaitListed(course.courseId, user.userId);
        if (response.status === 200) {
            setIsWaitListed(response.data);
        } else {
            onError(`Failed to check user wait list. \n ${response as unknown as string}`);
        }
    }

    const waitListUser = async() => {

        resetConfirmationModal();
        // console.log(defaultWaitList);
        const response = await PostWaitList(defaultWaitList);
        if (response.status === 201) {
            setWaitList(response.data);
        } else {
            onError(`Failed to wait list user. \n ${response as unknown as string}`);
        }
        
    }

    const removeUserFromWaitList = async() => {

        resetConfirmationModal();
        if (!waitList) {
            onError('Wait list not found.');
            return;
        }
       
        const response = await DeleteWaitListById(waitList.waitListId);
        if (response.status === 200) {
            setWaitList(undefined);
            setIsWaitListed(false);
        } else {
            onError(`Failed to remove user from wait list. \n ${response as unknown as string}`);
        }
        
    }

    const checkIfUserIsWaitListed = () => {
        const waitList = course.waitLists.find(wl => wl.userId === user.userId);
        if (waitList) {
            setWaitList(waitList);
            setIsWaitListed(true);
        }
    }


    const resetConfirmationModal = () => { 
        setConfirmationTitle('');
        setConfirmationMessage('');
        setShowConfirmationModal(false);
    }

    
    return (
        <div>
            <div className='space-y-4'>
                <CourseInfoCard course={course} expanded={false}/>
                <div>
                    {isAdmin && (
                        <div>
                            <div className="flex space-x-2">
                                <button 
                                    className="btn btn-primary text-white"
                                    onClick={() => handleEditCourseClick && handleEditCourseClick(course)}>
                                        Edit Course
                                </button>
                                <button 
                                    className="btn btn-primary text-white"
                                    onClick={() => handleManageAttendanceClick(course)}>
                                        Manage Attendance
                                </button>
                                <button 
                                    className="btn btn-error text-white"
                                    onClick={() => handleDeleteCourseClick && handleDeleteCourseClick(course)}>Delete Course</button>
                            </div>
                        </div>
                    )}
                    
                    {!isAdmin && (
                        <div>
                            <div className="flex space-x-2">

                                <button 
                                    className={`btn ${(isEnrolled || isWaitListed) ? 'btn-error' : 'btn-primary'} text-white`}
                                    onClick={handleEnrollmentClick}>
                                        {isEnrolled || isWaitListed ? 'Drop Course' : 'Apply to Enroll'}
                                </button>

                                <button 
                                    className="btn btn-primary text-white"
                                    onClick={() => handleViewCourseClick && handleViewCourseClick(course)}>
                                        View Course
                                </button>

                                
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
            <div>
                {showConfirmationModal && (
                    <ConfirmationModal 
                        title={confirmationTitle || ''}
                        message={confirmationMessage || ''}
                        onConfirm={handleOnConfirm}
                        onCancel={() => setShowConfirmationModal(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default CourseActionContainer;