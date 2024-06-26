'use client';
import { useState } from "react";
import NewUserForm from "./NewUserForm";
import { Contact, User } from "@/app/shared/types/sharedTypes";
import UserInfoCard from "./UserInfoCard";
import { PostUser } from "@/Utilities/api";
import ActionBar from "@/app/shared/ActionBar";

const AddUser: React.FC = () => {
    const [ newUser, setNewUser ] = useState<User | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);    

    const handleNewUserFormOnSubmit = async (newUser: any) => {
        
        const response = await PostUser(newUser);
        if (response.status === 200) {
            setNewUser(response.data);
            console.log(response);
        } else {
            setErrorMessage(response);
        }
    }

    const renderNavList = () => {
        return (
            <>
                <li>
                    <a href="/" className="">Home</a>
                </li>
                <li>
                    <a href="/admin/users" className="">Back To Users</a>
                </li>
            </>
        )
    }

    return (
        <div>
            {errorMessage && (
                <div className="bg-red-500 text-white p-2 text-center rounded-xl mb-2">{errorMessage}</div>
            )}
            {newUser ? (
                <div>
                    {!errorMessage && (
                        <p className="bg-green-500 text-white p-2 text-center rounded-xl mb-2">User Created Successfully!</p>
                    )}
                
                    <div className='bg-base-100 rounded-xl p-5'>
                        <div className='bg-base-300 rounded-xl'>
                            <UserInfoCard user={newUser}/>

                        </div>
                        <ActionBar
                            navList={renderNavList()}
                        />
                        
                    </div>
                </div>
            ) : (
            <NewUserForm
                onSubmit={handleNewUserFormOnSubmit}
                onError={(error) => setErrorMessage(error)}
                user={{
                    userId: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    employer: '',
                    jobTitle: '',
                    contact: {
                        state: 'ID'
                    } as Contact,
                } as User}
                />
            )}
            
        </div>
    );
}

export default AddUser;