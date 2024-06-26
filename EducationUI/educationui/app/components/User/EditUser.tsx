'use client';
import { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import { User } from "@/app/shared/types/sharedTypes";
import { GetUserById } from "@/Utilities/api";
import Loading from "@/app/shared/Loading";
import ActionBar from "@/app/shared/ActionBar";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import UserEnrolledCourses from "./UserEnrolledCourses";

interface EditUserProps {
    userId: number;
}

const EditUser: React.FC<EditUserProps> = ({ userId }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    //Effect
    useEffect(() => {
        getUser();
    }, []);

    // Helpers
    const getUser = async () => {
        setIsLoadingUser(true);
        const response = await GetUserById(userId);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            setErrorMessage("Error fetching user data, please try again later.");
        }
        setIsLoadingUser(false);
    }

    //Render
    const renderNavList = () => {
        return (
            <>
                <li>
                    <a href="/admin/users" className="">Back To Users</a>
                </li>
                <li>
                    <button 
                        className='text-nowrap'
                        onClick={() => {}}
                    >
                        Calculate Accumulated Credit
                    </button>
                </li>
                <li>
                    <details>
                        <summary>Certify</summary>
                        <ul className="p-2 bg-base-300 z-10">
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => {}}
                                >
                                    {user?.student.appraisalCertified ? 'Revoke Appraiser Certification' : 'Certify As Appraiser'}
                                </button>
                            </li>
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => {}}
                                >
                                    {user?.student.mappingCertified ? 'Revoke Mapper Certification' : 'Certify As Mapper'}
                                </button>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary>User</summary>
                        <ul className="p-2 bg-base-300 z-10">
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => {}}
                                >
                                    Edit User Information
                                </button>
                            </li>
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => {}}
                                >
                                    Edit Contact Information
                                </button>
                            </li>
                            <li>
                                <button
                                    className='text-nowrap text-error'
                                    onClick={() => {}}
                                >
                                    Delete User
                                </button>
                            </li>
                            
                        </ul>
                    </details>
                </li>
            </>
        )
    }


    if(isLoadingUser) {
        return(
            <Loading />
        );
    }

    if (!isLoadingUser && user) {
        return(
            <div>

                <div>
                    <h1 className="text-3xl text-center font-bold mb-2">Edit User</h1>
                    <div className="bg-base-100 rounded-xl p-5">
                        <div className="bg-base-300 rounded-xl p-4">
                            <UserInfoCard user={user} />
                        </div>
                        <ActionBar
                            navList={renderNavList()}
                        />
                    </div>
                </div>

                <div>
                    <UserEnrolledCourses user={user} />
                </div>



                {/* Modals */}

                {errorMessage && 
                    <ErrorModal
                        title="Error"
                        message={errorMessage}
                        onClose={() => setErrorMessage(null)}
                    />
                }
            </div>
        );
    }
}

export default EditUser;