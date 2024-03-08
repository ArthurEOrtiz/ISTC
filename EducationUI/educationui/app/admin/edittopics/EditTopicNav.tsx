import Link from 'next/link';

const EditTopicNav: React.FC = () => {
    return (
        <ul className="navbar bg-primary">
            <li>
                <Link href="/admin/edittopics/add" className="btn btn-ghost text-white">
                    Add Topic
                </Link>
            </li>
            <li>
                <Link href="/admin/edittopics/edit" className="btn btn-ghost text-white">
                    Edit Topic
                </Link>
            </li>
        </ul>
    )
}

export default EditTopicNav;