'use client';
import Loading from "@/app/shared/Loading";
import { User } from "@/app/shared/types/sharedTypes";
import { getAllUsers, SearchUsers } from "@/Utilities/api";
import { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import { useRouter } from "next/navigation";

const UserCatalog: React.FC = () => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [ errorMessages, setErrorMessages ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ searchString, setSearchString ] = useState<string>('');
    const router = useRouter();
   

   //Effect
   useEffect(() => {
        
        if (searchString.length > 0) {
            searchUsers(searchString);
        } else {
            fetchUsers();
        }
    }
    , [searchString]);
    

    // helpers
    const fetchUsers = async () => {
        setLoading(true);
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data);
            console.log(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
        setLoading(false);
    }

    const searchUsers = async (searchString: string) => {
        setLoading(true);
        const response = await SearchUsers(searchString);
        if (response.status === 200) {
            setUsers(response.data);
            console.log(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
        setLoading(false);
    }

    // render
    return (
        <div className="p-4">

            <div>
                <h1 className="text-3xl text-center font-bold">Users</h1>
            </div>

            <div className="flex justify-between">

                <div className="w-1/2 mb-2">
                    <button 
                        className="btn btn-success text-white"
                        onClick={() => router.push('/admin/users/add')}
                    >
                        Add User
                    </button>
                </div>

                <div className="w-1/3 mb-2">
                
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder="Search users..." 
                        className="input input-bordered w-full pr-12 sm:text-sm rounded-md"
                        onChange={(e) => {setSearchString(e.target.value)}}
                    />

                </div>

            </div>
            
            <div className="space-y-2">
                {users.map((user) =>
                    <div key={user.userId}>
                        <UserInfoCard user={user} viewOnly={true}/>
                    </div>
                )}


                
            </div>
            {loading && <Loading/>}

            {errorMessages && <ErrorModal title="Error" message={errorMessages} onClose={() => setErrorMessages(null)}/>}
        </div>
    );
}

export default UserCatalog;