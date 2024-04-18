import { checkUserExistsByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewUserRegistration from "../components/User/NewUserRegistration";
import UserDashboard from "../components/User/UserDashboard";
import { User } from "@clerk/nextjs/server";

/*
* This is the page the user will see when they log in or sign up. There are three possible scenarios:
* 1. The user has not signed up yet, and no one has signed them up on the backend. 
* 2. The user has not signed up yet, but someone has signed them up on the backend. 
* 3. The user has signed up already.
* In the first two scenarios, the user will see the NewUserRegistration component. 
* In the third scenario, the user will see the UserDashboard component. The way that this
* page determines which scenario is happening is seeing if the user can be found with the Clerk ID.
* Regardless of the scenario, if the user gets to the page, they will have a clerk ID.
*/
const UserPage: React.FC = async() => {
    const user: User | null = await currentUser(); // get the clerk user
    
    // if there is no user, redirect to the home page
    if (!user) {
         redirect('/');
    }
    
    // check if the user has signed up
    const hasTheUserSignedUp: boolean = await checkUserExistsByClerkId(user.id);
    
    // render the page
    return (
        <div>
            {hasTheUserSignedUp ? (
                <UserDashboard clerkId={user.id} />
            ) : (
                <NewUserRegistration />
            )}
        </div>
    )

}

export default UserPage;