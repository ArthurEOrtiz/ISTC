import EditCoursesMenu from "./EditCourseMenu";

export default function EditCoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <EditCoursesMenu/>
            {children}
        </section>
    );
}