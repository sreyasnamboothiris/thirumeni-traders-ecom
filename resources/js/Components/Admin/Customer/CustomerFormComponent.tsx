import useCustomForm from "@/hooks/useCustomForm";
import useInertiaPost from "@/hooks/useInertiaPost";
import { Customer } from "@/interfaces/data_interfaces";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import { route } from "ziggy-js";

export default function CustomerFormComponent({
    customer,
}: {
    customer?: Customer;
}) {
    const { formData, setFormValue } = useCustomForm({
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        address: customer?.address ?? "",
        _method: customer ? "PUT" : "POST",
    });
    const { post, errors, loading } = useInertiaPost<typeof formData>(
        customer
            ? route("customer.update", customer.id)
            : route("customer.store")
    );
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(formData);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <Input
                        label="Name"
                        value={formData.name}
                        setValue={setFormValue("name")}
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        value={formData.email}
                        setValue={setFormValue("email")}
                        error={errors.email}
                    />
                    <Input
                        label="Phone"
                        value={formData.phone}
                        setValue={setFormValue("phone")}
                        error={errors.phone}
                    />
                    <Input
                        label="Address"
                        value={formData.address}
                        setValue={setFormValue("address")}
                        error={errors.address}
                    />
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        type="submit"
                        disabled={loading}
                        label={customer ? "Update" : "Create"}
                    />
                </div>
            </form>
        </div>
    );
}
