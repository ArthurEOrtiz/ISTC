import Link from "next/link";

interface EditTopicLayoutProps {
    children: React.ReactNode;
}

const EditTopicLayout: React.FC<EditTopicLayoutProps> = ({ children }) => {
    return (
        <div>
            <ul className="navbar bg-primary">
                <li>
                    <Link href="/admin/topics/add" className="btn btn-ghost text-white">
                        Add Topic
                    </Link>
                </li>
                <li>
                    <Link href="/admin/topics/edit" className="btn btn-ghost text-white">
                        Edit Topic
                    </Link>
                </li>
            </ul>
            {children}
        </div>
    );
};

export default EditTopicLayout;