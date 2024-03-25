'use client';
import { useEffect, useState } from 'react';
import { GetUserByClerkId, UpdateUserContact } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import UserInfoCard from './UserInfoCard';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import { SignOutButton } from '@clerk/clerk-react';
import EditContactModal from './EditContactModal';
import ConfirmationModal from '@/app/shared/modals/ConfirmationModal';


interface UserDashboardProps {
    clerkId: string;    
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    
    const [ user, setUser ] = useState<User>();

    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ showEditContactModal, setShowEditContactModal ] = useState(false);

    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    const [ showConfirmationModalCancel, setShowConfirmationModalCancel ] = useState(false);
    const [ confirmationModalTitle, setConfirmationModalTitle ] = useState('');
    const [ confirmationMessage, setConfirmationMessage ] = useState('');
   

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
                                                    >
                                                        Update Employer Information
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-primary text-white w-full"
                                                    >
                                                        Change Password
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
                        onConfirm={() => setShowConfirmationModalCancel(false)}
                        onCancel={() => setShowConfirmationModalCancel(false)}
                    />
                ))
            }


        </div>
    );
}

export default UserDashboard;
