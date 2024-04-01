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
    const [searchedCourses, setSearchedCourses] = useState<Course[]>(courses); // [ADDED] State for searched courses
    const [selectedCourses, setSelectedCourses] = useState<Course[]>(preselectedCourses); // Initialize with preselected courses
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const responseData = await getAllCourses();
                setCourses(responseData);
                setSearchedCourses(responseData); // [ADDED] Set searched courses to all courses
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
        console.log(selectedCourses);
        onSelect(selectedCourses);
        onClose();
    };

    const handleSearch = (searchTerm: string) => {
        const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchedCourses(filteredCourses);
    }

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
                        <div className="mb-4">
                            <p className="text-lg mb-4">Please select courses from the list below</p>

                            <label className="input input-bordered flex items-center gap-2">
                                <input 
                                    type="text"
                                    className="grow"
                                    placeholder="Search" 
                                    onChange={(e) => {handleSearch(e.target.value)}}
                                />
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 16 16" 
                                    fill="currentColor" 
                                    className="w-4 h-4 opacity-70">
                                        <path 
                                        fillRule="evenodd" 
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" 
                                        clipRule="evenodd" 
                                        />
                                </svg>
                            </label>
                        </div>
                        

                        <ul className="mb-4">
                            {searchedCourses.map((course, index) => (
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
                    {/* <button 
                        onClick={() => console.log(selectedCourses)}
                        className="btn btn-primary text-white px-4 py-2 mr-2">
                            Debug
                    </button> */}
                    <button 
                        onClick={handleSelect} 
                        className="btn btn-primary text-white px-4 py-2 mr-2">
                            Select
                    </button>
                    <button 
                        onClick={onClose} 
                        className="btn btn-ghost px-4 py-2">
                            Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectCourseModal;
