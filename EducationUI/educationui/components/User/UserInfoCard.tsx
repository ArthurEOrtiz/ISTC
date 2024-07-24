'use client';
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { User } from "@/Utilities/sharedTypes";
import { DeleteUserById } from "@/Utilities/api";
import { useRouter } from 'next/navigation';
import { useState } from "react";


interface UserInfoCardProps {
    user: User;
    viewOnly?: boolean;
    onError?: (message: string) => void;
    onDeleted?: () => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({user, onError, onDeleted, viewOnly = false}) => {
    // constants
    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);
    const formattedPhoneNumber = user.contact?.phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    const router = useRouter();

    // handlers
    const handleDeleteUser = () => {
        setShowConfirmationModal(true);
    }

    // helpers
    const deleteUserAsync = async () => {
        //console.log('Delete user');
        setShowConfirmationModal(false);
        const response = await DeleteUserById(user.userId);
        if (response.status === 204) {
            onDeleted && onDeleted();
        } else {
            onError && onError(`There was an error deleting the user. \n '${response}`);
        }

    }

    // render
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{user.firstName} {user.middleName ?? ""} {user.lastName}</h1>
                <div>
                    <p className="text-base">User Id: {user.userId}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="space-y-2">
                    <div className="flex">
                        <div className="w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Employer :</p>
                                {user.employer ? (
                                    <p className="text-base">{user.employer}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Job Title :</p>
                                {user.jobTitle ? (
                                    <p className="text-base">{user.jobTitle}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Email :</p>
                                {user.email ? (
                                    <p className="text-base">{user.email}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Phone :</p>
                                {user.contact.phone ? (
                                    <p className="text-base">{formattedPhoneNumber}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="space-y-2">
                        <div className="flex space-x-2">
                            <p className="text-1xl font-bold">Address Line 1 :</p>
                            {user.contact.addressLine1 ? (
                                <p className="text-base">{user.contact.addressLine1}</p>
                            ) : (
                                <p className="text-error">None</p>
                            )}
                        </div>

                        <div className="flex space-x-2">
                            <p className="text-1xl font-bold">Address Line 2 :</p>
                            {user.contact.addressLine2 ? (
                                <p className="text-base">{user.contact.addressLine2}</p>
                            ) : (
                                <p className="text-error">None</p>
                            )}
                        </div>

                        <div className="flex">
                            <div className="w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">City :</p>
                                    {user.contact.city ? (
                                        <p className="text-base">{user.contact.city}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex space-x-2">
                                    <p className="text-1xl font-bold">State :</p>
                                    {user.contact.state ? (
                                        <p className="text-base">{user.contact.state}</p>
                                    ) : (
                                        <p className="text-error">None</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <p className="text-1xl font-bold">Zip Code :</p>
                            {user.contact.zip ? (
                                <p className="text-base">{user.contact.zip}</p>
                            ) : (
                                <p className="text-error">None</p>
                            )}
                        </div>

                </div>
                <hr />
                <div>
                    {user.student ? (
                        <div className="space-y-2">
                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Student Id :</p>
                                {user.student.studentId ? (
                                    <p className="text-base">{user.student.studentId}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <p className="text-1xl font-bold">Accumulated Credits :</p>
                                {user.student.accumulatedCredit ? (
                                    <p className="text-base">{user.student.accumulatedCredit}</p>
                                ) : (
                                    <p className="text-error">None</p>
                                )}
                            </div>

                            <div className="flex">
                                <div className="w-full">
                                    <div className="flex space-x-2">
                                        <p className="text-1xl font-bold">Appraisal Certified :</p>
                                        {user.student.appraisalCertified ? (
                                            <p className="text-success">Yes</p>
                                        ) : (
                                            <p className="text-error">No</p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex space-x-2">
                                        <p className="text-1xl font-bold">Mapping Certified :</p>
                                        {user.student.mappingCertified ? (
                                            <p className="text-success">Yes</p>
                                        ) : (
                                            <p className="text-error">No</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        ) : (
                            <p className="text-error">No student information</p>
                        )
                    }
                </div>
            </div>

            {viewOnly && (
                <div className="mt-4 flex justify-start">
                    <button 
                        className="btn btn-sm btn-primary text-white"
                        onClick={() => router.push(`/admin/users/${user.userId}`)}
                    >
                        View User
                    </button>

                    {onDeleted && (
                        <button
                            className="btn btn-sm btn-error text-white ml-2"
                            onClick={handleDeleteUser}
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}

            {showConfirmationModal && (
                <ConfirmationModal
                    title="Delete User"
                    message="Are you sure you want to delete this user?"
                    isOpen={showConfirmationModal}
                    onConfirm={deleteUserAsync}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            )}
            
        </div>
    );
}

export default UserInfoCard;