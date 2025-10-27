"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart as CartIcon } from "lucide-react";
import HomeNavBar from "@/Components/NavItems/HomeNavBar";
import HomeFooter from "@/Components/Home/HomeFooter";
import Shop from "@/Components/Home/Shop";

/* ---------------- sample products ---------------- */
const PRODUCTS = [
    {
        id: 1,
        name: { english: "Brass Oil Lamp", malayalam: "പിച്ചള വിളക്ക്" },
        price: 499,
        image: "https://images.pexels.com/photos/6103171/pexels-photo-6103171.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: 2,
        name: { english: "Ganesha Idol", malayalam: "ഗണപതി വിഗ്രഹം" },
        price: 899,
        image: "https://images.pexels.com/photos/28465069/pexels-photo-28465069.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: 3,
        name: { english: "Incense Sticks Set", malayalam: "അഗർബത്തി സെറ്റ്" },
        price: 299,
        image: "https://images.pexels.com/photos/32168049/pexels-photo-32168049.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
];

const FONT_LINK =
    "https://fonts.googleapis.com/css2?family=Anton&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;600&display=swap";

/* ---------------- brand tokens ---------------- */
const BG_BASE = "#f6f4ef";
const HEADER_BG = "#efe8df"; // updated header background
const PRIMARY = "#d4a857"; // solid CTA (gold)
const SECONDARY = "#2fe3c6"; // secondary accent (teal)
const TEXT_PRIMARY = "#111";

export default function HomeNoGradient() {
    const [language, setLanguage] = useState<"english" | "malayalam">(
        "english"
    );
    const [cart, setCart] = useState<{ productId: number; qty: number }[]>([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = FONT_LINK;
        document.head.appendChild(link);

        const saved = localStorage.getItem("tt_cart_v3");
        if (saved) {
            try {
                setCart(JSON.parse(saved));
            } catch {
                setCart([]);
            }
        }
        return () => document.head.removeChild(link);
    }, []);

    useEffect(() => {
        localStorage.setItem("tt_cart_v3", JSON.stringify(cart));
    }, [cart]);

    const t = {
        english: {
            heroSmall: "Kerala E-Rituals; Products and Service;",
            heroTitle: "UNLEASH THE POTENTIAL OF FAITH WITH OUR PRODUCTS",
            heroDesc:
                "Helping to satisfy your Rituals needs with our products and services in a well-organised",
            featured: "Featured Products",
            shopNow: "Add to Cart",
        },
        malayalam: {
            heroSmall: "കേരള ഇ-രീതികൾ; ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും;",
            heroTitle: "വിശ്വാസത്തിന്റെ ശേഷി അനാവരണം ചെയ്യുക",
            heroDesc:
                "നമ്മുടെ ഉൽപ്പന്നങ്ങളും സേവനങ്ങളും ഉപയോഗിച്ച് നിങ്ങളുടെ അഭിലാഷങ്ങൾ തൃപ്തിപ്പെടുത്തുക - ഒരു ക്രമീകരിക്കപ്പെട്ട മോഡൽ",
            featured: "പ്രമുഖ ഉൽപ്പന്നങ്ങൾ",
            shopNow: "കാർട്ടിൽ ചേർക്കുക",
        },
    }[language];

    return (
        <div
            style={{
                background: BG_BASE,
                color: TEXT_PRIMARY,
                fontFamily: "Montserrat, system-ui, sans-serif",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <HomeNavBar />

            <Shop />

            <HomeFooter />
        </div>
    );
}
