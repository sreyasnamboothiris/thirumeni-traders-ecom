import { Link, router, usePage } from "@inertiajs/react";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { User } from "@/interfaces/data_interfaces";
import Tab from "@/ui/Tabs/Tab";
import dashboardMenuItems from "@/Layouts/dashboard-menu-items";
import MetaTags from "@/Components/MetaTags";
import { showError, showSuccess } from "@/ui/alerts";
import { ToastContainer } from "react-toastify";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import AdminLayoutPadding from "./AdminLayoutPadding";
import Button from "@/ui/button/Button";
import ToogleNumber from "@/Components/ui/ToogleNumber";
import { ToogleLanguage } from "@/Components/ui/ToogleLanguage";

interface Properties {
    children?: ReactNode;
    type?: string;
    subtype?: string;
    title?: string;
    description?: string;
    handleCardRef?: () => void;
}

export default function AnalyticsDashboardLayout({ children }: Properties) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        cardRef.current?.click();
    }, []);

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
