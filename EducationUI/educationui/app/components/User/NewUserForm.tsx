'use client';
import { User } from "@/app/shared/types/sharedTypes";
import { CheckUserExistsByEmail } from "@/Utilities/api";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

interface NewUserFormProps {
    onSubmit: (user: User) => void;
    onError : (error: string) => void;
    user: User | null;
}

const NewUserForm: React.FC<NewUserFormProps> = ({onSubmit, onError, user : incomingUser}) => {
    // Constants
    const [ user, setUser ] = useState<User | undefined>(undefined);
    const [ isEmailValid, setIsEmailValid ] = useState<boolean>(true);
    const [ doesUserExist, setDoesUserExist ] = useState<boolean>(false);
    const [ otherEmployer, setOtherEmployer ] = useState<string | null>(null);
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

    //Effects
    useEffect(() => {
        if (incomingUser) {
            const employer = incomingUser.employer === "" ? "select" : incomingUser.employer;

            if (employer !== "Tax Commision" && !countyArray.includes(employer) && employer !== "select") {
                incomingUser.employer = "other";
                setOtherEmployer(employer);
            } 

            setUser(incomingUser);
        }
    }, []);


    // Handlers
    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //console.log("Submitting");

        if (!user) {
            return;
        }

        if (!isEmailValid || isEmailValid === null) {
            onError("Please enter a valid email address!");
            return;
        } 

        // If the user employer is an empty strng, set it to the otherEmployer value if it is not null
        user.employer = user.employer === "" ? otherEmployer ?? "" : user.employer;
        // If the user employer is "select", set it to an empty string
        user.employer = user.employer === "select" ? "" : user.employer;
        // If the user employer is still an empty string, throw an error
            
            
        if (user.employer === ""){
            onError("Employer is required!");   
        } else {
            // onSubmit(user);
            console.log(user);
        }
    }

    const handleZipInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }

        if (isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }

    const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>): Promise<void> => {
        const input = event.target.value;

        if (!input) {
            setIsEmailValid(true);
            setDoesUserExist(false);
            onError("");
            return;
        }

        if (input !== '' && validatEamil(input)) {
            const doesEmailExist = await checkUserExistsByEmail(input);
            setDoesUserExist(doesEmailExist as boolean);
            setIsEmailValid(!doesEmailExist);
            return;
        }

        if (input !== '' && !validatEamil(input)) {
            setIsEmailValid(false);
            setDoesUserExist(false);
            onError("Please enter a valid email address!");
            return;
        }
    }

    // Helper Methods
    const validatEamil = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const checkUserExistsByEmail = async (email: string) => {
        const response = await CheckUserExistsByEmail(email);
        if (response.data === true) {
            onError("The E-mail provided is already in use!");
            return true;
        } else if (response.data === false) {
            return false;
        } else if (response.status !== 200) {
            onError("Error checking email!");
            return false;
        }
    }

    const isFormValid = () => {
        if (user?.firstName && user?.lastName && user?.employer && user?.jobTitle) {
            return true;
        }
        return false;
    }

    

    if (user) {
        return (
            <form onSubmit={handleOnSubmit} className="bg-base-200 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="John"
                        required
                        maxLength={50}
                        minLength={2}
                        value={user?.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value})}
                    />
                    <p className='text-error text-xs italic'>
                        Required
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="middleName">
                        Middle Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="middleName"
                        type="text"
                        placeholder="Edward"
                        value={user?.middleName ?? ''}
                        onChange={(e) => setUser({ ...user, middleName: e.target.value})}
                    />
                    <p className='text-green-600 text-xs italic'>
                        Optional
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        maxLength={50}
                        minLength={2}
                        value={user?.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value})}
                    />
                    <p className='text-error text-xs italic'>
                        Required
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        E-mail
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="JohnEdwardDoe@Tax.Idaho.gov"
                        required
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value})}
                        onBlur={handleEmailBlur}
                    />
                    {isEmailValid === false && (<p className="text-error text-xs italic">Please enter a valid email address</p>)}
                    {doesUserExist && (<p className="text-error text-xs italic">The E-mail provided is already in use!</p>)}
                    <p className='text-error text-xs italic'>
                        Required
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="employer">
                        Employer
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        id="employer"
                        value={user?.employer}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
    
                            if (value !== "select" && value !== "other" && !countyArray.includes(value) && value !== "Tax Commision") {
                                setUser({ ...user, employer: "other" });
                                setOtherEmployer(value);
                                return;
                            } 
                        
                            if (value === "other" || value === "select") {
                                setUser({ ...user, employer: value === "select" ? "select" : "other"});
                                setOtherEmployer(value === "other" ? "" : null);
                                return;
                            }
                        
                            if (value === "Tax Commision" || countyArray.includes(value)) {
                                setUser({ ...user, employer: value });
                                setOtherEmployer(null);
                                return;
                            }
                        }}
                    >
                        <option value="select">Select</option>
                        <option value="other">Other</option>
                        <option value="Tax Commision">Tax Commision</option>
                        {countyArray.map((county, index) => (
                            <option key={index} value={county}>{county}</option>
                        ))}
                    </select>
                    <p className='text-error text-xs italic'>
                        Required
                    </p>
                </div>

                {otherEmployer !== null && (
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="otherEmployer">
                            Employer
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="otherEmployer"
                            type="text"
                            placeholder="Other Employer"
                            value={otherEmployer}
                            onChange={(e) => setOtherEmployer(e.target.value)}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="jobTitle">
                        Job Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="jobTitle"
                        type="text"
                        placeholder="Job Title"
                        required
                        maxLength={50}
                        value={user?.jobTitle}
                        onChange={(e) => setUser({ ...user, jobTitle: e.target.value})}
                    />
                    <p className='text-error text-xs italic'>
                        Required
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <PhoneInput
                        country={'us'}
                        regions={'north-america'}
                        disableCountryGuess={true}
                        disableCountryCode={true}
                        placeholder="(208)123-4567"
                        value={user?.contact?.phone}
                        onChange={(phone) => setUser({ ...user, contact: { ...user.contact, phone }})}
                        buttonStyle={{display: 'none'}}
                        inputProps={{
                            required: false,
                            maxLength: 14,
                            minLength: 14,
                            className: 'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
                        }}
                    />
                    <p className='text-green-600 text-xs italic'>
                        Optional
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="addressLine1">
                        Address Line 1
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="addressLine1"
                        type="text"
                        placeholder="1234 Fake St."
                        maxLength={50}
                        value={user?.contact?.addressLine1 ?? ''}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine1: e.target.value } })}
                    />
                    <p className='text-green-600 text-xs italic'>
                        Optional
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="addressLine2">
                        Address Line 2
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="addressLine2"
                        type="text"
                        placeholder="Apt. 123"
                        maxLength={50}
                        value={user?.contact?.addressLine2 ?? ''}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine2: e.target.value } })}
                    />
                    <p className='text-green-600 text-xs italic'>
                        Optional
                    </p>
                </div>

                <div className="flex justify-between space-x-2">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            placeholder="City"
                            maxLength={50}
                            value={user.contact?.city ?? ''}
                            onChange={(e) => setUser({ ...user, contact: { ...user.contact, city: e.target.value } })}
                        />
                        <p className='text-green-600 text-xs italic'>
                            Optional
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="state">
                            State
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="state"
                            value={user.contact?.state ?? "ID"}
                            onChange={(e) => setUser({ ...user, contact: { ...user.contact, state: e.target.value } })}
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
                        <p className='text-green-600 text-xs italic'>
                            Optional
                        </p>
                    </div>

                    <div className="mb-4 w-1/3">
                        <label className="block text-sm font-bold mb-2" htmlFor="zip">
                            Zip
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="zip"
                            type="text"
                            placeholder="Zip"
                            maxLength={5}
                            minLength={5}
                            value={user.contact?.zip ?? ''}
                            onKeyDown={(e) => {handleZipInput(e)}}
                            onChange={(e) => setUser({ ...user, contact: { ...user.contact, zip: e.target.value } })}
                        />
                        <p className='text-green-600 text-xs italic'>
                            Optional
                        </p>
                    </div>
                
                </div>
                
                <div className='flex items-center justify-between'>
                    <button 
                        type="submit"
                        className="btn btn-success text-white mt-4"
                        disabled={!isFormValid()}
                        >
                            Add User
                    </button>
                    {!isFormValid() && (<p className="text-error text-xs italic">Please fill out all required fields</p>)}
                </div>

                {/* <button
                    type="button"
                    className="btn btn-secondary text-white mt-4 ml-2"
                    onClick={(() => console.log(user))}
                >
                    USER
                </button>

                <button
                    type="button"
                    className="btn btn-secondary text-white mt-4 ml-2"
                    onClick= {() => console.log(isEmailValid)}
                >
                    IS EMAIL VALID
                </button> */}


    
            
            </form>
        )
    }
}

export default NewUserForm;




