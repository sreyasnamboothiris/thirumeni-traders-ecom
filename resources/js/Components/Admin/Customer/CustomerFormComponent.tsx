import useCustomForm from "@/hooks/useCustomForm";
import useInertiaPost from "@/hooks/useInertiaPost";
import { Customer } from "@/interfaces/data_interfaces";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import TextArea from "@/ui/form/TextArea";
import { route } from "ziggy-js";

export default function CustomerFormComponent({
    customer,
}: {
    customer?: Customer;
}) {
    const { formData, setFormValue } = useCustomForm({
        username: customer?.username ?? "",
        full_name: customer?.full_name ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        password: "", // only used for create
        address_line1: customer?.address_line1 ?? "",
        address_line2: customer?.address_line2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        pincode: customer?.pincode ?? "",
        country: customer?.country ?? "India",
        delivery_instructions: customer?.delivery_instructions ?? "",
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
                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label="Username"
                        value={formData.username}
                        setValue={setFormValue("username")}
                        error={errors.username}
                        required
                    />
                    <Input
                        label="Full Name"
                        value={formData.full_name}
                        setValue={setFormValue("full_name")}
                        error={errors.full_name}
                        required
                    />
                    <Input
                        label="Phone"
                        value={formData.phone}
                        setValue={setFormValue("phone")}
                        error={errors.phone}
                    />
                    <Input
                        label="Email (optional)"
                        value={formData.email}
                        setValue={setFormValue("email")}
                        error={errors.email}
                    />
                    {!customer && (
                        <Input
                            type="password"
                            label="Password"
                            value={formData.password}
                            setValue={setFormValue("password")}
                            error={errors.password}
                            required
                        />
                    )}
                    <Input
                        label="Address Line 1"
                        value={formData.address_line1}
                        setValue={setFormValue("address_line1")}
                        error={errors.address_line1}
                    />
                    <Input
                        label="Address Line 2"
                        value={formData.address_line2}
                        setValue={setFormValue("address_line2")}
                        error={errors.address_line2}
                    />
                    <Input
                        label="City"
                        value={formData.city}
                        setValue={setFormValue("city")}
                        error={errors.city}
                    />
                    <Input
                        label="State"
                        value={formData.state}
                        setValue={setFormValue("state")}
                        error={errors.state}
                    />
                    <Input
                        label="Pincode"
                        value={formData.pincode}
                        setValue={setFormValue("pincode")}
                        error={errors.pincode}
                    />
                    <Input
                        label="Country"
                        value={formData.country}
                        setValue={setFormValue("country")}
                        error={errors.country}
                    />
                    <TextArea
                        label="Delivery Instructions"
                        value={formData.delivery_instructions}
                        setValue={setFormValue("delivery_instructions")}
                        error={errors.delivery_instructions}
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button
                        type="submit"
                        disabled={loading}
                        label={customer ? "Update Customer" : "Create Customer"}
                    />
                </div>
            </form>
        </div>
    );
}
