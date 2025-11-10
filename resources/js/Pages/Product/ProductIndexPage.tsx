import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Paginator } from "@/ui/ui_interfaces";
import { Product } from "@/interfaces/data_interfaces";
import ListItems from "@/Components/ListingPage/ListItems";

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
        editUrl: "product.edit",
        deleteUrl: "product.destroy",
    } as const;
    console.log(products);
    return (
        <AdminLayout>
            <CardHeader title="Product Index" />
            <div className="px-6 py-4">
                <ListItems<Product>
                    items={products?.data}
                    keyMap={keyMap}
                    pagination={pagination}
                />
            </div>
        </AdminLayout>
    );
}
