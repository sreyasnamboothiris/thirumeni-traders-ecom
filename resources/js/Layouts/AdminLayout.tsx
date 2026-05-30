import { ToastContainer } from "react-toastify";
import CustomBreadcrumb from "@/ui/BreadCrumb";
import LeftNavBar from "@/Components/Navbar/LeftNavBar";
import TopNavBar from "@/Components/Navbar/TopNavBar";
import { MainNav } from "@/Components/Navbar/navitems";
import { BreadcrumbItem } from "@/types";
import { SidebarProvider } from "@/Components/ui/sidebar";

interface Props {
    children: React.ReactNode;
    breadcrumb?: BreadcrumbItem[];
    navItems?: MainNav;

    leftBarTitle?: string;
    title?: string;
    selectedItem?: string;
    selectedTopNav?: string;
}

export default function AdminLayout({
    children,
    selectedTopNav,
    selectedItem,
    navItems,
    breadcrumb,
    leftBarTitle,
}: Props) {
    return (
        <SidebarProvider>
            <ToastContainer theme="dark" />
            <div className="flex h-screen w-full flex-col">
                <div className="">
                    <TopNavBar selectedTopNav={selectedTopNav} />
                </div>

                <div className="grid flex-1 grid-cols-12">
                    <div className="col-span-2 hidden lg:block">
                        <LeftNavBar
                            title={leftBarTitle ?? ""}
                            selectedItem={selectedItem}
                            items={navItems}
                        />
                    </div>

                    <main className="col-span-11 p-4 lg:col-span-7">
                        <div>
                            <div className="px-4 pt-2">
                                <CustomBreadcrumb list={breadcrumb ?? []} />
                            </div>

                            <div className="flex flex-col gap-4 overflow-x-auto p-2">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
