import EditTopicNav from "./EditTopicNav";

interface EditTopicLayoutProps {
    children: React.ReactNode;
}

const EditTopicLayout: React.FC<EditTopicLayoutProps> = ({ children }) => {
    return (
        <div>
            <EditTopicNav />
            {children}
        </div>
    );
};

export default EditTopicLayout;