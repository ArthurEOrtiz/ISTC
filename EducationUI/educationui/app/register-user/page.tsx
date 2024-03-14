import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const RegisterUserPage: React.FC = async() => {
    const user = await currentUser();
    console.log("!!!!!!!!!!!!!!!!!!!!!USER!!!!!!!!!!!!!!", user);
    if (!user) {
         redirect('/');
    }


    return (
        <div>
            <h1>Register User</h1>
        </div>
    );
}

export default RegisterUserPage;