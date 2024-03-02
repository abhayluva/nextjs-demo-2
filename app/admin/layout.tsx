import Sidebar from "@/app/ui/admin/layout/sidebar";
import Topbar from "@/app/ui/admin/layout/topbar";
export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Sidebar */}
            <Sidebar />
            <div className="page-content p-5" id="content">
                {/* Topbar */}
                <Topbar />
                {/* All Content Data */}
                {children}
            </div>
        </>
    );
}