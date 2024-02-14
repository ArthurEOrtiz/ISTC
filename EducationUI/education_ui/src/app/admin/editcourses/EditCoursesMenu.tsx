import Link from 'next/link'; 

const EditCoursesMenu: React.FC = () => {
    return (
        <ul className="menu bg-info-content lg:menu-horizontal w-full">
            <li>
                <Link href="/admin/editcourses/add" className="text-white">
                    Add Course
                </Link>
            </li>
            <li>
                <Link href="/admin/editcourses/edit" className="text-white">
                    Edit Course
                </Link>
            </li>
        </ul>
    )
}

export default EditCoursesMenu;