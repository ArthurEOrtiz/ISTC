import { User } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface UserInfoCardProps {
    user: User;
    onApply: (user: User) => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, onApply }) => {
    const [editMode, setEditMode] = useState(false);
    const [editUser, setEditUser] = useState<User>(user);

    return (
        <div className="bg-white shawdow-md rounded-xl p-4 w-1/2">
            <h1 className="text-2xl text-center font-bold">{user.firstName} {user.lastName}</h1>
            <div>
                <p className="text-center">{user.employer} | {user.jobTitle}</p>
                <p className="text-center">{user.email}</p>
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
                            <p className="text-base font-bold mr-2">Appriasal Certified</p>
                            <p>{user.student.appraisalCertified ? "Yes" : "No"}</p>
                        </div>

                        <div className="flex">
                            <p className="text-base font-bold mr-2">Mapping Certified</p>
                            <p>{user.student.mappingCertified ? "Yes" : "No"}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4">
                    {user.contact && (
                        <div>
                            <div className="flex">
                                <p className="text-base font-bold mr-2">Phone:</p>
                                <p>{user.contact.phone}</p>
                            </div>
                            <div className="flex">
                                <p className="text-base font-bold mr-2">Address:</p>
                                <p>{user.contact.addressLine1}</p>
                                <p>{user.contact.addressLine2}</p>
                            </div>

                            <div className="flex justify-start gap-x-8">
                                <div className="flex">
                                    <p className="text-base font-bold mr-2">City:</p>
                                    <p>{user.contact.city}</p>
                                </div>
                              
                                <div className="flex">
                                    <p className="text-base font-bold mr-2">State:</p>
                                    <p>{user.contact.state}</p>
                                </div>
                                
                                <div className="flex">
                                    <p className="text-base font-bold mr-2">Zip:</p>
                                    <p>{user.contact.zip}</p>
                                </div>

                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default UserInfoCard;