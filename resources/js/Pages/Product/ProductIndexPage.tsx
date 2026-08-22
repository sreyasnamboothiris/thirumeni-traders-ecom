import ListItems from "@/Components/ListingPage/ListItems";
import { productManagementNavItems } from "@/Components/Navbar/navitems";
import { Product } from "@/interfaces/data_interfaces";
import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Paginator } from "@/ui/ui_interfaces";
import { route } from "ziggy-js";

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
            title="Products"
            description="Manage your products"
            addBtnText="Product"
            addBtnUrl={route("products.create")}
        >
            <ListItems<Product>
                items={products?.data}
                title="Product Index"
                subtitle="slug"
                description="description"
                editUrl="products.edit"
                deleteUrl="products.destroy"
            />
        </AdminLayout>
    );
}
