import EditUser from "@/app/components/User/EditUser";
import { auth,  } from "@clerk/nextjs/server";

interface UserPage {
    params: {
        userId: string;
    }
}

const UserPage: React.FC<UserPage> = async ({params}) => {
    const userId = parseInt(params.userId);
    const { userId: clerkId } = auth();


    if (!clerkId) {
        throw new Error('Admin user id is required.');
    }

    return (
        <div>
            <EditUser userId={userId} clerkId={clerkId} />
        </div>
    );
} 

export default UserPage;

