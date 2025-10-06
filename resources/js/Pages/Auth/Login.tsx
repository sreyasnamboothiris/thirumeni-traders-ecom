import useCustomForm from "@/hooks/useCustomForm";
import GuestLayout from "@/Layouts/GuestLayout";
import Heading from "@/typography/Heading";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import useInertiaPost from "@/hooks/useInertiaPost";

export default function Login({ status, canResetPassword }) {
    const { formData, setFormValue } = useCustomForm({
        username: "",
        password: "",
    });

    const { post, loading, errors } = useInertiaPost<{
        username: string;
        password: string;
    }>(route("login"), {
        showErrorToast: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // native validation
        if (!(e.target as HTMLFormElement).reportValidity()) return;

        post(formData);
        console.log(formData);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex justify-center">
                <Heading className="text-[24px]">Log in</Heading>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="flex flex-col gap-4">
                    <Input
                        label="Enter your username"
                        name="username"
                        value={formData.username}
                        setValue={setFormValue("username")}
                        required
                        minLength={3}
                        disabled={loading}
                        autoFocus
                    />
                    {errors?.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-4">
                    <Input
                        label="Enter your password"
                        type="password"
                        name="password"
                        value={formData.password}
                        setValue={setFormValue("password")}
                        required
                        minLength={6}
                        disabled={loading}
                    />
                    {errors?.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                <Button label="Login" type="submit" disabled={loading} />
            </form>
        </GuestLayout>
    );
}
