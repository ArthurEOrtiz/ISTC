'use client';
import { useEffect, useState } from 'react';
import { CalculateAccumulatedCredit, DeleteUserById, GetUserById, UpdateUser, UpdateUserContact } from "@/Utilities/api";
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
import ActionBar from '@/app/shared/ActionBar';
import UserDeleteModal from './UserDeleteModal';
import UserCertificationModal from '../Certification/UserCertificationModal';

interface UserDashboardProps {
    userId: number;    
}

const UserDashboard: React.FC<UserDashboardProps> = ({userId}) => {
    
    const [ user, setUser ] = useState<User>();

    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ showEditContactModal, setShowEditContactModal ] = useState(false);

    const [ showEditEmployerModal, setShowEditEmployerModal ] = useState(false);

    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    const [ showConfirmationModalCancel, setShowConfirmationModalCancel ] = useState(false);
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState('');
    const [ confirmationMessage, setConfirmationMessage ] = useState('');

    const [ showUserCertificationModal, setShowUserCertificationModal ] = useState(false);  

    const [ showUserDeleteModal, setShowUserDeleteModal] = useState(false);  

    const router = useRouter();
    const { user: clerkUser } = useUser(); 

    useEffect(() => {
        fetchUser();
        calculateCreditHours();
    }, []);

    // Handlers
    const handleOnSignOut = () => {
        router.push('/');
    }

    const handleEditContactModelOnSubmit =  async (editUser: User) => {
        console.log(editUser);
        const response = await UpdateUserContact(editUser);
        //console.log(response);

        switch (response.status) {
            case 200:
                //console.log(response.data);
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
        // console.log("editUser", editUser)
        // console.log(response.status);
        // console.log(response);
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
                console.error('Unhandled status code:', response);
                break;
        }
    }

    const handleModalConfirm = () => {
        setShowConfirmationModal(false);
        setConfirmationModalTitle('');
        setConfirmationMessage('');
        if (confirmationModalTitle === 'Delete Account') {
            setShowUserDeleteModal(true);
            //deleteAccount();
        }
    }

    const handleOnDeleteAccount = () => {
        setConfirmationModalTitle('Delete Account');
        setConfirmationMessage('Are you sure you want to delete your account? All records will be lost and cannot be recovered.');
        setShowConfirmationModal(true);
        setShowConfirmationModalCancel(true);
    }

    const handleConfirmationModalOnCancel = () => {
        return(
            setShowConfirmationModal(false),
            setShowConfirmationModalCancel(false),
            setConfirmationModalTitle(''),
            setConfirmationMessage('')
        )
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
            case 204:
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

    const calculateCreditHours = async () => {
        if (!user) {
            return;
        }

        const response = await CalculateAccumulatedCredit(user.userId);
        if (response.status === 200) {
            setUser((prevUser) => {
                if (prevUser) {
                    return {
                        ...prevUser,
                        student: {
                            ...prevUser.student,
                            accumulatedCredit: response.data
                        }
                    }
                }
                return prevUser;
            });
        } else{
            setErrorMessage('Error calculating credit hours.');
            setShowErrorMessage(true);
        }
    }

    const fetchUser = async () => {
        const response = await GetUserById(userId);
        //console.log(response);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            setErrorMessage('Error fetching user information');
            setShowErrorMessage(true);
        }
    };

    // Render
    const renderUserActions = () => {
        return (
            <>
                <li>
                    <details>
                        <summary>Account</summary>
                        <ul className='p-2 bg-base-300 z-10'>
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => setShowEditContactModal(true)}
                                    >
                                        Update Contact 
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-nowrap"
                                    onClick={() => setShowEditEmployerModal(true)}
                                    >
                                        Update Employer
                                </button>
                            </li>
                            <details>
                                <summary className='text-error'>Sign Out/Delete</summary>
                                <ul className='p-2 bg-base-300 z-10'>
                                    <li>
                                        <SignOutButton
                                            signOutCallback={handleOnSignOut}>
                                            <button className="text-nowrap text-error">Sign Out</button>
                                        </SignOutButton>
                                    </li>
                                    <li>
                                        <button
                                            className="text-nowrap text-error"
                                            onClick={handleOnDeleteAccount}
                                            >
                                                Delete Account
                                        </button>
                                    </li>
                                </ul>

                            </details>
                        </ul>
                    </details>
                </li>

                <li>
                    <button
                        className="text-nowrap"
                        onClick={() => setShowUserCertificationModal(true)} 
                        >
                            Certifications
                    </button>
                </li>

                {isUserAdmin() && (
                    <li>
                        <details>
                            <summary>Admin</summary>
                            <ul className='p-2 bg-base-300 z-10'>
                                <li>
                                    <button
                                        className="text-nowrap"
                                        onClick={() => router.push('/admin/courses')}
                                        >
                                            Courses
                                    </button>

                                </li>
                                <li>
                                    <button
                                        className="text-nowrap"
                                        onClick={() => router.push('/admin/users')}
                                        >
                                            Users
                                    </button>
                                </li>
                
                                <li>
                                    <button
                                        className="text-nowrap"
                                        onClick={() => router.push('/admin/topics')}
                                        >
                                            Topics
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
            </>
        );
    }

    if (!user) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>
         
            <div className='space-y-2 p-4'>
                <div className='bg-base-100 rounded-xl p-5'>
                    <div className='bg-base-300 rounded-xl p-4'>
                        <UserInfoCard user={user}/>
                    </div>
                    
                    <ActionBar navList={renderUserActions()} />
                </div>
                <div>
                    <UserEnrolledCourses user={user}/>
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
                    onClose={() => {
                        setShowErrorMessage(false)
                        setErrorMessage('')
                    }}
                />
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title={confirmationModalTitle}
                    isOpen={showConfirmationModal}
                    message={confirmationMessage}
                    onConfirm={handleModalConfirm}
                    {...showConfirmationModalCancel && {onCancel: handleConfirmationModalOnCancel}}
                />
            )}

            {showUserCertificationModal && (
                <UserCertificationModal
                    userId={user.userId}
                    certifications={user.student.certifications}
                    isOpen={showUserCertificationModal}
                    onCancel={() => setShowUserCertificationModal(false)}
                    onSubmit={(certifications) => { 
                        setUser((prevUser) => {
                            if (prevUser) {
                                return {
                                    ...prevUser,
                                    student: {
                                        ...prevUser.student,
                                        certifications: certifications
                                    }
                                }
                            }
                            return prevUser;
                        });
                        console.log('certifications', certifications);
                    }}
                    onError={(message) => {
                        setShowUserCertificationModal(false);
                        setErrorMessage(message);
                        setShowErrorMessage(true);
                    } }
                />
            )}

            {showUserDeleteModal && (
                <UserDeleteModal
                    user={user}
                    isOpen={showUserDeleteModal}
                    onCancel={() => setShowUserDeleteModal(false)}
                    onConfirm={() => {
                        setShowUserDeleteModal(false);
                        deleteAccount();
                    }}
                />
            )}

        </div>
    );
}

export default UserDashboard;
