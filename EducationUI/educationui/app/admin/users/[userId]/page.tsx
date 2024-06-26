import EditUser from "@/app/components/User/EditUser";

interface UserPage {
    params: {
        userId: string;
    }
}

const UserPage: React.FC<UserPage> = async ({params}) => {
    const userId = parseInt(params.userId);

    return (
        <div className="p-4">
            <EditUser userId={userId} />
        </div>
    );
} 

export default UserPage;

