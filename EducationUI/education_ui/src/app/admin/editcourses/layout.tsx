import EditCoursesMenu from "@/app/admin/editcourses/EditCoursesMenu";


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