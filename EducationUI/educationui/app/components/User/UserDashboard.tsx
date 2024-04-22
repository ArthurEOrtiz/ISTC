'use client';
import { useEffect, useState } from 'react';
import { CalculateStudentCreditHours, DeleteUserById, getStudentIdByClerkId, GetUserByClerkId, UpdateUser, UpdateUserContact } from "@/Utilities/api";
import {  User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import UserInfoCard from './UserInfoCard';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import EditContactModal from './EditContactModal';
import ConfirmationModal from '@/app/shared/modals/ConfirmationModal';
import EditEmployerModal from './EditEmployerModal';
import { useRouter } from 'next/navigation';
import UserEnrolledCourses from './UserEnrolledCourses';

interface UserDashboardProps {
    clerkId: string;    
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    
    const [ user, setUser ] = useState<User>();
    const [ studentId, setStudentId ] = useState<number>();

    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ showEditContactModal, setShowEditContactModal ] = useState(false);

    const [ showEditEmployerModal, setShowEditEmployerModal ] = useState(false);

    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    const [ showConfirmationModalCancel, setShowConfirmationModalCancel ] = useState(false);
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState('');
    const [ confirmationMessage, setConfirmationMessage ] = useState('');

    const router = useRouter();
    const { user: clerkUser } = useUser(); 
  

    useEffect(() => {
        const fetchUser = async () => {
            const response = await GetUserByClerkId(clerkId);
            switch (response.status) {
                case 200:
                    setUser(response.data);
                    break;
                case 404:
                    setErrorMessage('User not found.');
                    setShowErrorMessage(true);
                    break;
                case 500:
                    setErrorMessage('Internal server error.');
                    setShowErrorMessage(true);
                    break;
                default:
                    // Handle other status codes if needed
                    break;
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchStudent = async () => {
            if (!user) {
                return;
            }
            const response = await getStudentIdByClerkId(clerkId);
            if (response.status === 200) {
                setStudentId(response.data);
            } else {
                setErrorMessage('Student not found.');
                setShowErrorMessage(true);
            }
        }
        fetchStudent();
    }
    , [user]);

    useEffect(() => {
        const calculateCreditHours = async () => {
            if (!studentId) {
                return;
            }
            const response = await CalculateStudentCreditHours(studentId);
            if (response.status !== 200) {
                setErrorMessage('Error calculating credit hours.');
                setShowErrorMessage(true);
            }
        }
        calculateCreditHours();
    }
    , [studentId]);
            


    // Handlers
    const handleOnSignOut = () => {
        router.push('/');
    }

    const handleEditContactModelOnSubmit =  async (editUser: User) => {
        console.log(editUser);
        const response = await UpdateUserContact(editUser);

        switch (response.status) {
            case 200:
                setUser(response.data);
                setShowEditContactModal(false);
                setConfirmationModalTitle('Success');
                setConfirmationMessage('Contact information updated successfully.');
                setShowConfirmationModal(true);
                break;
            case 400:
                setErrorMessage('Contact information is invalid. Please try again.');
                setShowErrorMessage(true);
                break;
            case 404:
                setErrorMessage('User information not found.');
                setShowErrorMessage(true);
                break;
            case 500:
                setErrorMessage('Internal server error. Please contact support.');
                setShowErrorMessage(true);
                break;
            default:
                console.error('Unhandled status code:', response);
                break;
        }
    }

    const handleEditEmployerModalOnSubmit = async (editUser: User) => {
        
        const response = await UpdateUser(editUser);
        console.log("editUser", editUser)
        console.log(response.status);
        switch (response.status) {
            case 200:
                setUser(response.data);
                setShowEditEmployerModal(false);
                setConfirmationModalTitle('Success');
                setConfirmationMessage('Employer information updated successfully.');
                setShowConfirmationModal(true);
                break;
            case 404:
                setErrorMessage('User information not found.');
                setShowErrorMessage(true);
                break;
            case 500:
                setErrorMessage('Internal server error. Please contact support.');
                setShowErrorMessage(true);
                break;
            default:
                // Handle other status codes if needed
                break;
        }
    }

    const handleModalConfirm = () => {
        setShowConfirmationModal(false);
        if (confirmationModalTitle === 'Delete Account') {
            deleteAccount();
        }
    }

    const handleOnDeleteAccount = () => {
        setConfirmationModalTitle('Delete Account');
        setConfirmationMessage('Are you sure you want to delete your account?');
        setShowConfirmationModalCancel(true);
        setShowConfirmationModal(true);
    }

    // Helper Methods
    const deleteAccount = async () => {
        if (!user?.userId) {
            setErrorMessage('User not found.');
            setShowErrorMessage(true);
            return;
        }

        if (!clerkUser) {
            setErrorMessage('User not found.');
            setShowErrorMessage(true);
            return;
        }
        // Delete account
        try {
            clerkUser.delete();
        } catch (error) {
            console.error('Error deleting user:', error);
            setErrorMessage('Error deleting user.');
            setShowErrorMessage(true);
            return
        }

        const response = await DeleteUserById(user.userId)

        switch (response.status) {
            case 200:
                router.push('/');
                break;
            case 404:
                setErrorMessage('User not found.');
                setShowErrorMessage(true);
                break;
            case 500:
                setErrorMessage('Internal server error.');
                setShowErrorMessage(true);
                break;
            default:
                // Handle other status codes if needed
                break;
        }
    }

    const isUserAdmin = () => {
        if (!clerkUser) {
            return false;
        }
        const isAdmin = clerkUser.publicMetadata.isAdmin;
        return isAdmin as boolean;
    }
    

    // Render
    if (!user) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>

            <div className='flex flex-row mt-4'>
                <div className='basis-1/4' ></div>
                <div className='basis-1/2 space-y-3'>
                    <div>
                        <UserInfoCard user={user}/>
                    </div>
                    <div>
                        <UserEnrolledCourses user={user}/>
                    </div>
                    
                </div>
                <div className='basis-1/4'>
                    <div className="ml-2 ">
                        <div className='flex flex-col pr-2'>


                            <ul className='menu bg-base-100 rounded-box w-full'>
                                <li>
                                    <h2 className=" text-2xl"> User Actions</h2>
                                </li>
                                <ul>
                                    <details open>
                                        <summary className='text-lg'>Account</summary>
                                        <ul className='space-y-2 mt-1'>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    onClick={() => setShowEditContactModal(true)}
                                                    >
                                                        Update Contact Information
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    onClick={() => setShowEditEmployerModal(true)}
                                                    >
                                                        Update Employer Information
                                                </button>
                                            </li>
                                        </ul>
                                    </details>
                                </ul>
                                <ul>
                                    <details open>
                                        <summary className='text-lg mt-2'>Certifications</summary>
                                        <ul className='space-y-2 mt-1'>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    >
                                                        Apply for Appraisor Certification
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    >
                                                        Apply for Mapping Certification
                                                </button>
                                            </li>
                                        </ul>
                                    </details>
                                </ul>
                                <ul>
                                    <details>
                                        <summary className='text-lg text-error mt-2'>
                                            Sign Out/Delete
                                        </summary>
                                        <ul className='space-y-2 mt-1'>
                                            <SignOutButton
                                                signOutCallback={handleOnSignOut}>
                                                <button className="btn btn-error text-white w-full">Sign Out</button>
                                            </SignOutButton>
                                            <li>
                                                <button
                                                    className="btn btn-error text-white w-full"
                                                    onClick={handleOnDeleteAccount}
                                                    >
                                                        Delete Account
                                                </button>
                                            </li>
                                        </ul>
                                    </details>    
                                </ul>
                                {isUserAdmin() && (
                                <ul>
                                    <details open>
                                        <summary className='text-lg mt-2'>Admin</summary>
                                        <ul className='space-y-2 mt-1'>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    onClick={() => router.push('/admin')}
                                                    >
                                                        Admin Dashboard
                                                </button>
                                            </li>

                                        </ul>
                                    </details>
                                </ul>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                
            <EditContactModal 
                user={user} 
                isOpen={showEditContactModal} 
                onCancel={() => setShowEditContactModal(false)}
                onSubmit={(editUser) => handleEditContactModelOnSubmit(editUser)}
            />

            <EditEmployerModal
                user={user}
                isOpen={showEditEmployerModal}
                onCancel={() => setShowEditEmployerModal(false)}
                onSubmit={(editUser) => handleEditEmployerModalOnSubmit(editUser)}
            />
            
            {showErrorMessage && (
                <ErrorModal
                    title="Error"
                    message={errorMessage}
                    onClose={() => setShowErrorMessage(false)}
                />
            )}

            {
                showConfirmationModal && (!showConfirmationModalCancel ? (
                    <ConfirmationModal
                        title={confirmationModalTitle}
                        message={confirmationMessage}
                        onConfirm={() => setShowConfirmationModal(false)}
                    />
                ) : (
                    <ConfirmationModal
                        title={confirmationModalTitle}
                        message={confirmationMessage}
                        onConfirm={handleModalConfirm}
                        onCancel={() => setShowConfirmationModalCancel(false)}
                    />
                ))
            }


        </div>
    );
}

export default UserDashboard;
