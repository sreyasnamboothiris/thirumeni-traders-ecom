import useCustomForm from "@/hooks/useCustomForm";
import Button from "@/ui/button/Button";
import CardHeader from "@/ui/Card/CardHeader";
import Input from "@/ui/form/Input";
import { CardContent } from "../ui/card";
import TextArea from "@/ui/form/TextArea";
import StrongText from "@/typography/StrongText";
import DatePicker from "@/ui/form/DatePicker";
import SelectList from "@/ui/form/SelectList";
import useInertiaPost from "@/hooks/useInertiaPost";
import { route } from "ziggy-js";

export default function TempleCreate({
    stars,
    months,
    roles,
    user,
}: {
    stars: any;
    months: any;
    roles: any;
    user: any;
}) {
    console.log(user);
    const { formData, setFormValue } = useCustomForm({
        name: user?.name ?? "",
        username: user?.user?.username ?? "",
        email: user?.user?.email ?? "",
        password: "",
        confirm_password: "",
        phone: user?.user?.phone ?? "",
        secondary_phone: user?.user?.secondary_phone ?? "",
        address: user?.address ?? "",
        location: user?.location ?? "",
        prathishta_month: user?.prathishta_month ?? "",
        prathishta_star: user?.prathishta_star ?? "",
        ulsavam_start_month: user?.ulsavam_start_month ?? "",
        ulsavam_start_star: user?.ulsavam_start_star ?? "",
        ulsavam_end_month: user?.ulsavam_end_month ?? "",
        ulsavam_end_star: user?.ulsavam_end_star ?? "",
        google_map_location: user?.google_map_location ?? "",
        role: "temple",
    });
    const { post, loading, errors } = useInertiaPost(route("temple.store"));
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(formData);
    };
    return (
        <>
            <CardHeader title="Temple Create" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <StrongText>Basic Details</StrongText>
                    <div className="flex gap-4 flex-col md:grid md:grid-cols-3 md:gap-4 p-8">
                        <div className="flex flex-col">
                            <Input
                                label="Name"
                                value={formData.name}
                                setValue={setFormValue("name")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Temple Email"
                                value={formData.email}
                                setValue={setFormValue("email")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Role"
                                value={formData.role}
                                setValue={setFormValue("role")}
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Username"
                                value={formData.username}
                                setValue={setFormValue("username")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Password"
                                type="password"
                                value={formData.password}
                                setValue={setFormValue("password")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Confirm Password"
                                type="password"
                                value={formData.confirm_password}
                                setValue={setFormValue("confirm_password")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Phone"
                                value={formData.phone}
                                setValue={setFormValue("phone")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Secondary Phone"
                                value={formData.secondary_phone}
                                setValue={setFormValue("secondary_phone")}
                            />
                        </div>
                    </div>

                    <StrongText>Address</StrongText>
                    <div className="md:grid md:grid-cols-2 gap-4 px-8 pt-4">
                        <div className="flex flex-col">
                            <Input
                                label="Location"
                                value={formData.location}
                                setValue={setFormValue("location")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Google Map Location"
                                value={formData.google_map_location}
                                setValue={setFormValue("google_map_location")}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-6">
                        <TextArea
                            label="Address"
                            value={formData.address}
                            setValue={setFormValue("address")}
                        />
                    </div>

                    <StrongText>Temple Events</StrongText>

                    <div className="md:grid md:grid-cols-2 gap-4 px-8 pt-4">
                        <div className="flex flex-col">
                            <SelectList
                                label="Prathishta Month"
                                value={formData.prathishta_month}
                                setValue={setFormValue("prathishta_month")}
                                list={months}
                                dataKey="id"
                                displayKey="name_ml"
                            />
                        </div>
                        <div className="flex flex-col">
                            <SelectList
                                label="Prathishta Star"
                                value={formData.prathishta_star}
                                setValue={setFormValue("prathishta_star")}
                                list={stars}
                                dataKey="id"
                                displayKey="name_ml"
                            />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 gap-4 px-8 pt-4">
                        <div className="flex flex-col">
                            <DatePicker
                                label="Ulsavam Start Month"
                                value={formData.ulsavam_start_month}
                                setValue={setFormValue("ulsavam_start_month")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <DatePicker
                                label="Ulsavam End Month"
                                value={formData.ulsavam_end_month}
                                setValue={setFormValue("ulsavam_end_month")}
                            />
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 gap-4 px-8 pt-4">
                        <div className="flex flex-col">
                            <SelectList
                                label="Ulsavam Start Star"
                                value={formData.ulsavam_start_star}
                                setValue={setFormValue("ulsavam_start_star")}
                                list={stars}
                                dataKey="id"
                                displayKey="name_ml"
                            />
                        </div>
                        <div className="flex flex-col">
                            <SelectList
                                label="Ulsavam End Star"
                                value={formData.ulsavam_end_star}
                                setValue={setFormValue("ulsavam_end_star")}
                                list={stars}
                                dataKey="id"
                                displayKey="name_ml"
                            />
                        </div>
                    </div>

                    <div className="px-8 py-6">
                        <Button type="submit" label="Submit" />
                    </div>
                </form>
            </CardContent>
        </>
    );
}
