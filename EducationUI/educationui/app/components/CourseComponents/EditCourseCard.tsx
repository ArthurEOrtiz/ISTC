'use client';
import React from 'react'
import { Course } from '@/app/shared/types/sharedTypes'

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
}

const CourseCard : React.FC<CourseCardProps> = ({course, onEdit}) => {
  return (
    <div className="card-body">
      <p className="text-2xl font-bold">{course.title}</p>
      <p className="text-base">{course.description}</p>
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


