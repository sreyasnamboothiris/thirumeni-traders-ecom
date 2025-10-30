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
import ImageDropzone from "@/ui/form/ImageDropzone";
import { Inertia } from "@inertiajs/inertia";


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
        images: product?.product_images ?? [],
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

    // If you have files, send multipart/form-data
    if (files.length > 0) {
        const payload = new FormData();

        // Append simple fields from formData
        Object.entries(formData).forEach(([key, val]) => {
            if (val === undefined || val === null) return;

            // Don't append the `images` property from formData (we're using files[] instead)
            if (key === "images") return;

            // If value is object/array, stringify it
            if (typeof val === "object") {
                payload.append(key, JSON.stringify(val));
            } else {
                payload.append(key, String(val));
            }
        });

        // Append files as images[]
        files.forEach((file) => {
            payload.append("images[]", file, file.name);
        });

        // If update, include _method
        if (formData._method) {
            payload.append("_method", formData._method);
        }

        // Send FormData via Inertia (do NOT set Content-Type header)
        Inertia.post(endpoint, payload, {
            onProgress: (progress) => {
                // optional: progress.loaded / progress.total
            },
        });

        return;
    }

    // No files -> fallback to JSON post
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
            {/* MEDIA */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Product Images</h3>

                <ImageDropzone
                    files={files}
                    setFiles={setFiles}
                    previews={previews}
                    setPreviews={setPreviews}
                    label={undefined}
                    error={errors.images ?? null}
                    maxFiles={10}
                    maxSizeBytes={5 * 1024 * 1024}
                    accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"] }}
                    showHint={true}
                />
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
