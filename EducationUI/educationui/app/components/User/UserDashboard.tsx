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

    const handleOnSignOut = () => {
        window.location.href = '/';
    }

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
    }

    const handleEditContactModelOnSubmit =  async (editUser: User) => {
        console.log(editUser);
        const response = await UpdateUserContact(editUser);

        switch (response.status) {
            case 200:
                setUser(response.data);
                setShowEditContactModal(false);
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
                        <div className='flex flex-col p-2 space-y-3'>
                            <SignOutButton
                                signOutCallback={handleOnSignOut}>
                                <button className="btn btn-error text-white">Sign Out</button>
                            </SignOutButton>
                            <button 
                                className="btn btn-primary text-white"
                                onClick={() => setShowEditContactModal(true)}
                                >Update Contact</button>
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
                    onClose={handleErrorModalClose}
                />
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title="Success"
                    message={confirmationMessage}
                    onConfirm={() => setShowConfirmationModal(false)}
                />
            )}

        </div>
    );
}

export default UserDashboard;
