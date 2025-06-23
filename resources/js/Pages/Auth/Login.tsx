import useCustomForm from "@/hooks/useCustomForm";
import GuestLayout from "@/Layouts/GuestLayout";
import Heading from "@/typography/Heading";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import { Head } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const handleSubmit = (e) => {
        e.event.preventDefault();
        alert("post");
    };
    const { formData, setFormValue } = useCustomForm({
        username: "",
        password: "",
    });
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex justify-center">
                <Heading className="text-[24px]">Log in</Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Enter your username"
                        value={formData.username}
                        setValue={setFormValue("username")}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Enter your password"
                        value={formData.password}
                        setValue={setFormValue("password")}
                    />
                </div>
                <Button label="Login" type="submit" />
            </form>
        </GuestLayout>
    );
}
