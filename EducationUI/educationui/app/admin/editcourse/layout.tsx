import EditCoursesNav from "./EditCourseNav";

export default function EditCoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <EditCoursesNav/>
            {children}
        </section>
    );
}