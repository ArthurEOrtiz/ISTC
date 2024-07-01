import { checkUserExistsByClerkId, GetUserByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewUserRegistration from "../components/User/NewUserRegistration";
import UserDashboard from "../components/User/UserDashboard";
import { User as ClerkUser } from "@clerk/nextjs/server";
import { User } from "../shared/types/sharedTypes";

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
    const clerkUser: ClerkUser | null = await currentUser().catch(() => {throw new Error('Error getting current user')});
    
    // if there is no user, redirect to the home page
    if (!clerkUser) {
        redirect('/');
    }
    
    // check if the user has signed up
    const hasTheUserSignedUp: boolean = await checkUserExistsByClerkId(clerkUser.id).catch(() => {throw new Error('Error checking if user exists')});

    const user: User | null = hasTheUserSignedUp ? await GetUserByClerkId(clerkUser.id).then((response) => response.data).catch(() => {throw new Error("Error check user status")}) : null;
    
    // render
    return (
        <div>
            {hasTheUserSignedUp && user ? (
                <UserDashboard userId={user.userId} />
            ) : (
                <NewUserRegistration />
            )}
        </div>
    )

}

export default UserPage;