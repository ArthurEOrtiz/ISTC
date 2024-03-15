import { checkUserExistsByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewUserRegistration from "../components/UserComponents/NewUserRegistration";

const UserPage: React.FC = async() => {
    const user = await currentUser();
    if (!user) {
         redirect('/');
    }
    
    const doesUserExist = await checkUserExistsByClerkId(user.id);

    const clerkId = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.emailAddresses[0].emailAddress;


    return (
        <div>
            {doesUserExist ? (
                <div>
                    <h1>User already exists</h1>
                </div>
            ) : (
                <div>
                    <NewUserRegistration 
                        clerkId={clerkId}
                        firstName={firstName|| ""} 
                        lastName={lastName ||""}
                        email={email}/>
                </div>
            )}
        </div>
    );
}

export default UserPage;