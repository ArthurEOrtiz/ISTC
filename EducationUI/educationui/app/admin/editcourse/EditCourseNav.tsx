import Link from 'next/link'; 

const EditCourseNav: React.FC = () => {
    return (
        <ul className="navbar bg-primary">
            <li>
                <Link href="/admin/editcourse/add" className="btn btn-ghost text-white">
                    Add Course
                </Link>
            </li>
            <li>
                <Link href="/admin/editcourse/edit" className="btn btn-ghost text-white">
                    Edit Course
                </Link>
            </li>
        </ul>
    )
}

export default EditCourseNav;