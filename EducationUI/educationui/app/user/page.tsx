import { checkUserExistsByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NewUserRegistration from "../components/User/NewUserRegistration";
import UserDashboard from "../components/User/UserDashboard";
import { User } from "@clerk/nextjs/server";

const UserPage: React.FC = async() => {
    const user: User | null = await currentUser();
    
    if (!user) {
         redirect('/');
    }
    
    const doesUserExist = await checkUserExistsByClerkId(user.id);

    return (
        <div>
            {doesUserExist ? (
                <div>
                    <UserDashboard clerkId={user.id} />
                </div>
            ) : (
                <div>
                    <NewUserRegistration />
                </div>
            )}
        </div>
    );
}

export default UserPage;