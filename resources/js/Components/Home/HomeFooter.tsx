export default function HomeFooter() {
    const BG_BASE = "#f6f4ef";
    const HEADER_BG = "#efe8df"; // updated header background
    const PRIMARY = "#d4a857"; // solid CTA (gold)
    const SECONDARY = "#2fe3c6"; // secondary accent (teal)
    const TEXT_PRIMARY = "#111";
    return (
        <footer
            style={{
                background: BG_BASE,
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
                        Thirumeni Traders curates authentic Kerala ritual items
                        & temple offerings — handcrafted, responsibly sourced,
                        and delivered with care.
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
                        © {new Date().getFullYear()} Thirumeni Traders — Crafted
                        with faith & care
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
    );
}
