'use client';
import { useState } from "react";
import NewUserForm from "./NewUserForm";
import { Contact, User } from "@/Utilities/sharedTypes";
import UserInfoCard from "./UserInfoCard";
import { PostUser } from "@/Utilities/api";
import ActionBar from "@/components/shared/ActionBar";

const AddUser: React.FC = () => {
    const [ newUser, setNewUser ] = useState<User | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);    

    const handleNewUserFormOnSubmit = async (newUser: any) => {
        
        const response = await PostUser(newUser);
        if (response.status === 200) {
            setNewUser(response.data);
            //console.log(response);
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
                <div className='w-3/5 mx-auto'>
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
                            isAdmin: false,
                            isStudent: true,
                            contact: {
                                state: 'ID'
                            } as Contact,
                        } as User}
                        />
                </div>
            )}
            
        </div>
    );
}

export default AddUser;