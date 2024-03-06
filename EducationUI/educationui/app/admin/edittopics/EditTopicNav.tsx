import Link from 'next/link';

const EditTopicNav: React.FC = () => {
    return (
        <ul className="menu bg-info-content lg:menu-horizontal w-full">
            <li>
                <Link href="/admin/edittopics/add" className="text-white">
                    Add Topic
                </Link>
            </li>
            <li>
                <Link href="/admin/edittopics/edit" className="text-white">
                    Edit Topic
                </Link>
            </li>
        </ul>
    )
}

export default EditTopicNav;