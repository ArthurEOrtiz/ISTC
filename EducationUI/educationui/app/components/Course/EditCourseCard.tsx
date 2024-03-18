'use client';
import React from 'react'
import { Course } from '@/app/shared/types/sharedTypes'

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
}

const CourseCard : React.FC<CourseCardProps> = ({course, onEdit}) => {
  
  const formatToMountainTime = (utcDate: Date): string => {

    const inputDate =  `${utcDate}z`  
    const localTime = new Date(inputDate)

    const mountainTime = localTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Denver'})

    return mountainTime;
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


      <div className="card-actions justify-end">
        <button 
          className="btn btn-primary text-white"
          onClick={() => onEdit(course)}>
            Edit
          </button>
      </div>
    </div>
  )
}

export default CourseCard 

