import React from "react";

import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Button from "@/ui/button/Button";

export default function Shop() {
    const colors = {
        BG_BASE: "#f6f4ef",
        PRIMARY: "#d4a857",
        SECONDARY: "#2fe3c6",
        TEXT_PRIMARY: "#111",
    };

    const dummyProducts = [
        {
            id: 1,
            name: "Brass Diya",
            price: "₹249",
            img: "/placeholder-diya.jpg",
        },
        {
            id: 2,
            name: "Chandan Powder",
            price: "₹199",
            img: "/placeholder-chandan.jpg",
        },
        {
            id: 3,
            name: "Temple Bell",
            price: "₹499",
            img: "/placeholder-bell.jpg",
        },
        {
            id: 4,
            name: "Puja Thali Set",
            price: "₹899",
            img: "/placeholder-thali.jpg",
        },
        {
            id: 5,
            name: "Incense Sticks",
            price: "₹149",
            img: "/placeholder-incense.jpg",
        },
        {
            id: 6,
            name: "Ghee Lamp",
            price: "₹299",
            img: "/placeholder-ghee-lamp.jpg",
        },
    ];

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
            <div className="max-w-6xl mx-auto px-6 pb-16 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {dummyProducts.map((product) => (
                    <Card
                        key={product.id}
                        className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 bg-white"
                    >
                        <CardContent className="p-4 flex flex-col items-center">
                            <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
                                <img
                                    src={product.img}
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
                                    {product.price}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-center pb-4">
                            <Button label="Add to Cart" variant="outline" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
