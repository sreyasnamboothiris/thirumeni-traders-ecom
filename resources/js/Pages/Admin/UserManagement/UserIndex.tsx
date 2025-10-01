import ListResourcePage from "@/Components/ListingPage/ListResourcePage";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";

export default function UserIndex({
    user_type,
    users,
}: {
    user_type: string;
    users: any[];
}) {
    const rows = users?.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.user?.email ?? "N/A",
        role: user.user?.role ?? "N/A",
        created_at: user.created_at ?? "N/A",
        actions: [],
    }));

    const keys = [
        { key: "name", label: "Name", isCardHeader: true },
        { key: "email", label: "Email", isShownInCard: true },
        { key: "role", label: "Role", isShownInCard: true },
        { key: "created_at", label: "Created At", isShownInCard: true },
    ];

    const formItems = {
        name: {
            type: "text",
            label: "Name",
            valueKey: "name",
            placeholder: "Enter name",
        },
        email: {
            type: "text",
            label: "Email",
            valueKey: "email",
            placeholder: "Enter email",
        },
    };

    const formData = {
        name: "",
        email: "",
    };

    const onCardClick = (id: number | string) => {
        router.get(route("temple.show", id));
    };

    const onEditClick = (id: number) => {
        router.get(route("temple.edit", id));
    };

    return (
        <div>
            <ListResourcePage
                rows={rows}
                keys={keys}
                primaryKey="id"
                title="Users"
                addUrl={route("temple.create")}
                formItems={formItems}
                formData={formData}
                handleCardClick={onCardClick}
                onEditClick={(e, row) => {
                    e.preventDefault();
                    onEditClick(row.id);
                }}
                type="definitions"
                subtype="user-management"
                cardStyles="p-4"
                subheading="Users registered in the system"
            />
        </div>
    );
}
