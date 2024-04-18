
import UserDashboard from "@/app/components/User/UserDashboard";
import ErrorModal from "@/app/shared/modals/ErrorModal";
import { User } from "@/app/shared/types/sharedTypes";
import { GetUserById } from "@/Utilities/api";

interface UserPage {
    params: {
        userId: string;
    }
}

const UserPage: React.FC<UserPage> = async ({params}) => {
    const userId = parseInt(params.userId);
    const user = await GetUserById(userId) as User;

    return (
        <div>
            {user.clerkId ? (
                <UserDashboard clerkId={user.clerkId} />
            ) : (
                <ErrorModal 
                title={"User not found"} 
                message={""} 
                onClose={function (): void {
                        throw new Error("User not found");
                    }}
                />
            )}
        </div>
    );
} 

export default UserPage;

