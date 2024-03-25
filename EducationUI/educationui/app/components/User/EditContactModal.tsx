import { User } from "@/app/shared/types/sharedTypes";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

interface EditContactModalProps {
    user: User;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (user: User) => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({user, isOpen, onCancel, onSubmit}) => { 
    const [ editUser, setEditUser ] = useState<User>(user);

    const handleCancelOnClick = () => {
        setEditUser(user);
        onCancel();
    }

    const handleSubmitOnClick = (FormEvent: React.FormEvent) => {
        // This only fires if the basic HTML validation passes
        FormEvent.preventDefault();
        onSubmit(editUser);
    }

    if (!isOpen) {
        return null;
    } 

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-box">

                <div className='modal-top'>
                    <h3 className="font-bold text-lg">Update Contact Information</h3>
                </div>
                <form onSubmit={(formEvent) => {
                    handleSubmitOnClick(formEvent);
                }}>
                    <div className='modal-middle mt-4 space-y-3'>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>First Name</p>
                            <input 
                                type='text' 
                                placeholder='First Name' 
                                minLength={3}
                                maxLength={50}
                                required
                                value={editUser.firstName} 
                                onChange={(e) => setEditUser({...editUser, firstName: e.target.value})}
                                />
                        </label>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Middle Name</p>
                            <input 
                                type='text' 
                                placeholder='Middle Name / Optional' 
                                maxLength={50}
                                value={editUser.middleName || ''} 
                                onChange={(e) => setEditUser({...editUser, middleName: e.target.value})}
                                />
                        </label>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Last Name</p>
                            <input 
                                type='text' 
                                placeholder='Last Name' 
                                maxLength={50}
                                required
                                value={editUser.lastName} 
                                onChange={(e) => setEditUser({...editUser, lastName: e.target.value})}
                                />
                        </label>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Email</p>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                maxLength={50}
                                required
                                value={editUser.email} 
                                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                                />
                        </label>

                        <PhoneInput
                            country={'us'}
                            regions={'north-america'}
                            disableCountryGuess={true}
                            disableCountryCode={true}
                            placeholder='Phone Number'
                            value={editUser.contact.phone || ''}
                            onChange={(phone) => setEditUser({...editUser, contact: {...editUser.contact, phone: phone}})}
                            buttonStyle={{display: 'none'}}
                            inputProps={{
                                required: true,
                                maxLength: 14,
                                className: 'input input-bordered flex items-center gap-2 text-base w-full',
                            }}
                        />

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Address Line 1</p>
                            <input 
                                type='text' 
                                placeholder='Address Line 1' 
                                maxLength={50}
                                required
                                value={editUser.contact.addressLine1 || ''} 
                                onChange={(e) => setEditUser({...editUser, contact: {...editUser.contact, addressLine1: e.target.value}})}
                                />
                        </label>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Address Line 2</p>
                            <input 
                                type='text' 
                                placeholder='Address Line 2 / Optional' 
                                maxLength={50}
                                value={editUser.contact.addressLine2 || ''} 
                                onChange={(e) => setEditUser({...editUser, contact: {...editUser.contact, addressLine2: e.target.value}})}
                                />
                        </label>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>City</p>
                            <input 
                                type='text' 
                                placeholder='City'
                                maxLength={50}
                                required 
                                value={editUser.contact.city || ''} 
                                onChange={(e) => setEditUser({...editUser, contact: {...editUser.contact, city: e.target.value}})}
                                />
                        </label>

                        <select 
                            className='select select-bordered w-full'
                            value={editUser.contact.state || ""}
                            onChange={(e) => setEditUser({...editUser, contact: {...editUser.contact, state: e.target.value}})}
                            >
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                        </select>

                        <label className='input input-bordered flex items-center gap-2'>
                            <p className='text-primary'>Zip</p>
                            <input 
                                type='text' 
                                placeholder='Zip' 
                                minLength={5}
                                maxLength={10}
                                required
                                value={editUser.contact.zip || ''} 
                                onChange={(e) => setEditUser({...editUser, contact: {...editUser.contact, zip: e.target.value}})}
                                />
                        </label>
                    </div>

                    <div className="modal-action">
                        <button 
                            className="btn btn-ghost dark:text-white"
                            onClick={handleCancelOnClick}
                            >
                                Cancel
                        </button>
                        <button 
                            className="btn btn-primary text-white"
                            type='submit'
                            >
                                Submit
                        </button>
                    </div>
                   
                </form> 
            </div>
        </div>
    );
}

export default EditContactModal;
