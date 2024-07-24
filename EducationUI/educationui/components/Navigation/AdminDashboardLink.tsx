import { IsUserAdminByClerkId } from "@/Utilities/api";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const AdminLink: React.FC = async () => {
    const user = await currentUser();
    if (!user) {
        return null
    }

    const isAdmin = await IsUserAdminByClerkId(user.id);

    if (!isAdmin) {
        return null;
    }

    return (
        <Link href="/admin" className="btn btn-ghost text-white">
            Admin Dashboard
        </Link>
    );
}

export default AdminLink;