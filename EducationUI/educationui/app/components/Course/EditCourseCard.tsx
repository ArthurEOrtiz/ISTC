'use client';
import React, { useState, useEffect } from 'react'
import { Course } from '@/app/shared/types/sharedTypes'
import ConfirmationModal from '@/app/shared/modals/ConfirmationModal';
import { useUser } from '@clerk/clerk-react';
import { EnrollStudentByClerkId, IsUserEnrolledInCourse } from '@/Utilities/api';
import ErrorModal from '@/app/shared/modals/ErrorModal';


interface CourseCardProps {
  course: Course;
  onEdit?: (course: Course) => void; 
  viewOnly?: boolean;
}

const CourseCard : React.FC<CourseCardProps> = ({course, onEdit, viewOnly}) => {
  const { isSignedIn, user } = useUser();
  const [ isConfirmationModalVisible, setIsConfirmationModalVisible ] = useState(false);
  const [ isErrorModalVisible, setIsErrorModalVisible ] = useState(false); 
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isEnrolled, setIsEnrolled ] = useState(false);

  useEffect(() => {
    if (viewOnly){
      const checkEnrollment = async () => {
        if (!user) return;
        const response = await IsUserEnrolledInCourse(user.id, course.courseId as Number);
        setIsEnrolled(response);
      }
    checkEnrollment();
    }
  }, [viewOnly] )
  


  const formatToMountainTime = (utcDate: Date): string => {

    const inputDate =  `${utcDate}z`  
    const localTime = new Date(inputDate)

    const mountainTime = localTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Denver'})

    return mountainTime;
  }

  const handleEnroll = (): void => {
    setIsConfirmationModalVisible(true);
  }

  const enrollStudent = async() => {
    if(!isSignedIn) {
      setErrorMessage("Please log in to enroll in a course!")
      setIsErrorModalVisible(true);
      return
    }

    const response = await EnrollStudentByClerkId(user.id, course.courseId as Number);

    switch (response.status) {
      case 500:
        console.error('Error enrolling user in course');
        break;
      case 409:
        setErrorMessage('You are already enrolled in this course');
        setIsErrorModalVisible(true);
        console.error('User is already enrolled in this course');
        break;
      case 201:
        console.log('User enrolled in course');
        setIsConfirmationModalVisible(false);
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

      {!viewOnly && (
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary text-white"
            onClick={(onEdit && (() => onEdit(course)))}>
              Edit
            </button>
        </div>
      )}

      {viewOnly && !isEnrolled && (
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary text-white"
            onClick={handleEnroll}
          >
            Enroll
          </button>
        </div>
      )}

      {viewOnly && isEnrolled && (
        <div className="card-actions justify-end">
          <p className="text-green-500">You are already enrolled in this course</p>
        </div>
      )}

      {isConfirmationModalVisible && (
        <ConfirmationModal
          title="Enroll"
          message={`Are you sure you want to enroll in ${course.title}?`}
          onConfirm={enrollStudent}
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






