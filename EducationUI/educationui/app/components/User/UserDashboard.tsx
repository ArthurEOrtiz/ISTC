'use client';
import { useEffect, useState } from 'react';
import { DeleteUserById, GetUserByClerkId, UpdateUser, UpdateUserContact } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import UserInfoCard from './UserInfoCard';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import { clerkClient } from "@clerk/nextjs";
import { SignOutButton, useClerk } from '@clerk/clerk-react';
import EditContactModal from './EditContactModal';
import ConfirmationModal from '@/app/shared/modals/ConfirmationModal';
import EditEmployerModal from './EditEmployerModal';
import { useRouter } from 'next/navigation';


interface UserDashboardProps {
    clerkId: string;    
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    
    const [ user, setUser ] = useState<User>();

    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ showEditContactModal, setShowEditContactModal ] = useState(false);

    const [ showEditEmployerModal, setShowEditEmployerModal ] = useState(false);

    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    const [ showConfirmationModalCancel, setShowConfirmationModalCancel ] = useState(false);
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState('');
    const [ confirmationMessage, setConfirmationMessage ] = useState('');

    const {signOut} = useClerk();
    const router = useRouter();
   

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
    }, [user]);


    // Handlers
    const handleOnSignOut = () => {
        window.location.href = '/';
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
                // Handle other status codes if needed
                break;
        }
    }

    const handleEditEmployerModalOnSubmit = async (editUser: User) => {
        console.log(editUser);
        const response = await UpdateUser(editUser);

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

    const handleModalConfirm = async() => {
        setShowConfirmationModal(false);
        if (confirmationModalTitle === 'Delete Account') {
            if (!user?.userId) {
                return;
            }
            // Delete account
           try{
            const response = await clerkClient.users.deleteUser(clerkId)
            console.log(response);
           } catch (error) {
            setErrorMessage(`Error deleting account. Please contact support.\n ${error}`);
            setShowErrorMessage(true);
           } 
            // const response = await DeleteUserById(user.userId)

            // switch (response.status) {
            //     case 200:
            //         await signOut(() => router.push('/'));
            //         break;
            //     case 404:
            //         setErrorMessage('User not found.');
            //         setShowErrorMessage(true);
            //         break;
            //     case 500:
            //         setErrorMessage('Internal server error.');
            //         setShowErrorMessage(true);
            //         break;
            //     default:
            //         // Handle other status codes if needed
            //         break;
            //     }
            
        }
    }

    const handleOnDeleteAccount = () => {
        setConfirmationModalTitle('Delete Account');
        setConfirmationMessage('Are you sure you want to delete your account?');
        setShowConfirmationModalCancel(true);
        setShowConfirmationModal(true);
    }

    if (!user) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>

            <div className='flex flex-row mt-4'>
                <div className='basis-1/4' ></div>
                <div className='basis-1/2'>
                    <UserInfoCard user={user}/>
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
