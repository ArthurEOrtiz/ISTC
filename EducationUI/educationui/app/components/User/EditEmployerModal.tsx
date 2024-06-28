import { User } from "@/app/shared/types/sharedTypes";
import { useEffect, useState } from "react";

interface EditEmployerModalProps {
    user: User;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (user: User) => void;
}

const EditEmployerModal: React.FC<EditEmployerModalProps> = ({ user, isOpen, onCancel, onSubmit }) => {
    const [ editedUser, setEditedUser ] = useState<User>(user);
    const [ otherEmployer, setOtherEmployer ] = useState<string | null>('');
    const countyArray = [
        "Ada",
        "Adams",
        "Bannock",
        "Bear Lake",
        "Benewah",
        "Bingham",
        "Blaine",
        "Boise",
        "Bonner",
        "Bonneville",
        "Boundary",
        "Butte",
        "Camas",
        "Canyon",
        "Caribou",
        "Cassia",
        "Clark",
        "Clearwater",
        "Custer",
        "Elmore",
        "Franklin",
        "Fremont",
        "Gem",
        "Gooding",
        "Idaho",
        "Jefferson",
        "Jerome",
        "Kootenai",
        "Latah",
        "Lemhi",
        "Lewis",
        "Lincoln",
        "Madison",
        "Minidoka",
        "Nez Perce",
        "Oneida",
        "Owyhee",
        "Payette",
        "Power",
        "Shoshone",
        "Teton",
        "Twin Falls",
        "Valley",
        "Washington"
    ]

    useEffect(() => {
        if (!countyArray.includes(user.employer) && user.employer !== 'Tax Commision' ) {
            setEditedUser({...user, employer: 'other'});
            setOtherEmployer(user.employer);
        }
    }, [])


    const handleSelectEmployer = () => {
        if (!countyArray.includes(editedUser.employer) && editedUser.employer !=='Tax Commision' ) {
            return "other"
        }
        return editedUser.employer;
    }

    const handleCancelOnClick = () => {
        setEditedUser(user);
        onCancel();
    }

    const handleSubmitOnClick = (e: React.FormEvent) => {
        e.preventDefault();
    
        const updatedUser = {
            ...editedUser,
            ...(otherEmployer !== null && { employer: otherEmployer })
        };
    
        onSubmit(updatedUser);
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-box">

                <div className='modal-top'>
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-lg font-bold">Edit Employer</h2>
                        <button
                            className='text-2xl text-error font-bold'
                            onClick={handleCancelOnClick}>
                            &times;
                        </button>
                    </div>
                </div>

                <form onSubmit={(e)=> handleSubmitOnClick(e)}>
                    <div className='modal-middle mt-4 space-y-3'>
                        <select
                            className='select select-bordered w-full'
                            defaultValue={handleSelectEmployer()}
                            onChange={(e) => {
                                if (e.target.value !== 'other') {
                                    setOtherEmployer(null);
                                } else {
                                    setOtherEmployer(user.employer);
                                }

                                setEditedUser({...editedUser, employer: e.target.value})
                            }}>
                            <option value='select'>Select Employer</option>
                            <option value='other'>Other</option>    
                            <option value='Tax Commision'>Tax Commision</option>
                            {countyArray.map((county, index) => (
                                <option key={index} value={county}>{county}</option>
                            ))}
                        </select>

                        {editedUser.employer === "other" && (
                            <label className='input input-bordered flex items-center gap-2'>
                                <p className='text-primary'> Other Employer</p>
                                <input 
                                    type='text'
                                    defaultValue={otherEmployer ? otherEmployer : ''}
                                    onChange={(e) => setOtherEmployer(e.target.value)}
                                />
                            </label>
                        )}

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'> Job Title </p>
                            <input 
                                type='text'
                                value={editedUser.jobTitle}
                                onChange={(e) => setEditedUser({...editedUser, jobTitle: e.target.value})}
                            />
                        </label>
                    </div>
                    <div className='modal-action'>
                        <button
                            className='btn btn-ghost dark:text-white'
                            onClick={handleCancelOnClick}>
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className='btn btn-primary text-white'>
                            Submit
                        </button>
                    </div>
                
                </form>
            </div>
        </div>
    );

}

export default EditEmployerModal;

