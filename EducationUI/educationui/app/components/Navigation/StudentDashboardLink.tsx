;
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const StudentDashboardLink = () => {
    const {userId} = auth();
    
    if (!userId) {
        return null;
    }

    return (
        <Link href="/student" className="btn btn-ghost text-white">
            Student Dashboard
        </Link>
    )

}

export default StudentDashboardLink;