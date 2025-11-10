import React from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Button from "@/ui/button/Button";
import Pagination from "@/ui/Pagination/Pagination";
import { Paginator } from "@/ui/ui_interfaces";

interface Product {
    id: number;
    name: string;
    description: string | null;
    price_sell: string | null;
    thumbnail_url: string | null;
    slug: string;
    status: string;
}

export default function Shop({ products }: { products: Paginator<Product> }) {
    const colors = {
        BG_BASE: "#f6f4ef",
        PRIMARY: "#d4a857",
        SECONDARY: "#2fe3c6",
        TEXT_PRIMARY: "#111",
    };

    return (
        <div className="min-h-screen" style={{ background: colors.BG_BASE }}>
            {/* Header */}
            <div className="text-center py-12">
                <h1
                    className="text-3xl font-extrabold"
                    style={{ color: colors.TEXT_PRIMARY }}
                >
                    Shop Ritual Essentials
                </h1>
                <p className="text-gray-600 mt-2">
                    Discover handcrafted, authentic Kerala ritual items &
                    devotional goods.
                </p>
            </div>

            {/* Product Grid */}
            <div className="max-w-6xl mx-auto px-6 pb-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.data.map((product) => (
                    <Card
                        key={product.id}
                        className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 bg-white"
                    >
                        <CardContent className="p-4 flex flex-col items-center">
                            <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
                                <img
                                    src={
                                        product.thumbnail_url
                                            ? product.thumbnail_url
                                            : "/placeholder-product.jpg"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-center">
                                <div
                                    className="font-semibold text-lg"
                                    style={{ color: colors.TEXT_PRIMARY }}
                                >
                                    {product.name}
                                </div>
                                <div className="text-sm font-medium mt-1 text-gray-600">
                                    ₹{product.price_sell || "N/A"}
                                </div>
                                {product.description && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                        {product.description}
                                    </p>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-center pb-4">
                            <Button
                                label="Add to Cart"
                                variant="outline"
                                icon={<ShoppingCart className="w-4 h-4 mr-1" />}
                                onClick={() => {
                                    const message = `Hi, I'm interested in buying *${
                                        product.name
                                    }* for ₹${
                                        product.price_sell || "N/A"
                                    }. Can you share more details?`;
                                    const encodedMessage =
                                        encodeURIComponent(message);
                                    window.open(
                                        `https://wa.me/918281839912?text=${encodedMessage}`,
                                        "_blank"
                                    );
                                }}
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="max-w-6xl mx-auto px-6 pb-16">
                <Pagination pagination={products} />
            </div>
        </div>
    );
}
