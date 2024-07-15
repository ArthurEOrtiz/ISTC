import { User } from "@/app/shared/types/sharedTypes";
import { useState } from "react";

interface UserDeleteModalProps {
    user: User;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({ user, isOpen, onConfirm, onCancel }) => {

    const [ userInput, setUserInput ] = useState<string>('');

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-base-200 p-8 rounded-lg z-50 w-1/2">
                <div className="flex items-baseline justify-between mb-2">
                    <h2 className="text-2xl font-semibold mb-4">Delete User</h2>
                    <button onClick={onCancel} className="text-3xl text-error font-bold">&times;</button>
                </div>
                <div>
                    <p className="text-lg mb-2 text-error">Are you sure you want to delete {user.firstName} {user.lastName}?</p>
                    <p className="mb-4">This action cannot be undone. Please type <span className="font-bold">{user.email}</span> into the field below to confirm.</p>
                </div>
                <div className="flex justify-between mb-5">
                    <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter user email to confirm"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    
                </div>
                <div className="flex justify-between">
                    <button 
                        onClick={onConfirm} 
                        className="btn btn-error text-white"
                        disabled={userInput !== user.email}
                    >
                            Delete
                    </button>
                    <button onClick={onCancel} className="btn btn-primary text-white">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UserDeleteModal;