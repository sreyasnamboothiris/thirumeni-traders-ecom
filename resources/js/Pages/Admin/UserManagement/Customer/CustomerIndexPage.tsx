import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Paginator } from "@/ui/ui_interfaces";
import { Customer } from "@/interfaces/data_interfaces";
import ListItems from "@/Components/ListingPage/ListItems";

export default function CustomerIndexPage({
    customers,
}: {
    customers: Paginator<Customer>;
}) {
    const pagination = customers;

    // 👇 define which keys map to what in the component
    const keyMap = {
        key: "id",
        title: "full_name",
        subtitle: "email",
        description: "phone",
    } as const;
    console.log(customers);
    return (
        <AdminLayout>
            <CardHeader title="Customer Index" />
            <div className="px-6 py-4">
                <ListItems<Customer>
                    items={customers?.data}
                    keyMap={keyMap}
                    pagination={pagination}
                />
            </div>
        </AdminLayout>
    );
}
