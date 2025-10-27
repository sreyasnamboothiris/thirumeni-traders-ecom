"use client";

import React, { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ShoppingCart as CartIcon, Link } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ---------------- Brand Tokens ---------------- */
const BG_BASE = "#f6f4ef";
const HEADER_BG = "#efe8df";
const PRIMARY = "#d4a857";
const SECONDARY = "#2fe3c6";
const TEXT_PRIMARY = "#111";

export default function HomeNavBar() {
    const isMobile = useIsMobile();
    const [language, setLanguage] = useState<"english" | "malayalam">(
        "english"
    );

    return (
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
                {/* ---------- Left: Logo + Brand ---------- */}
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

                {/* ---------- Right: Navigation + Actions ---------- */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 28,
                    }}
                >
                    {/* --- Navigation Menu --- */}
                    <NavigationMenu>
                        <NavigationMenuList className="flex-wrap gap-3">
                            <NavItem title="Shop" href="/" />
                            <NavItem title="About" href="/about" />
                            <NavItem title="Home" href="/home" />
                            <NavItem title="Contact" href="/contact" />
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* --- Actions --- */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <button
                            onClick={() =>
                                setLanguage((l) =>
                                    l === "english" ? "malayalam" : "english"
                                )
                            }
                            style={{
                                padding: "8px 10px",
                                borderRadius: 8,
                                border: "1px solid rgba(0,0,0,0.06)",
                                background: "#fff",
                                cursor: "pointer",
                                fontWeight: 700,
                                minWidth: 48,
                            }}
                        >
                            {language === "english" ? "EN" : "ML"}
                        </button>

                        <button
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
                            title="Cart"
                        >
                            <CartIcon size={16} />
                            <span>0</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

/* ---------------- Helper Nav Item ---------------- */
function NavItem({ title, href }: { title: string; href: string }) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="text-[14px] font-semibold px-2 py-1 hover:text-[#d4a857] transition-colors duration-200"
                >
                    {title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}
