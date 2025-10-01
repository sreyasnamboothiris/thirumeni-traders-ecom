import AnalyticsDashboardLayout from "@/Layouts/AnalyticsDashboardLayout";
import DashboardPadding from "@/Layouts/DashboardPadding";
import CardHeader from "@/ui/Card/CardHeader";
import TempleCreate from "@/Components/UserManagement/TempleCreate";

interface Props {
    user_type: any;
    stars: any;
    months: any;
    roles: any;
    user: any;
}

function UserCreate({ user_type, stars, roles, months, user }: Props) {
    return (
        <AnalyticsDashboardLayout type="data" subtype="data-tables">
            <DashboardPadding>
                <CardHeader title="User Create" />
                <div>
                    {user_type === "temple" && (
                        <TempleCreate
                            stars={stars}
                            months={months}
                            roles={roles}
                            user={user}
                        />
                    )}
                </div>
            </DashboardPadding>
        </AnalyticsDashboardLayout>
    );
}

export default UserCreate;
