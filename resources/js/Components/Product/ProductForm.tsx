import React, { useCallback, useEffect, useRef, useState } from "react";
import useCustomForm from "@/hooks/useCustomForm";
import useInertiaPost from "@/hooks/useInertiaPost";
import Button from "@/ui/button/Button";
import CardHeader from "@/ui/Card/CardHeader";
import Input from "@/ui/form/Input";
import TextArea from "@/ui/form/TextArea";
import { route } from "ziggy-js";
import ImageDropzone, { PreviewItem } from "@/ui/form/ImageDropzone";
import SelectList from "@/ui/form/SelectList";
import ErrorText from "@/typography/ErrorText";
import { Inertia } from "@inertiajs/inertia";

type ProductProp = {
  id?: number;
  product_name?: string;
  product_sku?: string;
  product_slug?: string;
  product_price_mrp?: number;
  product_price_sell?: number;
  product_cost_price?: number;
  product_tax_rate?: number;
  product_stock_qty?: number;
  product_reorder_point?: number;
  product_reorder_qty?: number;
  product_weight_grams?: number;
  product_length_mm?: number;
  product_width_mm?: number;
  product_height_mm?: number;
  product_thumbnail_url?: string; // existing server thumbnail URL
  product_images?: string[]; // existing server gallery URLs
  product_status?: string;
  product_description?: string;
};

export default function ProductForm({ product }: { product?: ProductProp }) {
  // form data (your custom hook)
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

  // gallery (multi-file)
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewItem[]>(() => {
    // initialize with server-provided images (if any)
    if (!product?.product_images) return [];
    return product.product_images.map((url, idx) => ({
      id: `existing-${idx}`,
      url,
      name: url.split("/").pop() || `image-${idx}`,
    }));
  });

  // track which gallery preview URLs we created in-browser so we can safely revoke them
  const createdGalleryUrlsRef = useRef<string[]>([]);

  // thumbnail (single-file)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<{
    id: string;
    url: string;
    name: string;
    isObjectUrl?: boolean;
  } | null>(() => {
    // initialize with server-provided thumbnail URL if editing
    if (!product?.product_thumbnail_url) return null;
    return {
      id: `existing-thumb-${product.id ?? "0"}`,
      url: product.product_thumbnail_url,
      name: product.product_thumbnail_url.split("/").pop() || "thumbnail",
      isObjectUrl: false,
    };
  });

  // If we create a thumbnail object URL client-side, store it to revoke later
  const createdThumbnailUrlRef = useRef<string | null>(null);

  const endpoint = product ? route("product.update", product.id) : route("product.store");
  const { post, errors, loading } = useInertiaPost<typeof formData>(endpoint, {
    showErrorToast: true,
  });

  // ----------------------------
  // Handlers: gallery onDrop
  // ----------------------------
  // NOTE: We delegate actual drop UI/logic to ImageDropzone (as in your setup).
  // However, if you ever handle drop here, use the createdGalleryUrlsRef to track object URLs.
  const onGalleryDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      // limit to maxFiles if you want; ImageDropzone already does that if you pass maxFiles
      setFiles((prev) => [...prev, ...acceptedFiles]);

      const newPreviews: PreviewItem[] = acceptedFiles.map((f) => {
        const url = URL.createObjectURL(f);
        createdGalleryUrlsRef.current.push(url);

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? (crypto as any).randomUUID()
            : `${f.name}-${f.size}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

        return { id, url, name: f.name };
      });

      setPreviews((p) => [...p, ...newPreviews]);
    },
    [setFiles, setPreviews]
  );

  // ----------------------------
  // Handlers: thumbnail single-file input
  // ----------------------------
  const onThumbnailSelected = (file: File | null) => {
    // revoke previous object-url if we created one
    if (createdThumbnailUrlRef.current) {
      try {
        URL.revokeObjectURL(createdThumbnailUrlRef.current);
      } catch {}
      createdThumbnailUrlRef.current = null;
    }

    if (!file) {
      setThumbnailFile(null);
      // if existing server thumbnail was present, and user clears, reflect that too
      setThumbnailPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    createdThumbnailUrlRef.current = url;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? (crypto as any).randomUUID()
        : `${file.name}-${file.size}-${Date.now()}`;

    setThumbnailFile(file);
    setThumbnailPreview({ id, url, name: file.name, isObjectUrl: true });
  };

  // helper to remove a gallery item by index
  const removeGalleryAt = (index: number) => {
    setFiles((f) => f.filter((_, i) => i !== index));

    // if the preview we remove was created client-side, revoke it
    setPreviews((p) => {
      const removed = p[index];
      if (removed && createdGalleryUrlsRef.current.includes(removed.url)) {
        try {
          URL.revokeObjectURL(removed.url);
        } catch {}
        createdGalleryUrlsRef.current = createdGalleryUrlsRef.current.filter((u) => u !== removed.url);
      }
      return p.filter((_, i) => i !== index);
    });
  };

  // remove thumbnail
  const removeThumbnail = () => {
    // revoke created object url if any
    if (createdThumbnailUrlRef.current) {
      try {
        URL.revokeObjectURL(createdThumbnailUrlRef.current);
      } catch {}
      createdThumbnailUrlRef.current = null;
    }
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  // cleanup on unmount: revoke any object URLs we created
  useEffect(() => {
    return () => {
      // gallery
      createdGalleryUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      createdGalleryUrlsRef.current = [];

      // thumbnail
      if (createdThumbnailUrlRef.current) {
        try {
          URL.revokeObjectURL(createdThumbnailUrlRef.current);
        } catch {}
        createdThumbnailUrlRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------
  // Submit handler
  // ----------------------------
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const hasAnyFile = files.length > 0 || thumbnailFile !== null;

  if (hasAnyFile) {
    const payload = new FormData();

    // Append formData fields (skip images key if present)
    Object.entries(formData).forEach(([key, val]) => {
      if (val === undefined || val === null) return;
      if (key === "images") return; // handled as files[]
      if (key === "thumbnail_url") return; // server thumbnail URL not sent directly
      if (key === "_method" && !formData._method) return;

      if (typeof val === "object") {
        payload.append(key, JSON.stringify(val));
      } else {
        payload.append(key, String(val));
      }
    });

    // Append gallery files
    files.forEach((file) => {
      payload.append("images[]", file, file.name);
    });

    // Append thumbnail separately
    if (thumbnailFile) {
      payload.append("thumbnail", thumbnailFile, thumbnailFile.name);
    }

    // include _method if editing
    if (formData._method) payload.append("_method", formData._method);

    // Use Inertia to post multipart data (do not set Content-Type)
    Inertia.post(endpoint, payload, {
      onProgress: (progress) => {
        // optional: progress.loaded / progress.total
      },
      onSuccess: () => {
        // Force a client visit to ensure URL and page update
        Inertia.visit(route("product.index"));
      },
      onError: (errs) => {
        // optional: handle client-side error UI; server validation will populate errors prop
        console.log("submit errors", errs);
      },
    });

    return;
  }

  // no files — send JSON via Inertia.post so we can handle onSuccess the same way
  Inertia.post(endpoint, formData as any, {
    onSuccess: () => {
      Inertia.visit(route("product.index"));
    },
    onError: (errs) => {
      console.log("submit errors", errs);
    },
  });
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm">
      <CardHeader title={product ? "Edit Product" : "Create Product"} />

      {/* BASIC */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Basic Details</h3>

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
        <h3 className="font-semibold text-gray-800 mb-3">Product Images</h3>

        {/* Thumbnail (single) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>

          <div className="flex items-start gap-4">
            {/* preview */}
            <div className="w-28 h-28 rounded border overflow-hidden flex items-center justify-center bg-gray-50">
              {thumbnailPreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={thumbnailPreview.url}
                    alt={thumbnailPreview.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded px-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-xs text-gray-500 p-2 text-center">No thumbnail</div>
              )}
            </div>

            {/* file input */}
            <div className="flex-1">
              <input
                id="thumbnail_input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  if (f) onThumbnailSelected(f);
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 800×800 px. PNG/JPG/WebP.</p>

              {errors.thumbnail && <ErrorText>{errors.thumbnail}</ErrorText>}
            </div>
          </div>
        </div>

        {/* Gallery: uses your ImageDropzone component (controlled) */}
        <ImageDropzone
          files={files}
          setFiles={setFiles}
          previews={previews}
          setPreviews={(updater) => {
            // wrapper to ensure we track any created object URLs if previews are set directly.
            // In typical use the ImageDropzone will call setPreviews itself and create object URLs.
            // We simply forward to your state setter here.
            setPreviews(updater);
          }}
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
        <h3 className="font-semibold text-gray-800 mb-3">Pricing & Inventory</h3>
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
        <h3 className="font-semibold text-gray-800 mb-3">Physical Details</h3>
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
        <Button type="submit" label={loading ? "Saving..." : "Save"} disabled={loading} />
      </div>
    </form>
  );
}
