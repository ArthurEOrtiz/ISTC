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
    , []);
    

    // helpers
    const fetchUsers = async () => {
        setLoading(true);
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data);
        } else {
            setErrorMessages(response as unknown as string);
        }
        setLoading(false);
    }

    const searchUsers = async (searchString: string) => {
        setLoading(true);
        let response;

        if (searchString.length === 0) {
            response = await getAllUsers();
        } else {
            response = await SearchUsers(searchString);
        }

        if (response.status === 200) {
            setUsers(response.data);
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

            <div className="flex justify-between mb-2">

                <div>
                    <button 
                        className="btn btn-success text-white"
                        onClick={() => router.push('/admin/users/add')}
                    >
                        Add User
                    </button>
                </div>

                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            name="search" 
                            id="search" 
                            placeholder="Search users..." 
                            className="grow"
                            onChange={(e) => {setSearchString(e.target.value)}}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => searchUsers(searchString)}
                        >
                            Search
                        </button>
                    </label>

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