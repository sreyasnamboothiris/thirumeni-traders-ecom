import ProductForm from "@/Components/Product/ProductForm";
import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";

export default function ProductCreatePage() {
    return (
        <AnalyticsDashboardLayout>
            <DashboardPadding>
                <CardHeader title="Product Create" />
                <ProductForm />
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}
