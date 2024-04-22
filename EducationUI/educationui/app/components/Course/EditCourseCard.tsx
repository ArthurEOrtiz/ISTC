'use client';
import React, { useState, useEffect } from 'react'
import { Course } from '@/app/shared/types/sharedTypes'
import ConfirmationModal from '@/app/shared/modals/ConfirmationModal';
import { useUser } from '@clerk/clerk-react';
import { EnrollStudentByClerkId, IsUserEnrolledInCourse, UnenrollStudentByClerkId } from '@/Utilities/api';
import ErrorModal from '@/app/shared/modals/ErrorModal';


interface CourseCardProps {
  course: Course;
  onEdit?: (course: Course) => void; 
  viewOnly?: boolean;
  onAttendance?: (course: Course) => void;
  clerkId: string;
}

const CourseCard : React.FC<CourseCardProps> = ({course, clerkId, onEdit, onAttendance, viewOnly}) => {
  const { isSignedIn } = useUser();
  const [ isConfirmationModalVisible, setIsConfirmationModalVisible ] = useState(false);
  const [ confirmationMessage, setConfirmationMessage ] = useState(''); 
  const [ confirmationTitle, setConfirmationTitle ] = useState('');
  const [ isErrorModalVisible, setIsErrorModalVisible ] = useState(false); 
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isEnrolled, setIsEnrolled ] = useState(false);

  // Effects
  useEffect(() => {
    if (viewOnly){
      const checkEnrollment = async () => {
        const response = await IsUserEnrolledInCourse(clerkId, course.courseId);
        setIsEnrolled(response);
      }
    checkEnrollment();
    }
  }, [clerkId])

  // Handlers

  const handleConfirm = (): void => {
    if (confirmationTitle === 'Enroll') {
      enrollStudent();
      return;
    }

    if (confirmationTitle === 'Unenroll') {
      unenrollStudent();
      return;
    }
    
  }
  const handleEnroll = (): void => {
    setConfirmationTitle('Enroll');
    setConfirmationMessage(`Are you sure you want to enroll in ${course.title}?`);
    setIsConfirmationModalVisible(true);
  }

  const handleUnenroll = (): void => {
    setConfirmationTitle('Unenroll');
    setConfirmationMessage(`Are you sure you want to unenroll from ${course.title}?`);
    setIsConfirmationModalVisible(true);
  }


  // Helpers
  const formatToMountainTime = (utcDate: string): string => {

    const inputDate =  `${utcDate}z`  
    const localTime = new Date(inputDate)

    const mountainTime = localTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Denver'})

    return mountainTime;
  }

  const enrollStudent = async() => {

    setIsConfirmationModalVisible(false);

    if(!isSignedIn) {
      setErrorMessage("Please log in to enroll in a course!")
      setIsErrorModalVisible(true);
      return
    }

    const response = await EnrollStudentByClerkId(clerkId, course.courseId);

    switch (response.status) {
      case 500:
        setErrorMessage('An error occurred while enrolling in the course, please contact support.');
        setIsErrorModalVisible(true);
        break;
      case 409:
        setErrorMessage('You are already enrolled in this course');
        setIsErrorModalVisible(true);
        break;
      case 404:
        setErrorMessage('The student or course was not found. Please contact support.');
        setIsErrorModalVisible(true);
        break;
      case 201:
        setIsEnrolled(true);
        break;
      default:
        break;
    }
  }

  const unenrollStudent = async() => {
    setIsConfirmationModalVisible(false);

    if(!isSignedIn) {
      setErrorMessage("Please log in to unenroll from a course!")
      setIsErrorModalVisible(true);
      return
    }

    const now = new Date();
    const deadline = new Date(course.enrollmentDeadline);

    if (deadline < now) {
      setErrorMessage("You cannot unenroll from a course that has already started!")
      setIsErrorModalVisible(true);
      return;
    }


    const response = await UnenrollStudentByClerkId(clerkId, course.courseId);

    switch (response.status) {
      case 500:
        setErrorMessage('An error occurred while unenrolling from the course, please contact support.');
        setIsErrorModalVisible(true);
        break;
      case 404:
        setErrorMessage('The student or course was not found. Please contact support.');
        setIsErrorModalVisible(true);
        break;
      case 200:
        setIsEnrolled(false);
        break;
      default:
        break;
    }
    
  }



  return (
    <div className="card-body">
      <p className="text-2xl font-bold">{course.title}</p>
      <p className="text-base">{course.description}</p>
      <p className="text-1xl font-bold">Topics</p>
      <div className="flex flex-wrap">
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
      </div>


      
      {course.classes && course.classes.length > 0 ? (
        <div className="flex justify-between">
          <div>
            <p className="text-1xl font-bold">Start Date</p>
            <p>{formatToMountainTime(course.classes[0].scheduleStart)}</p>
          </div>
          <div>
            <p className="text-1xl font-bold">End Date</p>
            <p>{formatToMountainTime(course.classes[course.classes.length - 1].scheduleEnd)}</p>
          </div>
        </div>
      ) : (
        <p>No classes have been defined for this course!</p>
      )}

      <div>
        <p className="text-1xl font-bold">Enrollment DeadLine</p>
        <p>{new Date(course.enrollmentDeadline).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
      </div>

      {!viewOnly && (
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary text-white"
            onClick={(onEdit && (() => onEdit(course)))}>
              Edit Course
            </button>
            <button
              className='btn btn-secondary text-white'
              onClick={(onAttendance && (() => onAttendance(course)))}
              >
                Track Attendance
              </button>
        </div>
      )}

      {viewOnly && !isEnrolled && new Date(course.enrollmentDeadline) > new Date() && (
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary text-white"
            onClick={handleEnroll}
          >
            Enroll
          </button>
        </div>
      )}

      {viewOnly && isEnrolled && new Date(course.enrollmentDeadline) > new Date() && (
        <div className="card-actions justify-end">
          <p className="text-green-500">You are enrolled in this course</p>
          <button
            className="btn btn-error text-white"
            onClick={handleUnenroll}
            >
            Unenroll
            </button>
        </div>
      )}

      {viewOnly && new Date(course.enrollmentDeadline) < new Date() && (
        <div className="card-actions justify-end">
          <p className="text-red-500">The enrollment deadline has passed</p>
        </div>
      )}

      {isConfirmationModalVisible && (
        <ConfirmationModal
          title={confirmationTitle}
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmationModalVisible(false)}
        />
      )}

      {isErrorModalVisible && (
        <ErrorModal 
          title={'Error!'} 
          message={errorMessage} 
          onClose={()=> setIsErrorModalVisible(false)} />
          )}
    </div>
  );  
}

export default CourseCard 






