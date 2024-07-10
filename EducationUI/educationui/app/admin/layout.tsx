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
                    <Link href="/admin/courses" className="btn btn-ghost text-white">
                        Courses
                    </Link>
                </li>
                <li>
                    <Link href="/admin/topics" className="btn btn-ghost text-white">
                        Topics
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users" className="btn btn-ghost text-white">
                        Users
                    </Link>
                </li>
            </ul>
            {children}
        </div>
    );
}

export default AdminLayout;