'use client';
import { useState } from "react";
import NewUserForm from "./NewUserForm";
import { User } from "@/app/shared/types/sharedTypes";
import UserInfoCard from "./UserInfoCard";
import { PostUser } from "@/Utilities/api";

const AddUser: React.FC = () => {
    const [ newUser, setNewUser ] = useState<User | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);    

    const handleNewUserFormOnSubmit = async (newUser: any) => {
        console.log(newUser);
        const response = await PostUser(newUser);
        if (response.status === 200) {
            setNewUser(newUser);
        } else {
            setErrorMessage(response);
        }
    }

    return (
        <div>
            {errorMessage && (
                <div className="bg-red-500 text-white p-2 text-center rounded-xl mb-2">{errorMessage}</div>
            )}
            {newUser ? (
                <UserInfoCard user={newUser}/>
            ) : (
            <NewUserForm
                onSubmit={handleNewUserFormOnSubmit}
                onError={(error) => setErrorMessage(error)}
                user={{} as User}
                />
            )}
            
        </div>
    );
}

export default AddUser;