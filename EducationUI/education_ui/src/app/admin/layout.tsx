import AdminMenu from "@/app/admin/AdminMenu";

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

