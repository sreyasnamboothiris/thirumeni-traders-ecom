"use client";

import { useState } from "react";
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    ChevronDown,
    Sun,
    Moon,
    Globe,
} from "lucide-react";

type Language = "english" | "malayalam";
type Theme = "light" | "dark";

interface Product {
    id: number;
    name: { english: string; malayalam: string };
    price: number;
    image: string;
    category: string;
}

interface Category {
    name: { english: string; malayalam: string };
    subcategories: { english: string; malayalam: string }[];
}

export default function HomePage() {
    const [language, setLanguage] = useState<Language>("english");
    const [theme, setTheme] = useState<Theme>("light");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const translations = {
        english: {
            topBar: "Free Shipping on Orders Above ₹500",
            products: "Products",
            temples: "Temples",
            services: "Services",
            profile: "Profile",
            search: "Search for devotional items, puja materials...",
            featured: "Featured Products",
            shopNow: "Shop Now",
        },
        malayalam: {
            topBar: "₹500 ന് മുകളിലുള്ള ഓർഡറുകൾക്ക് സൗജന്യ ഷിപ്പിംഗ്",
            products: "ഉൽപ്പന്നങ്ങൾ",
            temples: "ക്ഷേത്രങ്ങൾ",
            services: "സേവനങ്ങൾ",
            profile: "പ്രൊഫൈൽ",
            search: "ഭക്തി സാധനങ്ങൾ തിരയുക...",
            featured: "പ്രധാന ഉൽപ്പന്നങ്ങൾ",
            shopNow: "ഇപ്പോൾ വാങ്ങുക",
        },
    };

    const categories: Category[] = [
        {
            name: { english: "Puja Items", malayalam: "പൂജാ സാധനങ്ങൾ" },
            subcategories: [
                { english: "Incense Sticks", malayalam: "അഗർബത്തി" },
                { english: "Oil Lamps", malayalam: "വിളക്കുകൾ" },
                { english: "Camphor", malayalam: "കർപ്പൂരം" },
                { english: "Holy Ash", malayalam: "വിഭൂതി" },
            ],
        },
        {
            name: { english: "Idols & Statues", malayalam: "വിഗ്രഹങ്ങൾ" },
            subcategories: [
                { english: "Ganesha", malayalam: "ഗണപതി" },
                { english: "Krishna", malayalam: "കൃഷ്ണൻ" },
                { english: "Lakshmi", malayalam: "ലക്ഷ്മി" },
                { english: "Shiva", malayalam: "ശിവൻ" },
            ],
        },
        {
            name: { english: "Offerings", malayalam: "വഴിപാടുകൾ" },
            subcategories: [
                { english: "Flowers", malayalam: "പൂക്കൾ" },
                { english: "Fruits", malayalam: "ഫലങ്ങൾ" },
                { english: "Prasadam", malayalam: "പ്രസാദം" },
                { english: "Sacred Thread", malayalam: "പൂണൂൽ" },
            ],
        },
        {
            name: { english: "Books & Media", malayalam: "പുസ്തകങ്ങൾ" },
            subcategories: [
                { english: "Bhagavad Gita", malayalam: "ഭഗവദ് ഗീത" },
                { english: "Ramayana", malayalam: "രാമായണം" },
                { english: "Mantras", malayalam: "മന്ത്രങ്ങൾ" },
                { english: "Audio CDs", malayalam: "ഓഡിയോ സിഡികൾ" },
            ],
        },
    ];

    const products: Product[] = [
        {
            id: 1,
            name: { english: "Brass Oil Lamp", malayalam: "പിച്ചള വിളക്ക്" },
            price: 499,
            image: "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Puja Items",
        },
        {
            id: 2,
            name: { english: "Ganesha Idol", malayalam: "ഗണപതി വിഗ്രഹം" },
            price: 899,
            image: "https://images.pexels.com/photos/3068593/pexels-photo-3068593.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Idols",
        },
        {
            id: 3,
            name: {
                english: "Incense Sticks Set",
                malayalam: "അഗർബത്തി സെറ്റ്",
            },
            price: 299,
            image: "https://images.pexels.com/photos/4056726/pexels-photo-4056726.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Puja Items",
        },
        {
            id: 4,
            name: { english: "Bhagavad Gita", malayalam: "ഭഗവദ് ഗീത" },
            price: 350,
            image: "https://images.pexels.com/photos/6787268/pexels-photo-6787268.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Books",
        },
        {
            id: 5,
            name: { english: "Camphor Box", malayalam: "കർപ്പൂര പെട്ടി" },
            price: 199,
            image: "https://images.pexels.com/photos/7207273/pexels-photo-7207273.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Puja Items",
        },
        {
            id: 6,
            name: { english: "Krishna Statue", malayalam: "കൃഷ്ണ വിഗ്രഹം" },
            price: 1299,
            image: "https://images.pexels.com/photos/8828581/pexels-photo-8828581.jpeg?auto=compress&cs=tinysrgb&w=400",
            category: "Idols",
        },
    ];

    const t = translations[language];

    const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
    const textClass = theme === "dark" ? "text-white" : "text-gray-900";
    const cardBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
    const borderClass =
        theme === "dark" ? "border-gray-700" : "border-gray-200";

    return (
        <div
            className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}
        >
            <div className="top-bar bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium animate-fade-in">
                {t.topBar}
            </div>

            <header
                className={`sticky top-0 z-50 ${cardBgClass} shadow-md transition-all duration-300`}
            >
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    className="lg:hidden p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-lg transition-all"
                                >
                                    {mobileMenuOpen ? (
                                        <X size={24} />
                                    ) : (
                                        <Menu size={24} />
                                    )}
                                </button>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    Thirumeni Traders
                                </h1>
                            </div>

                            <div className="hidden lg:flex items-center gap-6">
                                <div
                                    className="relative group"
                                    onMouseEnter={() =>
                                        setHoveredCategory("products")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredCategory(null)
                                    }
                                >
                                    <button className="flex items-center gap-1 py-2 hover:text-orange-600 transition-colors font-medium">
                                        {t.products}
                                        <ChevronDown
                                            size={16}
                                            className="group-hover:rotate-180 transition-transform duration-300"
                                        />
                                    </button>
                                    {hoveredCategory === "products" && (
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-64 ${cardBgClass} rounded-lg shadow-xl border ${borderClass} py-2 animate-slide-down`}
                                        >
                                            {categories.map((cat, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group/item"
                                                >
                                                    <div className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors cursor-pointer font-semibold">
                                                        {cat.name[language]}
                                                    </div>
                                                    <div className="pl-6">
                                                        {cat.subcategories.map(
                                                            (sub, subIdx) => (
                                                                <div
                                                                    key={subIdx}
                                                                    className="px-4 py-1.5 text-sm hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 transition-all cursor-pointer"
                                                                >
                                                                    {
                                                                        sub[
                                                                            language
                                                                        ]
                                                                    }
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <a
                                    href="#temples"
                                    className="py-2 hover:text-orange-600 transition-colors font-medium"
                                >
                                    {t.temples}
                                </a>
                                <a
                                    href="#services"
                                    className="py-2 hover:text-orange-600 transition-colors font-medium"
                                >
                                    {t.services}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setLanguageDropdownOpen(
                                            !languageDropdownOpen
                                        )
                                    }
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    <Globe size={20} />
                                    <span className="hidden sm:inline text-sm">
                                        {language === "english" ? "EN" : "ML"}
                                    </span>
                                </button>
                                {languageDropdownOpen && (
                                    <div
                                        className={`absolute right-0 mt-2 w-40 ${cardBgClass} rounded-lg shadow-xl border ${borderClass} py-2 animate-slide-down`}
                                    >
                                        <button
                                            onClick={() => {
                                                setLanguage("english");
                                                setLanguageDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => {
                                                setLanguage("malayalam");
                                                setLanguageDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            മലയാളം
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() =>
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    )
                                }
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                                {theme === "light" ? (
                                    <Moon size={20} />
                                ) : (
                                    <Sun size={20} />
                                )}
                            </button>

                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all relative">
                                <ShoppingCart size={20} />
                                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    0
                                </span>
                            </button>

                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                                <User size={20} />
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                            <div className="flex flex-col gap-2">
                                <button className="text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
                                    {t.products}
                                </button>
                                <a
                                    href="#temples"
                                    className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                                >
                                    {t.temples}
                                </a>
                                <a
                                    href="#services"
                                    className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                                >
                                    {t.services}
                                </a>
                                <a
                                    href="#profile"
                                    className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                                >
                                    {t.profile}
                                </a>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-12 animate-fade-in">
                    <div className="relative max-w-4xl mx-auto">
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={24}
                        />
                        <input
                            type="text"
                            placeholder={t.search}
                            className={`w-full pl-14 pr-4 py-4 ${cardBgClass} border ${borderClass} rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-lg`}
                        />
                    </div>
                </div>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {t.featured}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, idx) => (
                            <div
                                key={product.id}
                                className={`${cardBgClass} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up border ${borderClass}`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative overflow-hidden group">
                                    <img
                                        src={product.image}
                                        alt={product.name[language]}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">
                                        {product.name[language]}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-orange-600">
                                            ₹{product.price}
                                        </span>
                                        <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                            {t.shopNow}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }

                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out backwards;
                }
            `}</style>
        </div>
    );
}
