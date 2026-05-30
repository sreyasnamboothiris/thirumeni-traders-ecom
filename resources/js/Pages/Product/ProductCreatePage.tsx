import { productManagementNavItems } from "@/Components/Navbar/navitems";
import ProductForm from "@/Components/Product/ProductForm";
import AdminLayout from "@/Layouts/AdminLayout";
import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";

export default function ProductCreatePage() {
    return (
        <AdminLayout
            leftBarTitle="Product Management"
            navItems={productManagementNavItems}
            title="Product Create"
            description="Create a new product"
        >
            <ProductForm />
        </AdminLayout>
    );
}
