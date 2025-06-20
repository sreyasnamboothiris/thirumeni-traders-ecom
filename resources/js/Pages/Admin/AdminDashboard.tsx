import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";
import React from "react";

function AdminDashboard() {
    return (
        <AnalyticsDashboardLayout type="data" subtype="data-tables">
            <DashboardPadding>
                <CardHeader title="Admin Dashboard" />
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}

export default AdminDashboard;
