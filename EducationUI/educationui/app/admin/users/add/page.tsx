import AddUser from "@/app/components/User/AddUser";

const AddUserPage: React.FC = () => {
    return (
        <>
            <h1 className="p-2 text-3xl text-center font-bold">Add User</h1>
            <div className="flex justify-center">
                <div className="w-full p-4">
                    <AddUser/>
                </div>
            </div>
        </>
    );
}

export default AddUserPage;