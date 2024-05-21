import Link from "next/link";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div>
            <ul className="navbar bg-neutral">
                <li>
                    <Link href="/admin" className="btn btn-ghost text-white">
                        Admin Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/editcourse" className="btn btn-ghost text-white">
                        Add/Edit Courses
                    </Link>
                </li>
                <li>
                    <Link href="/admin/edittopics" className="btn btn-ghost text-white">
                        Add/Edit Topics
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users" className="btn btn-ghost text-white">
                        Users
                    </Link>
                </li>
                <li>
                    <Link href="/admin/attendance" className="btn btn-ghost text-white">
                        Attendance
                    </Link>
                </li>
            </ul>
            {children}
        </div>
    );
}

export default AdminLayout;