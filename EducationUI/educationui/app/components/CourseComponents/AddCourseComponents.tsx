'use client';
import CourseForm from './CourseForm';
import ClassForm from './ClassForm';
import { CourseFormData } from '@/app/shared/types/sharedTypes';
import { useState } from 'react';
import NewClass from './NewClass';
import NewClassMenu from './NewClassMenu';

const AddCourseComponent: React.FC = () => {    
    const [courseFormData, setCourseFormData] = useState<CourseFormData | null>(null); 
    const [isCourseFormVisible, setIsCourseFormVisible] = useState<boolean>(true);
    const [classes, setClasses] = useState<JSX.Element[]>([]);
    const [classDate, setClassDate] = useState<Date>(new Date());

    const handleFormSubmit = (courseFormData: CourseFormData) =>{
        setCourseFormData(courseFormData);
        setIsCourseFormVisible(false); 
    }

    const handleBackToCourseForm = () => {
        setIsCourseFormVisible(true);
    }

    const addClass = () => {
        // Calculate the date for the new class
        const today = new Date();
        let nextClassDate;
        if (classes.length === 0) {
            nextClassDate = today;
        } else {
            nextClassDate = new Date(new Date(classDate.getTime() + 86400000));
        }
        setClassDate(nextClassDate);

        const newClass = <NewClass
                            key={classes.length}
                            scheduleDate={nextClassDate} 
                            onDelete={() => deleteClass(classes.length)} 
                            onDateChange={handleClassDateChange}/>;

        setClasses(previousClasses => [...previousClasses, newClass]);
    };

    const handleClassesChange = (isEmpty: boolean) => {
        if (isEmpty) {
            console.log("All classes are deleted");
            setClassDate(new Date()); // Reset classDate to today if all classes are deleted
        }
    }

    const deleteClass = (index: number) => {
        const updatedClasses = [...classes];
        updatedClasses.splice(index, 1);
        setClasses(updatedClasses);
        if (updatedClasses.length === 0)
        {
            setClassDate(new Date()); // Reset classDate to today if all classes are deleted
        }
       
    }

    const handleClassDateChange = (date: Date) => {
        setClassDate(date);
    };


    return (
        <>
            {isCourseFormVisible ? 
                (<CourseForm onSubmit={handleFormSubmit}/>) :
                (<>
                    <NewClassMenu onBack={handleBackToCourseForm} onAddClass={addClass} />
                    <ClassForm courseFormData={courseFormData} classes={classes} onClassesChange={handleClassesChange} />
                </>)
            }
        </>
        
    );
}

export default AddCourseComponent