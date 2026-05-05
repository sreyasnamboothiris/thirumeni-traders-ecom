import {
    BoxIcon,
    FileCode,
    LucideIcon,
    UserIcon
} from "lucide-react";

export interface SvgImage {
    svg: string;
}

const DATA_TABLES_PERMISSION = "data-tables";

interface DashboardMenuItem {
    name: string;
    value: string;
    url?: string;
    tabDescription?: string;
    icon?: LucideIcon;
    links: {
        title: string;
        link: string;
        icon: LucideIcon;
    }[];
}

const dashboardMenuItems: DashboardMenuItem[] = [
    {
        name: "Users",
        value: "users",
        url: "/users",
        tabDescription: "Create different type of users.",
        icon: UserIcon,
        links: [
            {
                title: "Customer",
                link: "/customers",
                icon: UserIcon,
            },
            {
                title: "Temple",
                link: "/temples",
                icon: UserIcon,
            },
            {
                title: "Shop",
                link: "/shops",
                icon: UserIcon,
            },
        ],
    },
    {
        name: "Products",
        value: "products",
        url: "/products",
        tabDescription: "Create different type of products.",
        icon: BoxIcon,
        links: [
            {
                title: "Create",
                link: "/products/create",
                icon: FileCode,
            },
            {
                title: "List",
                link: "/products",
                icon: BoxIcon,
            },
        ],
    },
];

export default dashboardMenuItems;
