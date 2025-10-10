import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";

export default function ProductIndexPage() {
    return (
        <AnalyticsDashboardLayout>
            <DashboardPadding>
                <CardHeader title="Product Index" />
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}
