import ConfirmationModal from "@/app/shared/modals/ConfirmationModal";
import { Course, User } from "@/app/shared/types/sharedTypes";
import { DeleteWaitListByUserIdCourseId, DropUser, EnrollUser, EnrollUsers, getAllUsers, GetCourseEnrollment, GetDropQueue, GetEnrollmentQueue, SearchUsers } from "@/Utilities/api";
import { useEffect, useState } from "react";

interface EnrollmentModalProps {
    course: Course;
    isOpen: boolean;
    onExit: () => void;
    onError: (message: string) => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, isOpen, onExit, onError }) => {
    const [ users, setUsers] = useState<User[]>();
    const [ enrollmentQueue, setEnrollmentQueue ] = useState<User[]>();
    const [ dropQueue, setDropQueue ] = useState<User[]>();
    const [ selectedUsers, setSelectedUsers ] = useState<User[]>([]);
    const [ enrolledUsers, setEnrolledUsers ] = useState<User[]>([]);
    const [ userToDrop, setUserToDrop ] = useState<User>();
    const [ userToEnroll, setUserToEnroll ] = useState<User>();
    const [ loadingStudent, setLoadingStudnets ] = useState<boolean>(false);
    const [ loadingEnrolledUsers, setLoadingEnrolledUsers ] = useState<boolean>(false);
    const [ loadingEnrollmentQueue, setLoadingEnrollmentQueue ] = useState<boolean>(false);
    const [ loadingDropQueue, setLoadingDropQueue ] = useState<boolean>(false);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ confirmationTitle, setConfirmationTitle ] = useState<string>('');
    const [ confirmationMessage, setConfirmationMessage ] = useState<string>('');
    // effects
    useEffect(() => {
        if (isOpen) {
            getStudents();
            getEnrollmentQueue();
            getDropQueue();
            getEnrolledUsers();
        }
    }, [isOpen]);

    // handlers
    const handleOnConfirm = () => {
        switch (confirmationTitle) {
            case 'Drop Student':
                dropStudent();
                break;
            case 'Enroll Selected':
                enrollSelected();
                break;
            case 'Enroll Student':
                enrollUser(userToEnroll!);
                removeStudentFromEnrollmentQueue(userToEnroll!);
                break;
        }
        setShowConfirmationModal(false);
    }

    const handleEnrollSelected = () => {
        setConfirmationTitle('Enroll Selected');
        setConfirmationMessage('Are you sure you want to enroll the selected students?');
        setShowConfirmationModal(true);
    }

    const handleEnrollUser = (user: User) => {
        setUserToEnroll(user);
        setConfirmationTitle('Enroll Student');
        setConfirmationMessage(`Are you sure you want to enroll ${user.firstName} ${user.lastName} in the course?`);
        setShowConfirmationModal(true);
    }

    const handleDropStudent = (user: User) => {
        setUserToDrop(user);
        setConfirmationTitle('Drop Student');
        setConfirmationMessage(`Are you sure you want to drop ${user.firstName} ${user.lastName} from the course?`);
        setShowConfirmationModal(true);
    }

    // helpers
    const getStudents = async () => {
        setLoadingStudnets(true);
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingStudnets(false);
    }

    const searchStudents = async (search: string) => {
        setLoadingStudnets(true);
        const response = search === '' ? await getAllUsers() : await SearchUsers(search);
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingStudnets(false);
    }

    const getEnrollmentQueue = async () => {
        setLoadingEnrollmentQueue(true);
        const response = await GetEnrollmentQueue(course.courseId);
        if (response.status === 200) {
            setEnrollmentQueue(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingEnrollmentQueue(false);
    }

    const getDropQueue = async () => {
        setLoadingDropQueue(true);
        const response = await GetDropQueue(course.courseId);
        if (response.status === 200) {
            setDropQueue(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingDropQueue(false);
    }

    const getEnrolledUsers = async () => {
        setLoadingEnrolledUsers(true);
        const response = await GetCourseEnrollment(course.courseId);
        if (response.status === 200) {
            setEnrolledUsers(response.data);
            setSelectedUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingEnrolledUsers(false);
    }

    const toggleUserSelection = (user: User) => {
        const isSelected = selectedUsers.some((selectedUser) => selectedUser.userId === user.userId);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.userId !== user.userId));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    }

    const enrollSelected = () => {
        const usersToEnroll = selectedUsers.filter(selectedUser => {
            return !enrolledUsers.some(enrolledUser => enrolledUser.userId === selectedUser.userId);
        });

       enrollUsers(usersToEnroll);
    }

    const enrollUsers = async (users: User[]) => {
        const response = await EnrollUsers(course.courseId, users);
        if (response.status === 201) {
            await getEnrolledUsers();
        } else {
            onError(response as unknown as string);
        }
    }

    const enrollUser = async (user: User) => {
        const response = await EnrollUser(user.userId, course.courseId);
        if (response.status === 201) {
            await getEnrolledUsers();
        } else {
            onError(response as unknown as string);
        }
    }


    const dropStudent = async () => {
        const response = await DropUser(userToDrop!.userId, course.courseId);
        if (response.status === 204) {
            await getEnrolledUsers();
        } else {
            onError(response as unknown as string);
        }
        setUserToDrop(undefined);
    }

    const removeStudentFromEnrollmentQueue = async (user: User) => {
        const response = await DeleteWaitListByUserIdCourseId(user.userId, course.courseId);
        if (response.status === 204) {
            await getEnrollmentQueue();
        } else {
            onError(response as unknown as string);
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-4 rounded-xl z-50 m-4 w-full h-5/6">
                
                {/* Header */}
                <div>
                    <div className='flex justify-between items-center mb-1'>
                        <p className="text-2xl font-bold">Enrollment Manager</p>
                        <button onClick={onExit} className="text-3xl text-error font-bold">&times;</button>
                    </div>

                    <div className='mb-2'>
                        <p>{course.title}</p>
                    </div>
               </div>


                {/* Main Content */}    
                <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-5/6">
                        
                    {/* Students */}
                    <div className='bg-base-300 rounded-xl p-4'>
                        <div className="space-y-2 mb-2">
                            <div className="flex justify-between">
                                <a className='text-2xl font-bold'>Students</a>
                                <button
                                    className='btn btn-sm btn-success text-white'
                                    onClick={handleEnrollSelected}
                                >
                                    Enroll Selected
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input 
                                        type="text"
                                        className="grow"
                                        placeholder="Search" 
                                        onChange={(e) => searchStudents(e.target.value)}
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
                        </div>

                        <div>
                            {loadingStudent ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                    <div className="space-y-1">
                                        {users?.map((user) => (
                                            <div key={user.userId} className='flex justify-between items-center border rounded-lg p-1'>
                                                <div>
                                                    <p>{user.firstName} {user.lastName} | {user.email}</p>
                                                    <p>{user.employer}</p>
                                                </div>
                                                <input 
                                                    type="checkbox"
                                                    className="checkbox checkbox-success"
                                                    checked={selectedUsers.some(selectedUser => selectedUser.userId === user.userId)}
                                                    onChange={() => toggleUserSelection(user)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    
                    </div>

                    {/* Enrolled Students */}   

                    <div className='bg-base-300 rounded-xl p-4'>
                        <div className='mb-2'>
                            <a className='text-2xl font-bold'>Enrolled Students</a>
                        </div>
                        <div>
                            {loadingEnrolledUsers ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                    <div className="space-y-1">
                                        {enrolledUsers?.length !== 0 ? (
                                            enrolledUsers?.map((user) => (
                                                <div key={user.userId} className='flex justify-between items-center border rounded-lg p-1'>
                                                    <div>
                                                        <p>{user.firstName} {user.lastName} | {user.email}</p>
                                                        <p>{user.employer}</p>
                                                    </div>
                                                    
                                                    <button 
                                                        className='btn btn-sm btn-error text-white'
                                                        onClick={() => handleDropStudent(user)}
                                                    >
                                                        Drop
                                                    </button>
                                                </div>
                                        ))
                                        ) : (
                                            <p className="text-error">No students enrolled in the course.</p>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Enrollment Queue */}

                    <div className='bg-base-300 rounded-xl p-4'>
                        <div className="mb-2">
                            <a className='text-2xl font-bold'>Enrollment Queue</a>
                        </div>
                        <div>
                            {loadingEnrollmentQueue ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                    <div className='space-y-1'>
                                        {enrollmentQueue?.length !== 0 ? (
                                            enrollmentQueue?.map((user) => (
                                                <div key={user.userId} className='flex justify-between items-center border rounded-lg p-1'>
                                                    <div>
                                                        <p>{user.firstName} {user.lastName} | {user.email}</p>
                                                        <p>{user.employer}</p>
                                                    </div>
                                                    <button 
                                                        className='btn btn-sm btn-success text-white'
                                                        onClick={() => handleEnrollUser(user)}
                                                    >
                                                        Enroll
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-error">No students in the enrollment queue.</p>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    
                    {/* Drop Queue */}
                    
                    <div className='bg-base-300 rounded-xl p-4'>
                        <div className='mb-2'>
                            <a className='text-2xl font-bold'>Drop Queue</a>
                        </div>
                        <div>
                            {loadingDropQueue ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                    <div className='space-y-1'>
                                        {dropQueue?.length !== 0 ? (
                                            dropQueue?.map((user) => (
                                                <div key={user.userId} className='flex justify-between items-center border rounded-lg p-1'>
                                                    <div>
                                                        <p>{user.firstName} {user.lastName} | {user.email}</p>
                                                        <p>{user.employer}</p>
                                                    </div>
                                                    <button 
                                                        className='btn btn-sm btn-error text-white'
                                                        onClick={() => handleDropStudent(user)}
                                                    >
                                                        Drop
                                                    </button>
                                                </div>
                                        ))
                                        ) : (
                                            <p className="text-error">No students in the drop queue.</p>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>

                            
            </div>
            {showConfirmationModal && (
                <ConfirmationModal
                    title={confirmationTitle}
                    message={confirmationMessage}
                    onConfirm={handleOnConfirm}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            )}
        </div>
    );
};

export default EnrollmentModal;

