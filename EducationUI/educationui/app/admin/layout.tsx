import AdminNav from "../components/Admin/AdminNav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <AdminNav/>
            {children}
        </section>
    );
}