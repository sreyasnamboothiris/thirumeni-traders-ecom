import { ToastContainer } from "react-toastify";
import CustomBreadcrumb from "@/ui/BreadCrumb";
import LeftNavBar from "@/Components/Navbar/LeftNavBar";
import TopNavBar from "@/Components/Navbar/TopNavBar";
import { MainNav } from "@/Components/Navbar/navitems";
import { BreadcrumbItem } from "@/types";
import { SidebarProvider } from "@/Components/ui/sidebar";
import AddButton from "@/ui/button/AddButton";
import { router } from "@inertiajs/react";
import EditButton from "@/ui/button/EditButton";

interface Props {
    children: React.ReactNode;
    breadcrumb?: BreadcrumbItem[];
    navItems?: MainNav;

    leftBarTitle?: string;
    title?: string;
    description?: string;
    addBtnUrl?: string;
    addBtnClick?: () => void;
    addBtnText?: string;
    editBtnClick?: () => void;
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
    title,
    description,
    addBtnUrl,
    addBtnClick,
    addBtnText,
    editBtnClick,
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

                    <main className="col-span-11 p-2 lg:col-span-7">
                        <div>
                            <div className="px-4 pt-2">
                                <CustomBreadcrumb list={breadcrumb ?? []} />
                            </div>
                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="flex flex-col gap-1">
                                    {title && (
                                        <div className="tt-h1 pt-5">
                                            {title}
                                        </div>
                                    )}

                                    {description && (
                                        <p className="tt-paragraph pt-5 text-gray-600">
                                            {description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        {addBtnUrl && (
                                            <AddButton
                                                onClick={() =>
                                                    router.get(addBtnUrl)
                                                }
                                                buttonText={`Add ${addBtnText}`}
                                            />
                                        )}
                                        {addBtnClick && (
                                            <AddButton
                                                onClick={addBtnClick}
                                                buttonText={`Add ${addBtnText}`}
                                            />
                                        )}
                                        {editBtnClick && (
                                            <EditButton
                                                onClick={editBtnClick}
                                            />
                                        )}
                                    </div>
                                </div>
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
