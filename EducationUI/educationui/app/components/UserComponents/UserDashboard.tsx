'use client';
import { useEffect, useState } from 'react';
import { getUserByClerkId } from "@/Utilities/api";
import { User } from '@/app/shared/types/sharedTypes';
import Loading from '@/app/shared/Loading';

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

    if (!user) {
        return <Loading />
    }
    

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">User Dashboard</h1>
            <div>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Middle Name: {user.middleName}</p>
                <p>Email: {user.email}</p>
                <p>Employer: {user.employer}</p>
                <p>Job Title: {user.jobTitle}</p>
                <p>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
                <p>Is Student: {user.isStudent ? 'Yes' : 'No'}</p>
                {user.student && (
                    <div>
                        <p>Student ID: {user.student.studentId}</p>
                        <p>Accumulated Credit: {user.student.accumulatedCredit}</p>
                        <p>Appraisal Certified: {user.student.appraisalCertified ? 'Yes' : 'No'}</p>
                        <p>Mapping Certified: {user.student.mappingCertified ? 'Yes' : 'No'}</p>
                    </div>
                )}
                <p>Phone: {user.contact.phone}</p>
                <p>Address Line 1: {user.contact.addressLine1}</p>
                <p>Address Line 2: {user.contact.addressLine2}</p>
                <p>City: {user.contact.city}</p>
                <p>State: {user.contact.state}</p>
                <p>Zip: {user.contact.zip}</p>
            </div>
        </div>
    );
}

export default UserDashboard;
