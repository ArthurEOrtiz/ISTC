'use client';
import { User } from "@/app/shared/types/sharedTypes";

interface UserInfoCardProps {
    user: User;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({user}) => {
    const formattedPhoneNumber = user.contact?.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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
        </div>
    );
}

export default UserInfoCard;