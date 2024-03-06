import EditCoursesNav from "./EditCourseNav";

interface EditCoursesLayoutProps {
    children: React.ReactNode;
}

const EditCoursesLayout: React.FC<EditCoursesLayoutProps> = ({ children }) => {
    return (
        <div>
            <EditCoursesNav />
            {children}
        </div>
    );
};

export default EditCoursesLayout;

