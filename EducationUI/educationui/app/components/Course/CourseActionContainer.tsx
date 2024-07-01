import { Course, User, WaitList } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import { useEffect, useState } from "react";
import { DeleteWaitListById, GetWaitListByUserIdCourseId, IsUserEnrolledInCourse, IsUserWaitListed, PostWaitList } from "@/Utilities/api";
import ConfirmationModal from "@/app/shared/modals/ConfirmationModal";
import AttendanceModal from "../Attendance/AttendanceModal";
import EnrollmentModal from "../Enrollment/EnrollmentModal";
import { useRouter } from 'next/navigation';
import { SignedIn } from "@clerk/nextjs";
import ExamModal from "../Exam/ExamModal";

interface CourseActionContainerProps {
    course: Course;
    user: User | null; 
    isAdmin: boolean;
    onError: (message: string) => void;
    sendEmail: (to: User, subject: string, body: string) => void;
}

const CourseActionContainer: React.FC<CourseActionContainerProps> = ({course, user, isAdmin, onError, sendEmail}) => {
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
    const [isWaitListed, setIsWaitListed] = useState<boolean>(false);
    const [userWaitList, setUserWaitList] = useState<WaitList>(); 
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [confirmationTitle, setConfirmationTitle] = useState<string>();  
    const [confirmationMessage, setConfirmationMessage] = useState<string>();
    const [showEnrollmentModal, setShowEnrollmentModal] = useState<boolean>(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState<boolean>(false); 
    const [showExamModal, setShowExamModal] = useState<boolean>(false);
    const router = useRouter();
    const userId = user === null ? 0 : user?.userId; 
  
    const defaultWaitListToEnroll: WaitList = {
        waitListId: 0,
        courseId: course.courseId,
        userId: userId,
        dateAdded: new Date(),
        toEnroll: true
    }

    const defaultWaitListToDrop: WaitList = {
        waitListId: 0,
        courseId: course.courseId,
        userId: userId,
        dateAdded: new Date(),
        toEnroll: false
    }

    // effects
    useEffect(() => {
        checkIfUserIsEnrolledInCourse();
        checkIfUserIsOnWaitList();
    }, []);
    
    // handlers
    const handleEnrollmentClick = () => {

        if (isEnrolled || isWaitListed) {
            if (isEnrolled) {
                setConfirmationTitle('Drop Course');
                setConfirmationMessage('Are you sure you want to request to drop this course? A confirmation email will be sent to you upon approval.');
                setShowConfirmationModal(true);
                return;
                
            }
            if (isWaitListed) {
                setConfirmationTitle('Remove from Wait List');
                setConfirmationMessage('Are you sure you want to remove yourself from the wait list of this course?');
                setShowConfirmationModal(true);
                return;
            }
        } else {
            setConfirmationTitle('Application Confirmation');
            setConfirmationMessage('Are you sure you want to apply to enroll in this course? You will be added to the wait list and a confirmation email will be sent to you upon approval.');
            setShowConfirmationModal(true);
        }
        
    };

    const handleOnConfirm = () => { 
        switch (confirmationTitle) {
            case 'Application Confirmation':
                waitListUser(defaultWaitListToEnroll);
                break;
            case 'Remove from Wait List':
                removeUserFromWaitList();
                break;
            case 'Drop Course':
                checkIfUserIsOnWaitList();
                if (!isWaitListed) {
                    waitListUser(defaultWaitListToDrop);
                }
                break;
        }

        resetConfirmationModal();
    };

    const handleEnrollmentModelError = (message: string) => {
        setShowEnrollmentModal(false);
        onError(message);
    };

    // helpers
    const checkIfUserIsEnrolledInCourse = async() => {
        if (!user) return;

         const response = await IsUserEnrolledInCourse(userId, course.courseId);
         if (response.status === 200) {
                setIsEnrolled(response.data);
         } else {
                onError(`Failed to check user enrollment. \n ${response as unknown as string}`);
         }
    };

    const checkIfUserIsOnWaitList = async() => {
        if (!user) return;
        const response = await IsUserWaitListed(course.courseId, userId);
        if (response.status === 200) {
            setIsWaitListed(response.data);
            if (response.data) {
                await getUserWailList();
            }
        } else {
            onError(`Failed to check user wait list. \n ${response as unknown as string}`);
        }
    };

    const waitListUser = async(waitList: WaitList) => {
        if (!user) return;
        const response = await PostWaitList(waitList);
        if (response.status === 201) {
            setUserWaitList(response.data);
            setIsWaitListed(true);
            sendEmail(user, 'Wait List Confirmation', `You have been added to the wait list for ${course.title}.`);
        } else {
            onError(`Failed to wait list user. \n ${response as unknown as string}`);
        }
        
    };

    const getUserWailList = async() => {
        if (!user) return;

        const response = await GetWaitListByUserIdCourseId(user.userId, course.courseId);
        if (response.status === 200) {
            setUserWaitList(response.data);
        } else {
            onError(`Failed to get user wait list. \n ${response as unknown as string}`);
        }
    }

    const removeUserFromWaitList = async() => {

        if (!userWaitList) {
            onError('Wait list not found.');
            return;
        }

        const response = await DeleteWaitListById(userWaitList.waitListId);  
        //console.log(response);

        if (response.status === 204) {
            setUserWaitList(undefined);
            setIsWaitListed(false);
        } else {
            onError(`Failed to remove user from wait list. \n ${response as unknown as string}`);
        }
        
    };

    const resetConfirmationModal = () => { 
        setConfirmationTitle('');
        setConfirmationMessage('');
        setShowConfirmationModal(false);
    };
    
    return (
        <div>
            <div className='bg-base-100 rounded-xl p-5'>
                <div className='bg-base-300 rounded-xl p-4'>
                    <CourseInfoCard course={course} expanded={false}/>
                </div>
                
                <div className='mt-4'>
                    {isAdmin && (
                        <div>
                            <div className="flex space-x-2">
                                <button 
                                    className="btn btn-primary btn-sm text-white"
                                    onClick={() => router.push(`/admin/editcourse/edit/course/${course.courseId}`)}
                                    >
                                        Edit Course
                                </button>
                                <button
                                    className="btn btn-primary btn-sm text-white"
                                    onClick={()=>setShowEnrollmentModal(true)}
                                    >
                                        Manage Enrollment
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm text-white"
                                    onClick={()=>setShowAttendanceModal(true)}
                                    >
                                        Manage Attendance
                                </button>
                                {course.hasExam && (
                                    <button
                                        className="btn btn-primary btn-sm text-white"
                                        onClick={() => {setShowExamModal(true)}}
                                        >
                                            Manage Exams
                                    </button>
                                )}
                                {/* <button
                                    className="btn btn-primary text-white"
                                    onClick={() => console.log(course)}
                                    >
                                        Console Log Course
                                </button> */}
                                
                            </div>
                        </div>
                    )}
                    
                    {!isAdmin && (
                        <div>
                            <div className="flex space-x-2">
                                <SignedIn>
                                    <button 
                                        className={`btn ${(isEnrolled || isWaitListed) ? 'btn-error' : 'btn-primary'} btn-sm text-white`}
                                        onClick={handleEnrollmentClick}>
                                            {isEnrolled || isWaitListed ? 'Drop Course' : 'Apply to Enroll'}
                                    </button>
                                </SignedIn>

                                <a
                                    className="btn btn-primary text-white btn-sm"
                                    href={`/courses/course/${course.courseId}`}
                                    target="_blank"
                                    rel=" noopener noreferrer"
                                    >
                                        View Course
                                </a>
                                {/* <button
                                    className="btn btn-primary text-white"
                                    onClick={() => console.log(course)}
                                    >
                                        Console Log Course
                                </button> */}
                                
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
                
            
                <EnrollmentModal
                    course={course}
                    isOpen={showEnrollmentModal}
                    onExit={() => setShowEnrollmentModal(false)}
                    onError={handleEnrollmentModelError}
                />

                <AttendanceModal
                    course={course}
                    isOpen={showAttendanceModal}
                    onExit={() => {
                        setShowAttendanceModal(false)
                    }}
                />

                <ExamModal
                    exams={course.exams}
                    courseId={course.courseId}
                    isOpen={showExamModal}
                    onExit={() => setShowExamModal(false)}
                    onError={(message: string) => onError(message)}
                />

                {showConfirmationModal && (
                    <ConfirmationModal 
                        title={confirmationTitle || ''}
                        message={confirmationMessage || ''}
                        onConfirm={handleOnConfirm}
                        onCancel={() => setShowConfirmationModal(false)}
                    />
                )}

        </div>
    );
}

export default CourseActionContainer;