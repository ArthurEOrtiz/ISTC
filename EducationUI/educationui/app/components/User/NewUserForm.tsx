'use client';
import Loading from "@/app/shared/Loading";
import { User } from "@/app/shared/types/sharedTypes";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface NewUserFormProps {
    onSubmit: (user: User) => void
}

const NewUserForm: React.FC<NewUserFormProps> = ({  onSubmit}) => {
    const {user: clerkUser, isLoaded} = useUser();
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (clerkUser && isLoaded) {
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
    }, [clerkUser, isLoaded]);

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
        onSubmit(user);
    }

    const handleEmpoyerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       
        setUser({ ...user, employer: e.target.value });
       
    }

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleOnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                    >
                        First Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="firstName"
                    maxLength={50}
                    required
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="middleName"
                    >
                        Middle Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="middleName"
                    placeholder="Optional"
                    maxLength={50}
                    value={user.middleName || ""}
                    onChange={(e) => setUser({ ...user, middleName: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                    >
                        Last Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="lastName"
                    maxLength={50}
                    required
                    value={user?.lastName || ""}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                    >
                        Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    maxLength={100}
                    required
                    value={user?.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="employer"
                    >
                        Employer
                </label>
                <select
                    id="employer"
                    className="shawdow appearance-none border rounded w-full py-2 px-3"
                    onChange={handleEmpoyerChange}>
                    <option value="select">Select</option>
                    <option value="other">Other / Not Listed</option>
                    <option value="Tax Commission">Tax Commission</option>
                    {countyArray.map((county, index) => (
                        <option key={index} value={county}>{county}</option>
                    ))}
                </select>

            </div>
            {!countyArray.includes(user.employer) && user.employer !== "select" && user.employer !== "Tax Commission" && (
                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="employer"
                        >
                            Other Employer
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="employer"
                        maxLength={100}
                        required
                        defaultValue="Employer Name"
                        onChange={(e) => setUser({ ...user, employer: e.target.value })}
                    />
                </div>
            )}
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="jobTitle"
                    >
                        Job Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="jobTitle"
                    maxLength={100}
                    value={user.jobTitle || ""}
                    onChange={(e) => setUser({ ...user, jobTitle: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                    >
                        Phone
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="tel"
                    id="phone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    maxLength={20}
                    required
                    placeholder="1234567890"
                    value={user.contact.phone || ""}
                    onChange={(e) => setUser({ ...user, contact: { ...user.contact, phone: e.target.value } })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="addressLine1"
                    >
                        Address Line 1
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="addressLine1"
                    maxLength={100}
                    required
                    value={user.contact.addressLine1 || ""}
                    onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine1: e.target.value } })}
                />
            </div>
            <div className="mb-4">
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="addressLine2"
                    >
                        Address Line 2
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="addressLine2"
                    placeholder="Optional"
                    maxLength={100}
                    value={user.contact.addressLine2 || ""}
                    onChange={(e) => setUser({ ...user, contact: { ...user.contact, addressLine2: e.target.value } })}
                />
            </div>
            <div className="flex justify-between">
            
                <div className="mb-4 w-1/2 pr-2">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="city"
                        >
                            City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="city"
                        maxLength={50}
                        required
                        value={user.contact.city || ""}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, city: e.target.value } })}
                    />
                </div>
                <div className="mb-4 w-1/2 pl-2">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="state"
                        >
                            State
                    </label>
                    <select
                        id="state"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={user.contact.state || ""}
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
                <div className="mb-4 w-1/2 pl-2">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="zip"
                        >
                            Zip
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="zip"
                        maxLength={5}
                        required
                        value={user.contact.zip || ""}
                        onChange={(e) => setUser({ ...user, contact: { ...user.contact, zip: e.target.value } })}
                    />
                </div>
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

export default NewUserForm;




