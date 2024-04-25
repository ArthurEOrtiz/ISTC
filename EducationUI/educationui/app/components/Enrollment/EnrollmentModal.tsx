import { Course, User, WaitList } from "@/app/shared/types/sharedTypes";
import { getAllUsers, GetCourseWaitList, SearchUsers } from "@/Utilities/api";
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
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(false); 
    const [ loadingWaitList, setLoadingWaitList ] = useState<boolean>(false);   
  

    // effects
    useEffect(() => {
        if (isOpen) {
            fetchUsers();
            getCourseWaitList();
        }
    }, [isOpen]);

    // handlers

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



    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-xl z-50 w-3/4">
                <div className='flex justify-between items-center mb-1'>
                    <p className="text-2xl font-bold">Enrollment</p>
                    <button onClick={onExit} className="text-error font-bold">X</button>
                </div>

               <div className='mb-4'>
                    <p>Select students to be enrolled to {course.title}.</p>
               </div>

                <div className='flex space-x-4'>
                    <div className='w-1/2'>
                        <p className="text-lg font-bold">Students</p>
                        
                        <label className="input input-bordered flex items-center gap-2 mb-2">
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

                        <div className="bg-base-100 rounded-xl space-y-2 p-4">

                            {loadingUsers ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                users?.map(user => (
                                    <div key={user.userId} className="border rounded-md p-2">
                                        <p>{user.firstName} {user.lastName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="w-1/2">
                        <p className='text-lg font-bold'>Waitlist</p>
                        <div className="bg-base-100 rounded-xl space-y-2 p-4">
                            {loadingWaitList ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                (waitListUsers && waitListUsers.length > 0) ? (
                                    waitListUsers.map((user: User) => (
                                        <div key={user.userId} className="border rounded-md p-2">
                                            <p>{user.firstName} {user.lastName}</p>
                                            <p>{user.email}</p>
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
        </div>
    );
};

export default EnrollmentModal;

