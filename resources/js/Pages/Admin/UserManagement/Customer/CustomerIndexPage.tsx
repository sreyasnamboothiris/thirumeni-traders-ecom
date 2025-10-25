import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Paginator } from "@/ui/ui_interfaces";
import { Customer } from "@/interfaces/data_interfaces";
import ListItems from "@/Components/ListingPage/ListItems";
import { route } from "ziggy-js";

export default function CustomerIndexPage({
    customers,
}: {
    customers: Paginator<Customer>;
}) {
    const pagination = customers;

    // 👇 define which keys map to what in the component
    const keyMap = {
        key: "id",
        title: "name",
        subtitle: "email",
        description: "phone",
    } as const;
    console.log(customers);
    return (
        <AdminLayout>
            <CardHeader
                title="Customer Index"
                addUrl={route("customer.create")}
            />
            <div className="px-6 py-4">
                {customers?.data.length > 0 ? (
                    <ListItems<Customer>
                        items={customers?.data}
                        keyMap={keyMap}
                        pagination={pagination}
                    />
                ) : (
                    <p>No customers found</p>
                )}
            </div>
        </AdminLayout>
    );
}
