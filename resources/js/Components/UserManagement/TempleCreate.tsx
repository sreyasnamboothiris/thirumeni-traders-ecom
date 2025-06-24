import useCustomForm from "@/hooks/useCustomForm";
import Button from "@/ui/button/Button";
import CardHeader from "@/ui/Card/CardHeader";
import Input from "@/ui/form/Input";
import { CardContent } from "../ui/card";
import TextArea from "@/ui/form/TextArea";
import StrongText from "@/typography/StrongText";

export default function TempleCreate() {
    const { formData, setFormValue, toggleBoolean } = useCustomForm({
        temple_name: "",
        user_name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "temple",
        confirm_password: "",
        secondary_phone: "",
    });
    return (
        <>
            <CardHeader title="Temple Create" />
            <CardContent>
                <form>
                    <StrongText>Basic Details</StrongText>
                    <div className="flex gap-4 flex-col md:grid md:grid-cols-3 md:gap-4 p-8">
                        <div className="flex flex-col">
                            <Input
                                label="Temple Name"
                                value={formData.temple_name}
                                setValue={setFormValue("temple_name")}
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
                                label="User Name"
                                value={formData.user_name}
                                setValue={setFormValue("user_name")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Password"
                                value={formData.password}
                                setValue={setFormValue("password")}
                            />
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Confirm password"
                                value={formData.confirm_password}
                                setValue={setFormValue("confirm_password")}
                            />
                        </div>
                    </div>
                    <StrongText>Contact details</StrongText>
                    <div className="md:grid md:grid-cols-2 gap-4 px-8">
                        <div className="flex flex-col">
                            <Input
                                label="Phone"
                                value={formData.phone}
                                setValue={setFormValue("phone")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Secondary phone"
                                value={formData.secondary_phone}
                                setValue={setFormValue("secondary_phone")}
                            />
                        </div>
                    </div>
                    <StrongText>Address</StrongText>
                    <div className="md:grid md:grid-cols-2 gap-4 px-8">
                        locaion
                    </div>
                    <div className="flex flex-col p-6">
                        <TextArea
                            label="Address"
                            value={formData.address}
                            setValue={setFormValue("address")}
                        />
                    </div>

                    <Button type="submit" label="Submit" />
                </form>
            </CardContent>
        </>
    );
}
