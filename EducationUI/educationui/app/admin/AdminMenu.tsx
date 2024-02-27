import Link from 'next/link';

const AdminMenu: React.FC = () => {
    return (
        <ul className="menu bg-info lg:menu-horizontal w-full">
            <li>
                <Link href="/admin" className="text-white">
                    Admin Dashboard
                </Link>
            </li>
            <li>
                <Link href="/admin/editcourse" className="text-white">
                    Add/Edit Courses
                </Link>
            </li>
            <li>
                <Link href="/admin/editTopics" className="text-white">
                    Add/Edit Topics
                </Link>
            </li>
            <li>
                <Link href="/admin/attendance" className="text-white">
                    Attendance
                </Link>
            </li>
        </ul>
    )
}

export default AdminMenu;