import ConfirmationModal from "@/app/shared/modals/ConfirmationModal";
import { Course, User, WaitList } from "@/app/shared/types/sharedTypes";
import { DropUser, EnrollUsers, getAllUsers, GetCourseEnrollment, GetCourseWaitList, SearchUsers } from "@/Utilities/api";
import { on } from "events";
import { useEffect, useState } from "react";

interface EnrollmentModalProps {
    course: Course;
    isOpen: boolean;
    onExit: () => void;
    onError: (message: string) => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, isOpen, onExit, onError }) => {
    const [ users, setUsers] = useState<User[]>();
    const [ waitListUsers, setWaitListUsers ] = useState<User[]>();
    const [ selectedUsers, setSelectedUsers ] = useState<User[]>([]);
    const [ enrolledUsers, setEnrolledUsers ] = useState<User[]>([]);
    const [ userToDelete, setUserToDelete ] = useState<User>(); 
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(false); 
    const [ loadingWaitList, setLoadingWaitList ] = useState<boolean>(false);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ confirmationTitle, setConfirmationTitle ] = useState<string>('');
    const [ confirmationMessage, setConfirmationMessage ] = useState<string>('');
    // effects
    useEffect(() => {
        if (isOpen) {
            fetchUsers();
            getCourseWaitList();
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
            default:
                break;
        }
        setShowConfirmationModal(false);
    }

    const handleEnrollSelected = () => {
        setConfirmationTitle('Enroll Selected');
        setConfirmationMessage('Are you sure you want to enroll the selected students?');
        setShowConfirmationModal(true);
    }

    // helpers
    const fetchUsers = async () => {
        setLoadingUsers(true);
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingUsers(false);
    }

    const searchUsers = async (search: string) => {
        setLoadingUsers(true);
        let response;
        if (search === '') {
            response = await getAllUsers();
        } else {
            response = await SearchUsers(search);
        }
    
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingUsers(false);
    }

    const getCourseWaitList = async () => {
        setLoadingWaitList(true);
        const response = await GetCourseWaitList(course.courseId);
        if (response.status === 200) {
            setWaitListUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
        setLoadingWaitList(false);
    }

    const getEnrolledUsers = async () => {
        const response = await GetCourseEnrollment(course.courseId);
        if (response.status === 200) {
            setEnrolledUsers(response.data);
            setSelectedUsers(response.data);
        } else {
            onError(response as unknown as string);
        }
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



    const dropStudent = async () => {

        if (!userToDelete) {
            onError('No user selected to drop');
            return;
        }

        const response = await DropUser(userToDelete.userId, course.courseId);
        if (response.status === 204) {
            setUserToDelete(undefined);
            await getEnrolledUsers();
        } else {
            onError(response as unknown as string);
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-xl z-50 m-4 w-full">
                <div className='flex justify-between items-center mb-1'>
                    <p className="text-2xl font-bold">Enrollment</p>
                    <button onClick={onExit} className="text-error font-bold">X</button>
                </div>

               <div className='mb-4'>
                    <p>Select students to be enrolled to {course.title}.</p>
               </div>

               <div className='mb-4'>
                    <button 
                        className="btn btn-primary text-white"
                        onClick={handleEnrollSelected}
                        >
                        Enroll Selected
                    </button>
                </div>

                <div className="bg-base-100 rounded-xl p-4 mb-4">
                        <p className='text-lg font-bold mb-4'>Enrolled Students</p>
                        <div className="space-y-2">
                            {enrolledUsers.map((user) => (
                                <div key={user.userId} className='flex justify-between space-x-2'>

                                    <div  className="border rounded-md p-2 w-full">
                                        <p className=''>{user.firstName} {user.lastName} - {user.email} | {user.employer}</p>
                                    </div>

                                    <div className="">
                                        <button 
                                            className="btn btn-error text-white"
                                            onClick={() => {
                                                setConfirmationTitle('Drop Student');
                                                setConfirmationMessage(`Are you sure you want to drop ${user.firstName} ${user.lastName} from the course?`);
                                                setShowConfirmationModal(true);
                                                setUserToDelete(user);
                                            }}
                                            >
                                            Drop Student
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>

                <div className='flex space-x-4'>
                    <div className='w-full bg-base-100 rounded-xl p-4'>
                        <p className="text-lg font-bold">Students</p>
                        
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                                <input 
                                    type="text"
                                    className="grow"
                                    placeholder="Search" 
                                    onChange={(e) => {searchUsers(e.target.value)}}
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

                        <div className="space-y-2 ">

                            {loadingUsers ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                users?.map(user => (
                                    <div key={user.userId} className="">
                                        <button 
                                            className={`text-left p-2 border rounded-md w-full ${selectedUsers.some((selectedUser) => selectedUser.userId === user.userId) ? `bg-green-500` : "" }`}
                                            onClick={() =>{toggleUserSelection(user)}}
                                            >
                                            <p>{user.firstName} {user.lastName} - {user.email}</p>
                                            <p>{user.employer}</p>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="w-full bg-base-100 rounded-xl p-4">
                        <p className='text-lg font-bold mb-4'>Waitlisted Students</p>
                        <div className="space-y-2">
                            {loadingWaitList ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                (waitListUsers && waitListUsers.length > 0) ? (
                                    waitListUsers.map((user: User) => (
                                        <div key={user.userId} className="w-full">
                                            <button 
                                                className={`text-left p-2 border rounded-md w-full ${selectedUsers.some((selectedUser) => selectedUser.userId === user.userId) ? `bg-green-500` : ""}`}
                                                onClick={() =>{toggleUserSelection(user)}}
                                                >
                                                <p>{user.firstName} {user.lastName} - {user.email}</p>
                                                <p>{user.employer}</p>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-error'>No students on waitlist</p>
                                )
                            )}
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

