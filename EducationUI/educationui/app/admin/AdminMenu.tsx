import Link from 'next/link';

const AdminMenu: React.FC = () => {
    return (
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
                <Link href="/admin/attendance" className="btn btn-ghost text-white">
                    Attendance
                </Link>
            </li>
        </ul>
    )
}

export default AdminMenu;