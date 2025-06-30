import useCustomForm from "@/hooks/useCustomForm";
import GuestLayout from "@/Layouts/GuestLayout";
import Heading from "@/typography/Heading";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import useInertiaPost from "@/hooks/useInertiaPost";

export default function Login({ status, canResetPassword }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(formData);
    };
    const { formData, setFormValue } = useCustomForm({
        email: "",
        password: "",
    });
    const { post, loading, errors } = useInertiaPost<{
        email: string;
        password: string;
    }>(route("login"));
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex justify-center">
                <Heading className="text-[24px]">Log in</Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Enter your email"
                        value={formData.email}
                        setValue={setFormValue("email")}
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
