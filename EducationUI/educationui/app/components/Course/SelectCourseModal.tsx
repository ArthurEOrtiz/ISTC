import { getAllCourses } from "@/Utilities/api";
import { Course } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";

interface SelectCourseModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (course: Course[]) => void;
    courses: Course[];
}

const SelectCourseModal: React.FC<SelectCourseModalProps> = ({ open, onClose, onSelect, courses: preselectedCourses }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<Course[]>(preselectedCourses); // Initialize with preselected courses
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const responseData = await getAllCourses();
                setCourses(responseData);
            } catch (error) {
                setError("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchCourses();
        }
    }, [open]);

    const toggleCourseSelection = (course: Course) => {
        const isSelected = selectedCourses.some((selectedCourse) => selectedCourse.courseId === course.courseId);
        if (isSelected) {
            setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse.courseId !== course.courseId));
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    }

    const handleSelect = () => {
        //console.log(selectedCourses);
        onSelect(selectedCourses);
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${open ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="bg-base-100 p-8 rounded-lg z-50">

                <h2 className="text-xl font-semibold mb-4">Select Course</h2>

                {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p className="text-lg mb-4">Please select courses from the list below</p>
                        <ul className="mb-4">
                            {courses.map((course, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        className={`w-full text-left p-2 rounded border ${selectedCourses.some((selectedCourse) => selectedCourse.courseId === course.courseId) ? "bg-green-500" : ""}`}
                                        onClick={() => toggleCourseSelection(course)}
                                    >
                                        {course.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <div className="flex justify-between">
                    <button onClick={handleSelect} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Select</button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SelectCourseModal;
