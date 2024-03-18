import { checkUserExistsByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewUserRegistration from "../components/UserComponents/NewUserRegistration";
import UserDashboard from "../components/UserComponents/UserDashboard";

const UserPage: React.FC = async() => {
    const user = await currentUser();
    if (!user) {
         redirect('/');
    }
    
    const doesUserExist = await checkUserExistsByClerkId(user.id);

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.emailAddresses[0].emailAddress;

    return (
        <div>
            {doesUserExist ? (
                <div>
                    <UserDashboard clerkId={user.id}/>
                </div>
            ) : (
                <div>
                    <NewUserRegistration 
                        clerkId={user.id}
                        firstName={firstName|| ""} 
                        lastName={lastName ||""}
                        email={email}/>
                </div>
            )}
        </div>
    );
}

export default UserPage;