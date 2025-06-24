import ListResourcePage from "@/Components/ListingPage/ListResourcePage";
import { route } from "ziggy-js";
export default function UserIndex({ user_type }: { user_type: string }) {
    const rows = [
        {
            id: 1,
            name: "Sreejith K",
            email: "sreejith@example.com",
            role: "temple",
            created_at: "2024-05-01",
            actions: [],
        },
        {
            id: 2,
            name: "Anjana M",
            email: "anjana@example.com",
            role: "temple",
            created_at: "2024-05-10",
            actions: [],
        },
    ];

    const keys = [
        { key: "name", label: "Name", isCardHeader: true },
        { key: "email", label: "Email", isShownInCard: true },
        { key: "role", label: "Role", isShownInCard: true },
        { key: "created_at", label: "Created At", isShownInCard: true },
    ];

    const page_list = {
        current_page: 1,
        per_page: 10,
        total: 2,
        from: 1,
        to: 2,
        last_page: 1,
        links: [],
    };

    const formData = {
        name: "",
        email: "",
    };

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

    const onCardClick = (id: string | number) => {
        console.log("Clicked user:", id);
    };

    return (
        <div>
            <ListResourcePage
                rows={rows}
                keys={keys}
                primaryKey={"id"}
                title="Users"
                addUrl={route("temple.create")}
                paginator={page_list}
                formItems={formItems}
                formData={formData}
                type="definitions"
                subtype="user-management"
                cardStyles="p-4"
                subheading="Users registered in the system"
                handleCardClick={onCardClick}
            />
        </div>
    );
}
