import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";
import { route } from "ziggy-js";

export default function UserIndex({ user_type }: { user_type: string }) {
    return (
        <AnalyticsDashboardLayout type="data" subtype="data-tables">
            <DashboardPadding>
                <CardHeader
                    title="User Index"
                    addUrl={`/ui/admin/user-management/user-create?user_type=${user_type}`}
                    onAddClick={() =>
                        route(
                            `/ui/admin/user-management/user-create?user_type=${user_type}`
                        )
                    }
                />
                <div>here it is{user_type}</div>
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}
