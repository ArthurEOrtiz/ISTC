'use client';
import { Attendance, Class, Course } from "@/app/shared/types/sharedTypes";
import CourseInfoCard from "./CourseInfoCard";
import { useEffect, useState } from "react";
import SavingModal from "../../shared/modals/SavingModal";
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import ErrorModel from "../../shared/modals/ErrorModal";
import { useRouter } from "next/navigation";
import { DeleteCourseById, UpdateCourse } from "@/Utilities/api";
import moment from "moment";
import NewClass from "./NewClass";
import SelectPDFModal from "../PDF/SelectPDFModal";

interface EditCourseInfoProps {
    course: Course;
}

const EditCourseInfo: React.FC<EditCourseInfoProps> = ({course: incomingCourse}) => { 

    // Initializing Logic 
    const sortClassesByDate = (classes : Class[]): Class[] => {
        const sortedClasses = [...classes].sort((a, b) => {
            return new Date(a.scheduleStart).getTime() - new Date(b.scheduleStart).getTime();
        });
        return sortedClasses;
    }

    const areClassesOrderedByDate = (): boolean => {
        for (let i = 0; i < course.classes.length - 1; i++) {
            const currentClass = course.classes[i];
            const nextClass = course.classes[i + 1];
            if (new Date(currentClass.scheduleStart).getTime() > new Date(nextClass.scheduleStart).getTime()) {
                return false;
            }
        }
        return true;
    }

    // Constants
    const [course, setCourse] = useState<Course>(incomingCourse);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showPDFModal, setShowPDFModal] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string | null>(null);
    const router = useRouter();
    
    // Effects
    // This will sort the classes by date if they are not already sorted
    // when the component is first rendered and when the classes are updated.
    useEffect(() => {   
        if (!areClassesOrderedByDate()) {
            setCourse(prevCourse => {
                return {
                    ...prevCourse,
                    classes: sortClassesByDate(prevCourse.classes)
                }
            });
        }
    }
    , [course.classes]);

    // This will scroll to the bottom of the page when a new class is added.
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    , [course.classes.length]);

    // This will check if the course has been updated and set the unsaved changes flag.
    useEffect(() => {
        const incomingCourseString = JSON.stringify(incomingCourse);
        const courseString = JSON.stringify(course);
        if (incomingCourseString !== courseString) {
            setUnsavedChanges(true);
        } else {
            setUnsavedChanges(false);
        }
    }
    , [course]);

    // Event Handlers
    const handleOnClassCardDelete = (cls: Class): void => {
        if (cls.classId !== 0) {
            setCourse(prevCourse => {
                return {
                    ...prevCourse,
                    classes: prevCourse.classes.filter(classes => classes.classId !== cls.classId)
                }
            });
        } else {
            setCourse(prevCourse => {
                return {
                    ...prevCourse,
                    classes: prevCourse.classes.filter(classes => classes.scheduleStart !== cls.scheduleStart)
                }
            });
        }
    }

    const handleOnClassAdd = (): void => {

        const lastClass = course.classes[course.classes.length - 1];
        const lastClassAttendances = lastClass.attendances;
        lastClassAttendances.forEach(attendance => {
            attendance.attendanceId = 0;
        });

        if (course.classes.length === 0 || course.classes === null) {
            addNewClass(lastClassAttendances);
        } else {
            addNewClassPlusOneDay(lastClassAttendances);
        }
    }

    const handleClassScheduleStartChange = (date: Date, classId: number): void => {
        const updatedClasses = course.classes.map(classSchedule => {
            if (classSchedule.classId === classId) {
                return {
                    ...classSchedule,
                    scheduleStart: date
                }
            }
            return classSchedule;
        });
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: updatedClasses
            }
        });
    }

    const handleClassScheduleEndChange = (date: Date, classId: number): void => {
        const updatedClasses = course.classes.map(classSchedule => {
            if (classSchedule.classId === classId) {
                return {
                    ...classSchedule,
                    scheduleEnd: date
                }
            }
            return classSchedule;
        });
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: updatedClasses
            }
        });
    }


    const handleSaveCourse = async () => {
        console.log("Saving Course", course);
        setIsSaving(true);
        const response = await UpdateCourse(course);
        if (response.status === 200) {
            setCourse(response.data);
        } else {
            setErrorMessages(response)
        }
        setIsSaving(false);
        setUnsavedChanges(false);

    }

    const handleDeleteCourse = () => {
        setShowConfirmationModal(true);
    }

    const handleConfirmDeleteCourse = async () => {
        setIsSaving(true);
        try {
            await DeleteCourseById(course.courseId!);
        }
        catch (error) {
            throw error;
        }
        finally {
            router.push('/admin/editcourse/edit');
        }
    }

    // Helper Methods 
    const addNewClass = (attendances : Attendance[]): void => {
        
        const todayAt9AMMountainTime = moment().tz('America/Denver').set({ hour: 9, minute: 0, second: 0 }).toDate();
        const todayAt5PMMountainTime = moment().tz('America/Denver').set({ hour: 17, minute: 0, second: 0 }).toDate();

        const newClassSchedule: Class = {
            classId: 0,
            courseId: course.courseId,
            scheduleStart: todayAt9AMMountainTime,
            scheduleEnd: todayAt5PMMountainTime,
            attendances: attendances
        }
        console.log(newClassSchedule)
        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: [newClassSchedule]
            }
        });
    }

    const addNewClassPlusOneDay = (attendances : Attendance[]): void => {
        const lastClass = course.classes[course.classes.length - 1];

        console.log("Last Class", typeof(lastClass.scheduleStart));

        const addOneDay = (date: any): Date => {
            let output: Date;   
            if (typeof date === 'string') {
            output = moment(date).utc(true).add(1, 'days').toDate();
            } else {
                output = moment(date).add(1, 'days').toDate();
            }

            return output as Date;
        }

        const newClassSchedule: Class = {
            classId: 0, 
            courseId: course.courseId,
            scheduleStart: addOneDay(lastClass.scheduleStart),
            scheduleEnd: addOneDay(lastClass.scheduleEnd), 
            attendances: attendances
        }

        setCourse(prevCourse => {
            return {
                ...prevCourse,
                classes: [...prevCourse.classes, newClassSchedule]
            }
        });
    }

    return (
        <div className="w-full m-4">
         
            <div className="p-4">
                <h1 className="p-s text-3xl text-center font-bold"> Course Id: {course.courseId}</h1>
                {unsavedChanges && (
                    <div role="alert" className="alert alert-warning mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning: Unsaved Changes detected!</span>
                  </div>)}
            </div>
            
            <div className="bg-base-100 shawdow-md rounded-xl p-5 mb-4">
                <div className="mb-4 bg-base-300 rounded-xl p-4">
                    <CourseInfoCard course={course} />
                </div>
                <div className="mt-2 space-x-2">
                    <button 
                        className="btn btn-error text-white"
                        onClick={handleDeleteCourse}>
                            Delete Course
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick = {handleSaveCourse}>
                            Save Course
                    </button>
                    <button
                        className="btn btn-primary text-white"
                        onClick={() => setShowPDFModal(true)}
                    >
                        Add PDF
                    </button>
                    <button 
                        onClick={() => console.log(course)}
                        className="btn btn-primary text-white"
                    >
                        Log Course
                    </button>
                </div>
            </div>
          
            
        <div className="flex space-x-2">
            <div className="w-full">
                <div className="flex justify-center">
                    <a className="p-s text-2xl font-bold">
                        Classes
                    </a>
                </div>
                <div>
                    <div className="space-y-2">
                        {course.classes.map((cls, index) => (
                            <div key={index} className="flex justify-center">
                                <div className="bg-base-100 shadow-md rounded-xl relative p-4">
                                    <div className="flex justify-between mb-2">
                                        <a className="text-xl font-bold">Class {index + 1}</a>
                                    </div>
                                    <NewClass
                                        key={cls.classId}
                                        cls={cls}
                                        onDelete={(e) => handleOnClassCardDelete(e)}
                                        onScheduleStartChange={(date) => handleClassScheduleStartChange(date, cls.classId)}
                                        onScheduleEndChange={(date) => handleClassScheduleEndChange(date, cls.classId)}
                                    />
                                </div>
                            

                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-2">
                        <button 
                            className="btn btn-primary text-white"
                            onClick={handleOnClassAdd}>
                                Add Class
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex justify-center">
                    <a className="p-s text-2xl font-bold">
                        Attendance
                    </a>
                </div>
                <div className="bg-base-100 shadow-md rounded-xl p-4">
                   
                </div>
            </div>
        </div>

            {showConfirmationModal && (
                <ConfirmationModal
                    title={'Delete Course'}
                    message={'Are you sure you want to delete this course?'}
                    onConfirm={handleConfirmDeleteCourse}
                    onCancel={() => setShowConfirmationModal(false)} />
            )}


            {isSaving && (
                <SavingModal text={'Saving Course...'} />
            )}

            {errorMessages && (
                <ErrorModel
                    title='Error'
                    message={errorMessages}
                    onClose={() => setErrorMessages(null)} 
                    />
            )}

            <SelectPDFModal
                open={showPDFModal}
                onClose={() => setShowPDFModal(false)}
                onAdd={(pdf) => {
                    setCourse({...course, pdf: pdf, pdfId: pdf.pdfId});
                    setShowPDFModal(false);
                }}
                onRemove={() => {
                    setCourse({...course, pdf: null, pdfId: null});
                    setShowPDFModal(false);
                }}
                PDF={course.pdf}
            />

        </div>
    );
}

export default EditCourseInfo;