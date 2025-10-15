import {
    Table2,
    Database,
    Blocks,
    FileJson,
    FileCode,
    Settings,
    CheckSquare,
    Users,
    LucideIcon,
    DatabaseIcon,
    BookOpen,
    Cog,
    UserIcon,
    User,
    BoxIcon,
} from "lucide-react";
import { route } from "ziggy-js";

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
        url: "admin/user-management",
        tabDescription: "Create different type of users.",
        icon: UserIcon,
        links: [
            {
                title: "Customer",
                link: "/ui/admin/user-management?user_type=customer",
                icon: UserIcon,
            },
            {
                title: "Temple",
                link: "/ui/admin/user-management?user_type=temple",
                icon: UserIcon,
            },
            {
                title: "Shop",
                link: "/ui/admin/user-management?user_type=shop",
                icon: UserIcon,
            },
        ],
    },
    {
        name: "Products",
        value: "products",
        url: "/product",
        tabDescription: "Create different type of products.",
        icon: BoxIcon,
        links: [
            {
                title: "Create",
                link: "/product/create",
                icon: FileCode,
            },
            {
                title: "List",
                link: "/product",
                icon: BoxIcon,
            },
        ],
    }
];

export default dashboardMenuItems;
