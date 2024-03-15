'use client';
import { postUser } from "@/Utilities/api";
import NewUserForm from "./NewUserForm";
import { User } from "@/app/shared/types/sharedTypes";

interface NewUserRegistrationProps {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
}

const NewUserRegistration: React.FC<NewUserRegistrationProps> = ({clerkId, firstName, lastName, email}) => {
    
    const handleNewUserFormOnSubmit = async (user: User) => {
        try {
            await postUser(user);
            // refresh the page to show the new user
            window.location.reload();
        } catch (error) {
            console.error(error);
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
                    <NewUserForm 
                        clerkId={clerkId} 
                        firstName={firstName || ""} 
                        lastName={lastName || ""} 
                        email={email}
                        onSubmit={handleNewUserFormOnSubmit} 
                    />
                </div>
            </div>
        
        </div>
    )
}

export default NewUserRegistration;