'use client';
import React, { useEffect } from 'react';
import { Course } from '@/app/shared/types/sharedTypes';
import CourseCard from './EditCourseCard';
import { useRouter } from 'next/navigation';

interface CourseListProps {
    courses: Course[];
    viewOnly?: boolean;
    onEnroll?: (course: Course) => void; 
}

const CourseList: React.FC<CourseListProps> = ({courses, viewOnly, onEnroll}) => {
    const [courseList , setCourseList] = React.useState<Course[]>(courses);
    const [searchString , setSearchString] = React.useState<string>('');
    const router = useRouter();

    const handleOnEdit = (course: Course): void  => {
        router.push(`/admin/editcourse/edit/course/${course.courseId}`);
    }

    useEffect(() => {
        if(searchString.length > 0){
            const filteredCourses = courses.filter((course) => {
                const titleMatch = course.title.toLowerCase().includes(searchString.toLowerCase());
                const descriptionMatch = course.description.toLowerCase().includes(searchString.toLowerCase());
                const topicsMatch = course.topics && course.topics.some((topic) => topic.title.toLowerCase().includes(searchString.toLowerCase()));
                return titleMatch || descriptionMatch || topicsMatch;
            });
            setCourseList(filteredCourses);
        } else {
            setCourseList(courses);
        }
    }, [searchString]);

    return (
        <div>
            {!viewOnly && <h1 className="text-3xl font-bold text-center mt-4">Courses</h1>}
            

            <div className='w-full flex justify-end mt-4 p-4'>
                <div>
                    <input 
                        type="search"
                        name="search" 
                        id="search" 
                        className="input input-bordered w-full pr-12 sm:text-sm rounded-md" 
                        placeholder="Search courses..."
                        onChange={(e) => setSearchString(e.target.value)}
                     />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 p-4">
                {courseList.map((course, index) => (
                    <div 
                        key={index} 
                        className="card w-full bg-base-100 shadow-xl"
                    >
                    
                        <CourseCard 
                            course={course} 
                            onEdit={handleOnEdit} 
                            viewOnly={viewOnly}
                            onEnroll={onEnroll}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList
