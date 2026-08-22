import EditButton from "@/ui/button/EditButton";
import Pagination from "@/ui/Pagination/Pagination";
import { Paginator } from "@/ui/ui_interfaces";
import { route } from "ziggy-js";
import BaseCard from "./BaseCard";

export interface ListKeyMap<T> {
    key: keyof T;
    title: keyof T;
    subtitle?: keyof T;
    description?: keyof T;
    showUrl?: keyof T;
    editUrl?: keyof T;
    deleteUrl?: keyof T;
}

interface ListItemsProps<T> {
    items: T[];

    title: string;
    subtitle?: string;
    description?: string;
    showUrl?: string;
    editUrl?: string;
    deleteUrl?: string;
}

export default function ListItems<T>({
    items,
    title,
    subtitle,
    description,
    showUrl,
    editUrl,
    deleteUrl,
}: ListItemsProps<T>) {
    return (
        <>
            {items.map((item) => (
                <BaseCard item={item} title={title} />
            ))}
        </>
    );
}
