import AdminLayout from "@/Layouts/AdminLayout";
import CardHeader from "@/ui/Card/CardHeader";
import { Customer } from "@/interfaces/data_interfaces";
import CustomerFormComponent from "@/Components/Admin/Customer/CustomerFormComponent";
import Card from "@/ui/Card/Card";

interface CustomerCreatePageProps {
    customer?: Customer;
}

export default function CustomerCreatePage({
    customer,
}: CustomerCreatePageProps) {
    return (
        <AdminLayout>
            <CardHeader
                title={customer ? "Customer Edit" : "Customer Create"}
            />
            <Card>
                <CustomerFormComponent customer={customer} />
            </Card>
        </AdminLayout>
    );
}
