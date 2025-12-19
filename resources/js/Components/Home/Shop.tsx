import React from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Button from "@/ui/button/Button";
import Pagination from "@/ui/Pagination/Pagination";
import type { Paginator } from "@/ui/ui_interfaces";

/** === Types (adjust if backend differs) === */
interface ProductImage {
  id?: number;
  product_id?: number;
  image_path?: string; // e.g. "products/xxx.jpg"
  original_name?: string;
  mime_type?: string;
  is_thumbnail?: number | boolean;
  order?: number;
}

interface Product {
  id: number;
  sku?: string | null;
  name: string;
  description?: string | null;
  price_sell?: string | null;
  thumbnail_url?: string | null;
  slug?: string;
  status?: string;
  images?: ProductImage[];
}

type ProductsProp = Paginator<Product> | Product[];

/** === Hard-coded storage base for localhost === */
const STORAGE_URL = "http://localhost:8000/storage/";

/** Build a full URL from an image path or pass through absolute URLs */
function buildImageUrlFromPath(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = STORAGE_URL.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${base}/${p}`;
}

/** === Shop component === */
export default function Shop({ products }: { products: ProductsProp }) {
  const colors = {
    BG_BASE: "#f6f4ef",
    PRIMARY: "#d4a857",
    SECONDARY: "#2fe3c6",
    TEXT_PRIMARY: "#111",
  };

  // Normalize input: paginator -> .data, array -> itself
  const items: Product[] = Array.isArray(products)
    ? products
    : products && (products as any).data
    ? (products as any).data
    : [];

  const getProductImageUrl = (product: Product) => {
    // 1) use thumbnail_url if backend provided (absolute or relative)
    if (product.thumbnail_url) {
      const maybe = buildImageUrlFromPath(product.thumbnail_url);
      return maybe ?? product.thumbnail_url;
    }

    // 2) use images array (prefer is_thumbnail === 1)
    if (product.images && product.images.length > 0) {
      const thumb =
        product.images.find((img) => img.is_thumbnail === 1 || img.is_thumbnail === true) ??
        product.images[0];
      const candidate = buildImageUrlFromPath(thumb.image_path ?? (thumb as any).url ?? null);
      if (candidate) return candidate;
    }

    // 3) fallback placeholder
    return "storage/products/thumbnail.png";
  };

  return (
    <div className="min-h-screen" style={{ background: colors.BG_BASE }}>
      <div className="text-center py-12">
        <h1 className="text-3xl font-extrabold" style={{ color: colors.TEXT_PRIMARY }}>
          Shop Ritual Essentials
        </h1>
        <p className="text-gray-600 mt-2">Discover handcrafted, authentic Kerala ritual items & devotional goods.</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No products found.</div>
        ) : (
          items.map((product) => {
            const imageUrl = getProductImageUrl(product);

            return (
              <Card
                key={product.id}
                className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 bg-white"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-lg" style={{ color: colors.TEXT_PRIMARY }}>
                      {product.name}
                    </div>
                    <div className="text-sm font-medium mt-1 text-gray-600">₹{product.price_sell ?? "N/A"}</div>
                    {product.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-center pb-4">
                  <Button
                    label="Add to Cart"
                    variant="outline"
                    icon={<ShoppingCart className="w-4 h-4 mr-1" />}
                    onClick={() => {
                      const message = `Hi, I'm interested in buying *${product.name}* for ₹${product.price_sell || "N/A"}. Can you share more details?`;
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/918281839912?text=${encodedMessage}`, "_blank");
                    }}
                  />
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination: render only if original prop was a paginator */}
      {!(Array.isArray(products)) && (products as any)?.meta && (
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <Pagination pagination={products as Paginator<Product>} />
        </div>
      )}
    </div>
  );
}
