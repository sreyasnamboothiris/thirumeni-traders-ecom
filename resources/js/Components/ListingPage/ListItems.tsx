import Pagination from "@/ui/Pagination/Pagination";
import { Paginator } from "@/ui/ui_interfaces";

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
    keyMap: ListKeyMap<T>;
    pagination?: Paginator<T>;
}

export default function ListItems<T>({
    items,
    keyMap,
    pagination,
}: ListItemsProps<T>) {
    return (
        <div className="flex flex-col gap-3">
            {items.length > 0 ? (
                items.map((item) => {
                    const key = item[keyMap.key];
                    const title = String(item[keyMap.title] ?? "");
                    const subtitle = keyMap.subtitle
                        ? String(item[keyMap.subtitle] ?? "")
                        : undefined;
                    const description = keyMap.description
                        ? String(item[keyMap.description] ?? "")
                        : undefined;
                    const showUrl = keyMap.showUrl
                        ? String(item[keyMap.showUrl] ?? "")
                        : undefined;
                    const editUrl = keyMap.editUrl
                        ? String(item[keyMap.editUrl] ?? "")
                        : undefined;
                    const deleteUrl = keyMap.deleteUrl
                        ? String(item[keyMap.deleteUrl] ?? "")
                        : undefined;

                    return (
                        <div
                            key={String(key)}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {title}
                                </h3>
                                {subtitle && (
                                    <p className="text-sm text-gray-500">
                                        {subtitle}
                                    </p>
                                )}
                                {description && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        {description}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                {showUrl && (
                                    <a
                                        href={showUrl}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View
                                    </a>
                                )}
                                {editUrl && (
                                    <a
                                        href={editUrl}
                                        className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                                    >
                                        Edit
                                    </a>
                                )}
                                {deleteUrl && (
                                    <a
                                        href={deleteUrl}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center text-gray-500 py-10">
                    No items found.
                </div>
            )}

            {pagination && (
                <div className="mt-4">
                    <Pagination pagination={pagination} />
                </div>
            )}
        </div>
    );
}
