'use client';
import { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import { Student, User } from "@/app/shared/types/sharedTypes";
import { CalculateAccumulatedCredit, DeleteUserById, GetUserByClerkId, GetUserById, UpdateUser } from "@/Utilities/api";
import Loading from "@/app/shared/Loading";
import ActionBar from "@/app/shared/ActionBar";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import UserEnrolledCourses from "./UserEnrolledCourses";
import EditContactModal from "./EditContactModal";
import EditEmployerModal from "./EditEmployerModal";
import ConfirmationModal from "@/app/shared/modals/ConfirmationModal";
import UserDeleteModal from "./UserDeleteModal";
import CertificationModal from "../Certification/CertificationModal";

interface EditUserProps {
    userId: number;
    clerkId: string;
}

const EditUser: React.FC<EditUserProps> = ({ userId, clerkId }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ admin, setAdmin ] = useState<User | null>(null);
    const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(false);
    const [ confirmationMessage, setConfirmationMessage ] = useState<string | null>("");
    const [ confirmationTitle, setConfirmationTitle ] = useState<string | null>("");
    const [ showConfirmationModal, setShowConfirmationModal ] = useState<boolean>(false);
    const [ showUserDeleteModal, setShowUserDeleteModal ] = useState<boolean>(false);   
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ showCertificationModal, setShowCertificationModal ] = useState<boolean>(false); 
    const [ showContactModal, setShowContactModal ] = useState<boolean>(false);
    const [ showEmployerModal, setShowEmployerModal ] = useState<boolean>(false);

    //Effect
    useEffect(() => {
        getUser();
        getAdmin();
        calcAccumulatedCredit();
    }, []);

    // Handlers
    const handleOnDeleteUser = () => {
        setConfirmationTitle("Delete User");
        setConfirmationMessage("Are you sure you want to delete this user? All data on the user will be lost!");
        setShowConfirmationModal(true);
    }

    const handleOnConfirm = () => {
        if (confirmationTitle === "Delete User") {
            setShowUserDeleteModal(true);
        }
        setShowConfirmationModal(false);
    }

    const handleDeleteUser = () => {
        setShowUserDeleteModal(false);
        deleteUser();
    }

    // Helpers
    const getUser = async () => {
        setIsLoadingUser(true);
        const response = await GetUserById(userId);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            setErrorMessage("Error fetching user data, please try again later.");4
            setUser(null);
        }
        setIsLoadingUser(false);
    }

    const getAdmin = async () => {
        const response = await GetUserByClerkId(clerkId);
        if (response.status === 200) {
            setAdmin(response.data);
        } else {
            setErrorMessage("Error fetching admin data, please try again later.");
        }
    }

    const calcAccumulatedCredit = async () => {
        if (!user) return;
        const response = await CalculateAccumulatedCredit(userId);
        if (response.status === 200) {
            setUser((prevUser) => {
                if (prevUser) {
                    return {
                        ...prevUser,
                        student: {
                            ...prevUser.student,
                            accumulatedCredit: response.data
                        }
                    }
                }
                return prevUser;
            });
        } else {
            setErrorMessage("Error calculating accumulated credit, please try again later.");
        }
    }

    const updateUser = async (user: User) => {
        setIsLoadingUser(true);
        //console.log(user)
        const response = await UpdateUser(user as User);
        console.log(response)
        if (response.status === 200) {
            setUser(response.data);
        } else {
            setErrorMessage("Error updating user data, please try again later.");
        }
        setIsLoadingUser(false);
    }

    const deleteUser = async () => {
        setIsLoadingUser(true);
        const response = await DeleteUserById(userId);
        if (response.status === 204){
            window.location.href = "/admin/users";
        } else {
            setIsLoadingUser(false);
            setErrorMessage(response.data);
            setIsLoadingUser(false);
        }
    }

    //Render
    const renderNavList = () => {
        return (
            <>
               <li>
                    <details>
                        <summary>User</summary>
                        <ul className="p-2 bg-base-300 z-10">
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => setShowContactModal(true)}
                                >
                                    Update Information
                                </button>
                            </li>
                            <li>
                                <button
                                    className='text-nowrap'
                                    onClick={() => setShowEmployerModal(true)}
                                >
                                    Update Employor
                                </button>
                            </li>
                            <li>
                                <button
                                    className="text-nowrap"
                                    onClick={() => setShowCertificationModal(true)}
                                >
                                    Certification
                                </button>
                            </li>
                            <li>
                                <button
                                    className='text-nowrap text-error'
                                    onClick={handleOnDeleteUser}
                                >
                                    Delete User
                                </button>
                            </li>
                            
                        </ul>
                    </details>
                </li>
                <li>
                    <button 
                        className='text-nowrap'
                        onClick={() => {calcAccumulatedCredit()}}
                    >
                        Calculate Accumulated Credit
                    </button>
                </li>
                <li>
                    <a href="/admin/users" className="text-error">Back To Users</a>
                </li>
            </>
        )
    }


    if(isLoadingUser) {
        return(
            <Loading />
        );
    }

    if (!isLoadingUser && !user && errorMessage) {
        return(
            <div>
                <h1 className="text-3xl text-center text-error font-bold mb-2">User Not Found</h1>
                <p className="text-center">{errorMessage}</p>
            </div>
        );
    }

    if (!isLoadingUser && user) {
        return(
            <div>
                <h1 className="text-3xl text-center font-bold m-2">Edit User</h1>
                <div>
                    <div className="bg-base-100 rounded-xl p-5">
                        <div className="bg-base-300 rounded-xl p-4">
                            <UserInfoCard user={user} />
                        </div>
                        <ActionBar
                            navList={renderNavList()}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <UserEnrolledCourses user={user} />
                </div>

                {/* Modals */}

                {showContactModal && (
                    <EditContactModal
                        user={user}
                        isOpen={showContactModal}
                        onCancel = {() => setShowContactModal(false)}
                        onSubmit={(user: User) => {
                            updateUser(user)
                            setShowContactModal(false)
                        }}
                    />
                )}

                {showEmployerModal && (
                    <EditEmployerModal
                        user={user}
                        isOpen={showEmployerModal}
                        onCancel = {() => setShowEmployerModal(false)}
                        onSubmit={(user: User) => {
                            updateUser(user)
                            setShowEmployerModal(false)
                        }}
                    />
                )}

                {showCertificationModal && (
                    <CertificationModal
                        adminId={admin? admin.userId : 0}
                        user={user}
                        isOpen={showCertificationModal}
                        onSubmit={(student: Student) => {
                            setUser((prevUser) => {
                                if (prevUser) {
                                    return {
                                        ...prevUser,
                                        student: student
                                    }
                                }
                                return prevUser;
                            })
                        }}
                        onCancel={() => setShowCertificationModal(false)}
                        onError={(message: string) => {
                            setErrorMessage(message)
                            setShowCertificationModal(false)
                        }}
                    />
                )}

                {showConfirmationModal &&(
                    <ConfirmationModal
                        title={confirmationTitle || ""}
                        message={confirmationMessage || ""}
                        isOpen={showConfirmationModal}
                        onConfirm={handleOnConfirm}
                        onCancel={() => setShowConfirmationModal(false)}
                    />
                )}

                {showUserDeleteModal &&(
                    <UserDeleteModal
                        user={user}
                        isOpen={showUserDeleteModal}
                        onConfirm={handleDeleteUser}
                        onCancel={() => {setShowUserDeleteModal(false)}}
                    />
                )}
                
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