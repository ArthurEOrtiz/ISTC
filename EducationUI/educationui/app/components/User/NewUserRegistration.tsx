'use client';
import { PostUser } from "@/Utilities/api";
import NewUserForm from "./NewUserForm";
import { User } from "@/app/shared/types/sharedTypes";
import { useState } from "react";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import { redirect } from "next/navigation";


const NewUserRegistration: React.FC = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleNewUserFormOnSubmit = async (user: User) => {
        console.log(user);
        const response = await PostUser(user);

        if (response.status === 200) {
             window.location.reload();
        } else {
            setErrorMessage(response);
            setShowErrorMessage(true);
        }
    }

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
        redirect('/');
    }


    function handleNewUserFormError(error: string): void {
        setShowErrorMessage(true);
        setErrorMessage(error);
    }

    return (
        <div>
            <h1 className="p-2 text-3xl text-center font-bold">New User Registration</h1>
            <div>
                <p className="p-2 text-center">Welcome! please fill out the following to complete registration.</p>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <NewUserForm 
                        onSubmit={handleNewUserFormOnSubmit} 
                        onError={handleNewUserFormError}
                    />
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