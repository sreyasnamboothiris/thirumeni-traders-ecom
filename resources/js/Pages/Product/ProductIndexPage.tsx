import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";

export default function ProductIndexPage({ products }: { products: any }) {
    console.log(products);
    return (
        <AnalyticsDashboardLayout>
            <DashboardPadding>
                <CardHeader title="Product Index" />
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}
