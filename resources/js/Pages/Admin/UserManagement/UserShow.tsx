import { CardContent } from "@/Components/ui/card";
import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import Card from "@/ui/Card/Card";
import CardHeader from "@/ui/Card/CardHeader";
import DeleteModal from "@/ui/Modal/DeleteModal";
import { useState } from "react";
import { route } from "ziggy-js";

interface Props {
    user: any;
}

export default function UserShow({ user }: Readonly<Props>) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <AnalyticsDashboardLayout type="data" subtype="data-tables">
            <DashboardPadding>
                <Card>
                    <CardHeader
                        title={user.name}
                        onDeleteClick={() => {
                            setShowDeleteModal(true);
                        }}
                        subheading={user.email}
                        editUrl={route("temple.edit", user.id)}
                    />
                    <CardContent>
                        <div className="flex flex-col gap-5">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                            <p>{user.created_at}</p>
                        </div>
                    </CardContent>
                </Card>
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}
