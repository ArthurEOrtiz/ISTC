import Link from "next/link";

interface EditCoursesLayoutProps {
    children: React.ReactNode;
}

const EditCoursesLayout: React.FC<EditCoursesLayoutProps> = ({ children }) => {
    return (
        <div>
            <ul className="navbar bg-primary">
                <li>
                    <Link href="/admin/courses/add" className="btn btn-ghost text-white">
                        Add Course
                    </Link>
                </li>
                <li>
                    <Link href="/admin/courses/edit" className="btn btn-ghost text-white">
                        Course List
                    </Link>
                </li>
            </ul>

            {children}
        </div>
    );
};

export default EditCoursesLayout;

