'use client';
import { User } from "@/app/shared/types/sharedTypes";
import { useRouter } from 'next/navigation';


interface UserInfoCardProps {
    user: User;
    viewOnly?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({user, viewOnly = false}) => {
    // constants
    const formattedPhoneNumber = user.contact?.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    const router = useRouter();

    // handlers
    const handleDeleteUser = () => {
        console.log('Delete user');
    }

    // render
    return (
        <div className="bg-base-100 shawdow-md rounded-xl p-4 w-full">
            <h1 className="text-2xl text-center font-bold">{user.firstName} {user.lastName}</h1>
            <div>
                <p className="text-center">{user.employer} | {user.jobTitle}</p>
                <p className="text-center">{user.email} | {formattedPhoneNumber}</p>
                <p className="text-center">{user.contact.addressLine1}</p>
                <p className="text-center"> {user.contact.addressLine2}</p> 
                <p className="text-center"> {user.contact.city}, {user.contact.state}, {user.contact.zip}</p>
            </div>

            <div className="mt-4">
                {user.student  && (
                    <div>
                        <div className="flex">
                            <p className="text-base font-bold mr-2">Student Id:</p>
                            <p>{user.student.studentId}</p>
                        </div>

                        <div className="flex">
                            <p className="text-base font-bold mr-2">Accumulated Credits:</p>
                            <p>{user.student.accumulatedCredit}</p>
                        </div>

                        <div className="flex">
                            <p className="text-base font-bold mr-2">Appriasal Certified:</p>
                            <p>{user.student.appraisalCertified ? "Yes" : "No"}</p>
                        </div>

                        <div className="flex">
                            <p className="text-base font-bold mr-2">Mapping Certified:</p>
                            <p>{user.student.mappingCertified ? "Yes" : "No"}</p>
                        </div>
                    </div>
                )}
            </div>

            {viewOnly && (
                <div className="mt-4 flex justify-end">
                    <button 
                        className="btn btn-primary text-white"
                        onClick={() => router.push(`/admin/users/${user.userId}`)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-error text-white ml-2"
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </button>
                </div>
            )}
            
        </div>
    );
}

export default UserInfoCard;