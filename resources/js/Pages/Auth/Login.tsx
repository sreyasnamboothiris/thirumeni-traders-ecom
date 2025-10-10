import useCustomForm from "@/hooks/useCustomForm";
import GuestLayout from "@/Layouts/GuestLayout";
import Heading from "@/typography/Heading";
import Button from "@/ui/button/Button";
import Input from "@/ui/form/Input";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import useInertiaPost from "@/hooks/useInertiaPost";

export default function Login({ status, canResetPassword }: any) {
    const { formData, setFormValue } = useCustomForm({
        username: "",
        password: "",
    });

    const { post, loading, errors } = useInertiaPost(route("login"), {
        showErrorToast: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(formData);
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {/* Header */}
            <div className="mb-5 text-center">
                <Heading className="text-[1.75rem] font-extrabold text-gray-800 tracking-tight">
                    Welcome Back 👋
                </Heading>
                <p className="text-xs text-gray-500 mt-1">
                    Sign in to continue your journey with{" "}
                    <span className="font-semibold text-[#b07a2f]">
                        Thirumeni Traders
                    </span>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 font-medium">
                        Username
                    </label>
                    <Input
                        name="username"
                        value={formData.username}
                        setValue={setFormValue("username")}
                        required
                        minLength={3}
                        disabled={loading}
                        className="mt-0"
                    />
                    {errors?.username && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 font-medium">
                        Password
                    </label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        setValue={setFormValue("password")}
                        required
                        minLength={6}
                        disabled={loading}
                        className="mt-0"
                    />
                    {errors?.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {canResetPassword && (
                    <div className="text-right text-xs mt-1">
                        <a
                            href={route("password.request")}
                            className="text-[#b07a2f] hover:text-[#9b6621] font-medium transition-colors duration-200"
                        >
                            Forgot password?
                        </a>
                    </div>
                )}

                <Button
                    label={loading ? "Logging in..." : "Login"}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#b07a2f] hover:bg-[#9b6621] text-white font-semibold text-sm py-2.5 rounded-md shadow-sm transition-all duration-300"
                />
            </form>

            <p className="mt-5 text-center text-xs text-gray-500">
                Don’t have an account?{" "}
                <a
                    href={route("register")}
                    className="font-semibold text-[#b07a2f] hover:text-[#9b6621] transition-colors duration-200"
                >
                    Sign up
                </a>
            </p>
        </GuestLayout>
    );
}
