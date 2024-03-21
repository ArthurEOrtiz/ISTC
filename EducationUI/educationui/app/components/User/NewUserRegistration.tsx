'use client';
import { postUser } from "@/Utilities/api";
import NewUserForm from "./NewUserForm";
import { User } from "@/app/shared/types/sharedTypes";
import { useState } from "react";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import { redirect } from "next/navigation";

interface NewUserRegistrationProps {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
}

const NewUserRegistration: React.FC<NewUserRegistrationProps> = ({clerkId, firstName, lastName, email}) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    const handleNewUserFormOnSubmit = async (user: User) => {
        const response = await postUser(user);

        if (response.status === 200) {
             // refresh the page to show the new user
             window.location.reload();
        } else {
            setShowErrorMessage(true);
        }
    }

    const handleErrorModalClose = () => {
        setShowErrorMessage(false);
        redirect('/');
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
                        clerkId={clerkId} 
                        firstName={firstName || ""} 
                        lastName={lastName || ""} 
                        email={email}
                        onSubmit={handleNewUserFormOnSubmit} 
                    />
                </div>
            </div>
            {showErrorMessage && (
                <ErrorModal
                    title="Error"
                    message="There was an error creating the user."
                    onClose={handleErrorModalClose}
                />
            )}
        
        </div>
    )
}

export default NewUserRegistration;