import { Course, WaitList } from "@/app/shared/types/sharedTypes";

interface EnrollmentModalProps {
    course: Course;
    isOpen: boolean;
    onExit: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, isOpen, onExit }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-xl z-50 w-2/3">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-xl font-semibold">Enrollment</h2>
                    <button onClick={onExit} className="text-error font-bold">X</button>
                </div>
                
                <p className="text-lg mb-4">You are on the wait list for this course. You will be notified if a spot opens up.</p>
               
            </div>
        </div>
    );
};

export default EnrollmentModal;

