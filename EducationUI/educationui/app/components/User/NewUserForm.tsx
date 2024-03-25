'use client';
import Loading from "@/app/shared/Loading";
import { User } from "@/app/shared/types/sharedTypes";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

interface NewUserFormProps {
    onSubmit: (user: User) => void
}

const NewUserForm: React.FC<NewUserFormProps> = ({onSubmit}) => {
    const {user: clerkUser, isLoaded} = useUser();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (clerkUser && isLoaded) {
            console.log(clerkUser);
            setUser({
                userId: 0,
                clerkId: clerkUser.id,
                firstName: clerkUser.firstName || "",
                lastName: clerkUser.lastName || "",
                middleName: "",
                email: clerkUser.emailAddresses[0].emailAddress,
                employer: "select",
                jobTitle: "",
                isAdmin: false,
                isStudent: true,
                student: {
                    studentId: 0,
                    userId: 0,
                    accumulatedCredit: 0,
                    appraisalCertified: false,
                    mappingCertified: false,
                    attendances: null
                },
                contact: {
                    contactId: 0,
                    userId: 0,
                    phone: "",
                    addressLine1: "",
                    addressLine2: "",
                    state: "ID",
                    city: "",
                    zip: ""
                }
            });
        }
    }, [clerkUser && isLoaded]);

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

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        onSubmit(user);
    }

    const handleZipInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }
        if (isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }


    if (!isLoaded) {
        return <Loading />;
    }

    if (user) {
        return (
            <form onSubmit={handleOnSubmit} className="bg-base-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                        maxLength={50}
                        minLength={2}
                        value={user?.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="middleName">
                        Middle Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="middleName"
                        type="text"
                        placeholder="Middle Name/ Optional"
                        value={user?.middleName ?? ''}
                        onChange={(e) => setUser({ ...user, middleName: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={user?.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="employer">
                        Employer
                    </label>
                    <select
                        className="select select-bordered w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="employer"
                        value={user?.employer}
                        required
                        onChange={(e) => setUser({ ...user, employer: e.target.value})}
                    >
                        <option value="select">Select</option>
                        <option value="other">Other</option>
                        <option value="Tax Commision">Tax Commision</option>
                        {countyArray.map((county, index) => (
                            <option key={index} value={county}>{county}</option>
                        ))}
                    </select>
                </div>

                {!countyArray.includes(user.employer) && user.employer !=="select" && user.employer !== "Tax Commision" && (
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="otherEmployer">
                            Other Employer
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="otherEmployer"
                            type="text"
                            placeholder="Other Employer"
                            value={user?.employer}
                            onChange={(e) => setUser({ ...user, employer: e.target.value})}
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
                        value={user?.contact.phone}
                        onChange={(phone) => setUser({ ...user, contact: { ...user.contact, phone }})}
                        buttonStyle={{display: 'none'}}
                        inputProps={{
                            required: true,
                            maxLength: 14,
                            minLength: 14,
                            className: 'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
                        }}
                    />
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
                        required
                        maxLength={50}
                        value={user.contact.addressLine1 ?? ''}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine1: e.target.value } })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="addressLine2">
                        Address Line 2
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="addressLine2"
                        type="text"
                        placeholder="Apt. 123 / Optional"
                        maxLength={50}
                        value={user.contact.addressLine2 ?? ''}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine2: e.target.value } })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="city"
                        type="text"
                        placeholder="City"
                        required
                        maxLength={50}
                        value={user.contact.city ?? ''}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, city: e.target.value } })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="state">
                        State
                    </label>
                    <select
                        className="select select-bordered w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="state"
                        value={user.contact.state ?? "ID"}
                        required
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
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="zip">
                        Zip
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="zip"
                        type="text"
                        placeholder="Zip"
                        required
                        maxLength={5}
                        minLength={5}
                        value={user.contact.zip ?? ''}
                        onKeyDown={(e) => {handleZipInput(e)}}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, zip: e.target.value } })}
                    />
                </div>



    
                <button 
                    type="submit"
                    className="btn btn-primary text-white  mt-4"
                    >
                        Add User
                </button>
            
            </form>
        )
    }
}

export default NewUserForm;




