
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const StudentDashboardLink =  async() => {
    const user = await currentUser();
    
    if (!user) {
        return null
    }

    return (
        <Link href="/student" className="btn btn-ghost text-white">
            Student Dashboard
        </Link>
    )

}

export default StudentDashboardLink;