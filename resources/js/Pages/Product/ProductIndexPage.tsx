import ListItems from "@/Components/ListingPage/ListItems";
import { productManagementNavItems } from "@/Components/Navbar/navitems";
import { Product } from "@/interfaces/data_interfaces";
import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Paginator } from "@/ui/ui_interfaces";

export default function ProductIndexPage({
    products,
}: {
    products: Paginator<Product>;
}) {
    const pagination = products;

    // 👇 define which keys map to what in the component
    const keyMap = {
        key: "id",
        title: "name",
        subtitle: "slug",
        description: "description",
        editUrl: "products.edit",
        deleteUrl: "products.destroy",
    } as const;
    console.log(products);
    return (
        <AdminLayout
            leftBarTitle="Product Management"
            navItems={productManagementNavItems}
        >
            <CardHeader title="Product Index" />
            <div className="px-6 py-4">
                <ListItems<Product>
                    items={products?.data}
                    title="Product Index"
                    subtitle="slug"
                    description="description"
                    editUrl="products.edit"
                    deleteUrl="products.destroy"
                />
            </div>
        </AdminLayout>
    );
}
