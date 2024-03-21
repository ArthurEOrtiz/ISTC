'use client';
import { useEffect, useState } from 'react';
import { getUserByClerkId } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import UserInfoCard from './UserInfoCard';
import ErrorModal from '@/app/shared/modals/ErrorModal';
import AdminDashboardLink from '../Navigation/AdminDashboardLink';

interface UserDashboardProps {
    clerkId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    const [user, setUser] = useState<User>();
    const [ showErrorMessage, setShowErrorMessage ] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserByClerkId(clerkId);
            if (response.status === 200) {
                setUser(response.data);
            } else {
                setShowErrorMessage(true);
            }
        };

        fetchUser();
    }, [clerkId]);

    const handleApply = (user: User) => {
        console.log(user);
    };

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
    }

    if (!user) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>
            <div className='flex justify-center mt-4'>
                <UserInfoCard user={user} onApply={handleApply} />
            </div>
            {showErrorMessage && (
                <ErrorModal
                    title="Error"
                    message="There was an error fetching user information."
                    onClose={handleErrorModalClose}
                />
            )}
        </div>
    );
}

export default UserDashboard;
