import { AppSidebar } from "@/Components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { ToogleLanguage } from "@/Components/ui/ToogleLanguage";
import { ToastContainer } from "react-toastify";
import AdminLayoutPadding from "./AdminLayoutPadding";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider
            defaultOpen={false}
            className="flex flex-col bg-white pl-1 md:pl-8"
        >
            {/* <div className='mx-2 my-0 min-h-screen rounded-2xl bg-1stop-background md:mx-6 md:my-6'> */}

            <ToastContainer />
            <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm backdrop-blur-lg">
                <SidebarTrigger className="md:ml-10" />
                <ToogleLanguage />
            </div>

            <AppSidebar className="z-40" />
            <SidebarInset>
                <AdminLayoutPadding>
                    <div>{children}</div>
                </AdminLayoutPadding>
            </SidebarInset>
            {/* </div> */}
        </SidebarProvider>
    );
}
