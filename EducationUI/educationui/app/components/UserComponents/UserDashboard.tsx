'use client';
import { useEffect, useState } from 'react';
import { getUserByClerkId } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';
import { User } from '@clerk/nextjs/server';
import UserInfoCard from './UserInfoCard';

interface UserDashboardProps {
    clerkId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({clerkId}) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserByClerkId(clerkId);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [clerkId]);

    const handleApply = (user: User) => {
        console.log(user);
    };

    if (!user) {
        return <Loading />
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>
            <div className='flex justify-center mt-4'>
                <UserInfoCard user={user} onApply={handleApply} />
            </div>
        </div>
    );
}

export default UserDashboard;
