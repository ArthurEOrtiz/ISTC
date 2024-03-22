'use client';
import { useEffect, useState } from 'react';
import { GetUserByClerkId } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import UserInfoCard from './UserInfoCard';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import { SignOutButton } from '@clerk/clerk-react';


interface UserDashboardProps {
    clerkId: string;    
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    
    const [ user, setUser ] = useState<User>();
    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

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
    }, [clerkId]);

    const handleOnSignOut = () => {
        window.location.href = '/';
    }

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
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
                            <button className="btn btn-primary text-white">Edit Profile</button>
                        </div>
                        
                    </div>
                </div>
            </div>
                
            
            {showErrorMessage && (
                <ErrorModal
                    title="Error"
                    message={errorMessage}
                    onClose={handleErrorModalClose}
                />
            )}
        </div>
    );
}

export default UserDashboard;
