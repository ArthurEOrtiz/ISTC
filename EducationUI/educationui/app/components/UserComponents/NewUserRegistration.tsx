'use client';
import NewUserForm from "./NewUserForm";

interface NewUserRegistrationProps {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
}

const NewUserRegistration: React.FC<NewUserRegistrationProps> = async({clerkId, firstName, lastName, email}) => {






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
                        onSubmit={() => {}} 
                    />
                </div>
            </div>
        
        </div>
    )
}

export default NewUserRegistration;