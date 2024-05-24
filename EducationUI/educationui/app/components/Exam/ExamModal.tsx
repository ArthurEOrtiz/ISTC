import { Exam, User } from "@/app/shared/types/sharedTypes";
import { GetUserByStudentId } from "@/Utilities/api";
import { useEffect, useState } from "react";

interface ExamModalProps {
    exams: Exam[] | null;
    isOpen: boolean;
    onExit: (exams: Exam[] | null) => void;
    onError: (message: string) => void;
}

const ExamModal: React.FC<ExamModalProps> = ({exams, isOpen, onExit, onError}) => {
    const [examList, setExamList] = useState<Exam[] | null>(exams);
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (exams && isOpen) {
            console.log('Setting exam list');
            setExamList(exams);
            console.log('Getting all users');
            getAllUsers();
        }
    }, [isOpen]);

    const getAllUsers = async () => {
        console.log('Getting all users');
        if (examList) {
            console.log('Exam list is not null');
            setIsLoading(true);
            await Promise.all(examList.map(async (exam: Exam) => { await getUsers(exam.studentId) }));
            setIsLoading(false);
            console.log('Finished getting all users')
        }
    }

    const getUsers = async (studentId : number) => {
        const response = await GetUserByStudentId(studentId);
        if (response.status === 200){
            setUsers([...(users || []), response.data]);
        } else {
            onError(response)
        }
    }

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
                        <div className="space-y-2">
                            {!isLoading ? (
                                examList != null ? 
                                    (
                                        examList.map((exam: Exam, index: number) => (
                                            <div key={index} className="bg-base-200 rounded-xl p-4">
                                                <p>Exam ID    {exam.examId}</p>
                                                <p>Student ID {exam.studentId}</p>
                                                <p>Has Passed {`${exam.hasPassed ? 'Passed' : 'Failed'}`}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-error">No exams available!</p>
                                    )
                            ) : (
                                <span className="loading loading-spinner loading-lg"></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamModal;