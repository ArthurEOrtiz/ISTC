import { Exam, User } from "@/app/shared/types/sharedTypes";
import { GetCourseEnrollment} from "@/Utilities/api";
import { useEffect, useState } from "react";

interface ExamModalProps {
    exams: Exam[] | null;
    courseId: number;
    isOpen: boolean;
    onExit: (exams: Exam[] | null) => void;
    onError: (message: string) => void;
}

const ExamModal: React.FC<ExamModalProps> = ({exams, courseId, isOpen, onExit, onError}) => {
    // State
    const [examList, setExamList] = useState<Exam[] | null>(exams);
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Effects
    useEffect(() => {
        if (exams && isOpen) {
            // console.log('Setting exam list');
            setExamList(exams);
            // console.log('Getting all users');
            getAllUsers();
        }
    }, [isOpen]);

    // Helper Functions
    const getAllUsers = async () => {
        // console.log('Getting all users');
        if (examList) {
            // console.log('Exam list is not null');
            setIsLoading(true);
            getUsers();
            setIsLoading(false);
            // console.log('Finished getting all users')
        }
    }

    const getUsers = async () => {
        const response = await GetCourseEnrollment(courseId);
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            onError(response)
        }
    }

    // Render
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Modal */}
            <div className="bg-base-100 p-4 rounded-xl z-10 min-w-96">
                <div>
                    {/* Header */}
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Exams</h1>
                        <button onClick={() => onExit(null)} className="text-3xl text-error font-bold">&times;</button>
                    </div>
                    {/* Main Content */}
                    <div>
                        {/* Exams */}
                        <div className="bg-base-300 p-4 rounded-xl">
                            {!isLoading ? (
                                examList != null && users ? 
                                    (   
                                        <table className="table w-full border-separate border-spacing-2">
                                            <thead>
                                                <tr>
                                                    <th>Student</th>
                                                    <th>Email</th>
                                                    <th>Has Passed</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {examList.map((exam: Exam, index: number) => {
                                                    const user = users.find((u) => u.student.studentId === exam.studentId);
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user ? `${user.firstName} ${user.lastName}` : 'User not found'}</td>
                                                            <td>{user ? user.email : 'User not found'}</td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox checkbox-success"
                                                                    defaultChecked={exam.hasPassed}
                                                                    onChange={(e) => {
                                                                        const newExamList = [...examList];
                                                                        newExamList[index].hasPassed = e.target.checked;
                                                                        setExamList(newExamList);
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-center text-error">No exams available!</p>
                                    )
                            ) : (
                                <span className="loading loading-spinner loading-lg"></span>
                            )}
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="flex justify-start mt-4">
                        <button 
                            onClick={() => onExit(examList)} 
                            className="btn btn-success text-white">
                                Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamModal;