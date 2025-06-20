import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";
import TempleCreate from "@/Components/UserManagement/TempleCreate";

function UserCreate({ user_type }: { user_type: string }) {
    return (
        <AnalyticsDashboardLayout type="data" subtype="data-tables">
            <DashboardPadding>
                <CardHeader title="User Create" />
                <div>{user_type === "temple" && <TempleCreate />}</div>
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}

export default UserCreate;
