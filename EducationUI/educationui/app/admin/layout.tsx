import AdminMenu from "./AdminMenu";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <AdminMenu/>
            {children}
        </section>
    );
}