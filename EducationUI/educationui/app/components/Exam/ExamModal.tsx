import { Exam } from "@/app/shared/types/sharedTypes";

interface ExamModalProps {
    exams: Exam[] | null;
    isOpen: boolean;
    onExit: (exams: Exam[] | null) => void;
    onError: (message: string) => void;
}

const ExamModal: React.FC<ExamModalProps> = ({exams, isOpen, onExit, onError}) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-100 p-4 rounded-xl z-10">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Exams</h1>
                    <button onClick={() => onExit(null)} className="text-3xl text-error font-bold">&times;</button>
                </div>
                <div className="space-y-2">
                    {exams != null ? 
                        (
                            exams.map((exam: Exam, index: number) => (
                                <div key={index} className="bg-base-200 rounded-xl p-4">
                                    <p>Exam ID    {exam.examId}</p>
                                    <p>Course ID  {exam.courseId}</p>
                                    <p>Student ID {exam.studentId}</p>
                                    <p>Has Passed {`${exam.hasPassed ? 'Passed' : 'Failed'}`}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-error">No exams available!</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ExamModal;