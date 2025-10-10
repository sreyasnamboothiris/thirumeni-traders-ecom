import useCustomForm from "@/hooks/useCustomForm";
import useInertiaPost from "@/hooks/useInertiaPost";
import Button from "@/ui/button/Button";
import CardHeader from "@/ui/Card/CardHeader";
import FileInput from "@/ui/form/FileInput";
import Input from "@/ui/form/Input";
import { route } from "ziggy-js";

export default function ProductForm({ product }: { product?: any }) {
    const { formData, setFormValue } = useCustomForm({
        product_name: product?.product_name ?? "",
        product_description: product?.product_description ?? "",
        product_price: product?.product_price ?? "",
        product_image: product?.product_image ?? "",
        _method: product ? "PUT" : undefined,
    });

    const { post, errors } = useInertiaPost<typeof formData>(
        product ? route("product.update", product.id) : route("product.store")
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardHeader title="Product Create" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <Input
                        label="Product Name"
                        value={formData.product_name}
                        setValue={setFormValue("product_name")}
                        error={errors.product_name}
                    />
                </div>
                <div className="flex flex-col">
                    <Input
                        label="Product Description"
                        value={formData.product_description}
                        setValue={setFormValue("product_description")}
                        error={errors.product_description}
                    />
                </div>
                <div className="flex flex-col">
                    <Input
                        label="Product Price"
                        value={formData.product_price}
                        setValue={setFormValue("product_price")}
                        error={errors.product_price}
                    />
                </div>
                <div className="flex flex-col">
                    <FileInput
                        label="Product Image"
                        value={formData.product_image}
                        setValue={setFormValue("product_image")}
                        error={errors.product_image}
                    />
                </div>
            </div>
            <Button type="submit" label="Save" />
        </form>
    );
}
