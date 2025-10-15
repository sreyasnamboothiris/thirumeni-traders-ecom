import React, { useCallback, useEffect, useState } from "react";
import useCustomForm from "@/hooks/useCustomForm";
import useInertiaPost from "@/hooks/useInertiaPost";
import Button from "@/ui/button/Button";
import CardHeader from "@/ui/Card/CardHeader";
import Input from "@/ui/form/Input";
import TextArea from "@/ui/form/TextArea";
import { route } from "ziggy-js";
import { useDropzone } from "react-dropzone";
import SelectList from "@/ui/form/SelectList";
import { form } from "framer-motion/dist/types/client";

export default function ProductForm({ product }: { product?: any }) {
    const { formData, setFormValue } = useCustomForm({
        name: product?.product_name ?? "",
        sku: product?.product_sku ?? "",
        slug: product?.product_slug ?? "",
        price_mrp: product?.product_price_mrp ?? "",
        price_sell: product?.product_price_sell ?? "",
        cost_price: product?.product_cost_price ?? "",
        tax_rate: product?.product_tax_rate ?? "",
        stock_qty: product?.product_stock_qty ?? "",
        reorder_point: product?.product_reorder_point ?? "",
        reorder_qty: product?.product_reorder_qty ?? "",
        weight_grams: product?.product_weight_grams ?? "",
        length_mm: product?.product_length_mm ?? "",
        width_mm: product?.product_width_mm ?? "",
        height_mm: product?.product_height_mm ?? "",
        thumbnail_url: product?.product_thumbnail_url ?? "",
        status: product?.product_status ?? "active",
        description: product?.product_description ?? "",
        _method: product ? "PUT" : undefined,
    });

    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<
        { id: string; url: string; name: string }[]
    >([]);
    const endpoint = product
        ? route("product.update", product.id)
        : route("product.store");
    const { post, errors, loading } = useInertiaPost<typeof formData>(
        endpoint,
        {
            showErrorToast: true,
        }
    );

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;
        setFiles((prev) => [...prev, ...acceptedFiles]);
        const newPreviews = acceptedFiles.map((f) => ({
            id: `${f.name}-${f.size}-${Date.now()}`,
            url: URL.createObjectURL(f),
            name: f.name,
        }));
        setPreviews((p) => [...p, ...newPreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"] },
        maxFiles: 10,
        maxSize: 5 * 1024 * 1024,
    });

    useEffect(
        () => () => previews.forEach((p) => URL.revokeObjectURL(p.url)),
        [previews]
    );

    const removeFileAt = (index: number) => {
        setFiles((f) => f.filter((_, i) => i !== index));
        setPreviews((p) => p.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        post(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <CardHeader title={product ? "Edit Product" : "Create Product"} />

            {/* BASIC */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                    Basic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        error={errors.name}
                        label="Name"
                        value={formData.name}
                        setValue={setFormValue("name")}
                        placeholder="e.g. Brass Oil Lamp"
                    />

                    <Input
                        error={errors.sku}
                        label="SKU"
                        value={formData.sku}
                        setValue={setFormValue("sku")}
                        placeholder="unique-sku-001"
                    />
                    <Input
                        error={errors.slug}
                        label="Slug"
                        value={formData.slug}
                        setValue={setFormValue("slug")}
                        placeholder="slug-for-url"
                    />

                    <div className="md:col-span-2">
                        <TextArea
                            error={errors.description}
                            label="Description"
                            value={formData.description}
                            setValue={setFormValue("description")}
                            placeholder="Short description for SEO & customers"
                        />
                    </div>
                </div>
            </div>

            {/* MEDIA */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                    Product Images
                </h3>
                <div
                    {...getRootProps()}
                    className={`border-dashed border-2 rounded-md py-5 px-3 text-center text-gray-500 text-xs cursor-pointer ${
                        isDragActive
                            ? "border-indigo-300 bg-indigo-50"
                            : "hover:border-gray-300"
                    }`}
                >
                    <input {...getInputProps()} />
                    Drag & drop or click to upload (up to 10)
                </div>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {previews.map((p, i) => (
                        <div
                            key={p.id}
                            className="relative rounded border overflow-hidden"
                        >
                            <img
                                src={p.url}
                                className="w-full h-20 object-cover"
                                alt={p.name}
                            />
                            <button
                                type="button"
                                onClick={() => removeFileAt(i)}
                                className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded px-1"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* PRICING & INVENTORY */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                    Pricing & Inventory
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                        label="MRP (₹)"
                        type="number"
                        value={formData.price_mrp}
                        setValue={setFormValue("price_mrp")}
                    />
                    <Input
                        label="Sell Price (₹)"
                        type="number"
                        value={formData.price_sell}
                        setValue={setFormValue("price_sell")}
                    />
                    <Input
                        label="Cost Price (₹)"
                        type="number"
                        value={formData.cost_price}
                        setValue={setFormValue("cost_price")}
                    />
                    <Input
                        label="Tax Rate (%)"
                        type="number"
                        value={formData.tax_rate}
                        setValue={setFormValue("tax_rate")}
                    />
                    <Input
                        label="Stock Qty"
                        type="number"
                        value={formData.stock_qty}
                        setValue={setFormValue("stock_qty")}
                    />
                    <Input
                        label="Reorder Point"
                        type="number"
                        value={formData.reorder_point}
                        setValue={setFormValue("reorder_point")}
                    />
                    <Input
                        label="Reorder Qty"
                        type="number"
                        value={formData.reorder_qty}
                        setValue={setFormValue("reorder_qty")}
                    />
                    <SelectList
                        label="Status"
                        value={formData.status}
                        setValue={setFormValue("status")}
                        list={[
                            { value: "active", label: "Active" },
                            { value: "draft", label: "Draft" },
                            { value: "archived", label: "Archived" },
                        ]}
                        dataKey="value"
                        displayKey="label"
                    />
                </div>
            </div>

            {/* DIMENSIONS */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                    Physical Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Input
                        label="Weight (g)"
                        type="number"
                        value={formData.weight_grams}
                        setValue={setFormValue("weight_grams")}
                    />
                    <Input
                        label="Length (mm)"
                        type="number"
                        value={formData.length_mm}
                        setValue={setFormValue("length_mm")}
                    />
                    <Input
                        label="Width (mm)"
                        type="number"
                        value={formData.width_mm}
                        setValue={setFormValue("width_mm")}
                    />
                    <Input
                        label="Height (mm)"
                        type="number"
                        value={formData.height_mm}
                        setValue={setFormValue("height_mm")}
                    />
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-50"
                >
                    Cancel
                </button>
                <Button
                    type="submit"
                    label={loading ? "Saving..." : "Save"}
                    disabled={loading}
                />
            </div>
        </form>
    );
}
