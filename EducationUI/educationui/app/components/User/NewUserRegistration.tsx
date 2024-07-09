'use client';
import { CheckUserExistsByEmail, GetUserByEmail, PostUser, UpdateUser } from "@/Utilities/api";
import NewUserForm from "./NewUserForm";
import { Contact, Student, User } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

/*
* This page registers new users. Effectively it marries the Clerk user to the education
* database. It handles 2 scenarios:
* 1. The user has been signed up by another user, and needs to confirm their information.
* 2. The user had not signed up yet, and needs to fill out their information.
*/
const NewUserRegistration: React.FC = () => {
    const { user: clerkUser } = useUser();
    const [ user, setUser ] = useState<User | null>(null);
    const [ showErrorMessage, setShowErrorMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isNewUser, setIsNewUser ] = useState(false);    

    //Effect
    useEffect(() => {
        if (clerkUser?.primaryEmailAddress?.emailAddress) {
            const email = clerkUser.primaryEmailAddress.emailAddress;
            const usr = getUserByEmail(email);
            usr.then((user) => {
                if (user) {
                    setUser({
                        userId: user.userId,
                        clerkId: clerkUser.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        middleName: user.middleName,
                        email: user.email,
                        employer: user.employer,
                        jobTitle: user.jobTitle,
                        isAdmin: user.isAdmin,
                        isStudent: user.isStudent,
                        student: user.student,
                        contact: user.contact
                    });
                    setIsNewUser(false);
                } else {
                    setUser({
                        userId: 0,
                        clerkId: clerkUser.id,
                        firstName: clerkUser.firstName || '',
                        lastName: clerkUser.lastName || '',
                        middleName: '',
                        email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0].emailAddress || '',
                        employer: '',
                        jobTitle: '',
                        isAdmin: false,
                        isStudent: true,
                        student: {} as Student,
                        contact: {} as Contact
                    });
                    setIsNewUser(true);
                }
            });
            
        }
    }, [clerkUser?.primaryEmailAddress?.emailAddress]);

    // handlers
    const handleNewUserFormOnSubmit = (user: User) => {
        if (isNewUser) {
            addNewUser(user);
        } else {
            updateUser(user);
        }
    }

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
        redirect('/');
    }

    const handleNewUserFormError = (error: string): void => {
        setShowErrorMessage(true);
        setErrorMessage(error);
    }

    // Helpers
    const doesUserExist = async (email: string) => {
        const response = await CheckUserExistsByEmail(email);
        if (response.status === 200) {
            return response.data;
        } else {
            setErrorMessage(response);
            setShowErrorMessage(true);
            return false;
        }
    }

    const getUserByEmail = async (email: string): Promise<User | null> => {
        const doesUserExists = await doesUserExist(email);
        if (doesUserExists) {
            const response = await GetUserByEmail(email);
            if (response.status === 200) {
                return response.data;
            } else {
                setErrorMessage(response);
                setShowErrorMessage(true);
            }
        }
        return null;
    }

    const addNewUser = async (user: User) => {
        const response = await PostUser(user);
        if (response.status === 200) {
            window.location.reload();
        } else {
            setErrorMessage(response);
            setShowErrorMessage(true);
        }
    }

    const updateUser = async (user: User) => {
        const response = await UpdateUser(user);
        if (response.status === 200) {
            window.location.reload();
        } else {
            setErrorMessage(response.message);
            setShowErrorMessage(true);
        }
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">New User Registration</h1>
            <div>
                <p className="p-2 text-center">Welcome! please fill out the following to complete registration.</p>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2">
                    {user && (
                        <NewUserForm 
                        onSubmit={handleNewUserFormOnSubmit} 
                        onError={handleNewUserFormError}
                        user={user}
                        />
                    )}
         
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
    )
}

export default NewUserRegistration;