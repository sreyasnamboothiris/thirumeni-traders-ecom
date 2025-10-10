"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart as CartIcon } from "lucide-react";

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

    function addToCart(productId: number, qty = 1) {
        setCart((prev) => {
            const idx = prev.findIndex((c) => c.productId === productId);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx].qty += qty;
                return copy;
            }
            return [...prev, { productId, qty }];
        });
        setCartOpen(true);
    }

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
            <header
                style={{
                    background: HEADER_BG,
                    padding: "14px 28px",
                    position: "sticky",
                    top: 0,
                    zIndex: 120,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* logo + title */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                        }}
                    >
                        <div
                            style={{
                                width: 76,
                                height: 76,
                                background: "#fff",
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            }}
                        >
                            <img
                                src="/logo.svg"
                                alt="logo"
                                style={{
                                    width: 64,
                                    height: 64,
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontWeight: 800,
                                    letterSpacing: 1.6,
                                    color: TEXT_PRIMARY,
                                }}
                            >
                                THIRUMENI{" "}
                                <span style={{ fontWeight: 600 }}>traders</span>
                            </div>
                            <div
                                style={{
                                    color: PRIMARY,
                                    fontSize: 12,
                                    marginTop: 4,
                                }}
                            >
                                Kerala E-Rituals | Products & Service
                            </div>
                        </div>
                    </div>

                    {/* nav & actions */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 22,
                        }}
                    >
                        <nav
                            style={{
                                display: "flex",
                                gap: 22,
                                fontWeight: 700,
                            }}
                        >
                            {["HOME", "ABOUT", "SHOP", "CONTACT"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        style={{
                                            color: TEXT_PRIMARY,
                                            textDecoration: "none",
                                            position: "relative",
                                            padding: "6px 0",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                PRIMARY)
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                TEXT_PRIMARY)
                                        }
                                    >
                                        {item}
                                        <span
                                            style={{
                                                display: "block",
                                                height: 3,
                                                width: 0,
                                                background: SECONDARY,
                                                borderRadius: 4,
                                                marginTop: 6,
                                                transition: "width .22s",
                                            }}
                                            className="nav-underline"
                                        />
                                    </a>
                                )
                            )}
                        </nav>

                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setLanguage((l) =>
                                        l === "english"
                                            ? "malayalam"
                                            : "english"
                                    )
                                }
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: 8,
                                    border: "1px solid rgba(0,0,0,0.06)",
                                    background: "#fff",
                                    cursor: "pointer",
                                    fontWeight: 700,
                                }}
                            >
                                {language === "english" ? "EN" : "ML"}
                            </button>

                            <button
                                onClick={() => setCartOpen(true)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    background: PRIMARY,
                                    color: "#111",
                                    border: "none",
                                    padding: "8px 14px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    fontWeight: 800,
                                }}
                                title="Open cart"
                            >
                                <CartIcon size={16} />
                                <span>
                                    {cart.reduce((s, c) => s + c.qty, 0)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "44px 24px 72px",
                }}
            >
                <section
                    style={{
                        display: "flex",
                        gap: 36,
                        alignItems: "flex-start",
                    }}
                >
                    <div style={{ flex: 1, maxWidth: 760 }}>
                        <div style={{ fontWeight: 600, marginBottom: 12 }}>
                            {t.heroSmall}
                        </div>

                        <h1
                            style={{
                                fontFamily: "Anton, sans-serif",
                                fontSize: 52,
                                margin: 0,
                                lineHeight: 1,
                                textTransform: "uppercase",
                                color: TEXT_PRIMARY,
                            }}
                        >
                            {t.heroTitle}
                        </h1>

                        <p
                            style={{
                                fontFamily: "Merriweather, serif",
                                fontSize: 18,
                                color: "#222",
                                marginTop: 20,
                                maxWidth: 700,
                            }}
                        >
                            {t.heroDesc} <strong>Kerala-Tantrik Model</strong>
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer
                style={{
                    background: "#fff",
                    borderTop: "1px solid rgba(0,0,0,0.04)",
                    marginTop: 40,
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "48px 24px",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: 24,
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 10,
                            }}
                        >
                            <img
                                src="/logo.svg"
                                alt="logo"
                                style={{
                                    width: 56,
                                    height: 56,
                                    objectFit: "contain",
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 800 }}>
                                    THIRUMENI traders
                                </div>
                                <div style={{ color: PRIMARY, fontSize: 12 }}>
                                    Kerala E-Rituals & Devotional Goods
                                </div>
                            </div>
                        </div>

                        <p
                            style={{
                                maxWidth: 520,
                                color: "#333",
                                marginTop: 10,
                            }}
                        >
                            Thirumeni Traders curates authentic Kerala ritual
                            items & temple offerings — handcrafted, responsibly
                            sourced, and delivered with care.
                        </p>

                        <div style={{ marginTop: 18 }}>
                            <div style={{ fontWeight: 700, marginBottom: 8 }}>
                                Join our list
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    maxWidth: 420,
                                }}
                            >
                                <input
                                    placeholder="Enter email"
                                    style={{
                                        flex: 1,
                                        padding: "10px 12px",
                                        borderRadius: 8,
                                        border: "1px solid rgba(0,0,0,0.08)",
                                    }}
                                />
                                <button
                                    style={{
                                        background: PRIMARY,
                                        color: "#111",
                                        border: "none",
                                        padding: "10px 14px",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                        fontWeight: 700,
                                    }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 32 }}>
                        <div>
                            <div style={{ fontWeight: 800, marginBottom: 8 }}>
                                Shop
                            </div>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    color: "#444",
                                }}
                            >
                                <li style={{ marginBottom: 8 }}>Puja Items</li>
                                <li style={{ marginBottom: 8 }}>Idols</li>
                                <li style={{ marginBottom: 8 }}>Offerings</li>
                                <li style={{ marginBottom: 8 }}>Books</li>
                            </ul>
                        </div>

                        <div>
                            <div style={{ fontWeight: 800, marginBottom: 8 }}>
                                Help
                            </div>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    color: "#444",
                                }}
                            >
                                <li style={{ marginBottom: 8 }}>Contact</li>
                                <li style={{ marginBottom: 8 }}>Shipping</li>
                                <li style={{ marginBottom: 8 }}>Returns</li>
                                <li style={{ marginBottom: 8 }}>FAQ</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid rgba(0,0,0,0.03)",
                        padding: "18px 24px",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "#666",
                        }}
                    >
                        <div>
                            © {new Date().getFullYear()} Thirumeni Traders —
                            Crafted with faith & care
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "center",
                            }}
                        >
                            <div style={{ fontSize: 13, color: "#999" }}>
                                Payment icons
                            </div>
                            <div
                                style={{
                                    width: 160,
                                    height: 26,
                                    background:
                                        "linear-gradient(90deg, rgba(0,0,0,0.03), rgba(0,0,0,0.02))",
                                    borderRadius: 6,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
        /* underline width on hover */
        nav a:hover .nav-underline { width: 28px !important; }

        @media (max-width: 900px) {
          main { padding: 28px 16px 48px; }
        }
      `}</style>
        </div>
    );
}
