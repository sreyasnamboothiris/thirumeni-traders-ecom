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
import React, { useMemo, useState } from "react";

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
    const { formData, setFormValue } = useCustomForm({
        name: user?.name ?? "",
        username: user?.user?.username ?? "",
        email: user?.user?.email ?? "",
        password: "",
        confirmed_password: "",
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

    const { post, loading, errors } = useInertiaPost(route("temple.store"), {
        showErrorToast: true,
    });

    // localErrors allows you to set client-side validation messages if needed
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    /**
     * Helper: return the "best" error string for a given field name.
     * - checks localErrors first (client-side)
     * - checks errors (server-side). supports:
     *    errors.field => string | string[]
     *    errors["user.email"] => string[] (dotted names)
     *    errors.field[0]
     */
    const getError = (field: string) => {
        // client-side first
        if (localErrors && localErrors[field]) return localErrors[field];

        if (!errors) return undefined;

        // direct key
        const v = (errors as any)[field];
        if (v) {
            if (Array.isArray(v)) return String(v[0]);
            return String(v);
        }

        // try dotted-to-nested (e.g. errors.user?.email)
        // if server returned nested object: { user: { email: ["..."] } }
        try {
            const parts = field.split(".");
            let current: any = errors;
            for (const p of parts) {
                if (!current) {
                    current = undefined;
                    break;
                }
                current = current[p];
            }
            if (current) {
                if (Array.isArray(current)) return String(current[0]);
                return String(current);
            }
        } catch (e) {
            /* ignore */
        }

        // last resort: search for a key that endsWith field (e.g. "user.email" when field is "email")
        for (const k of Object.keys(errors)) {
            if (k.endsWith(`.${field}`) || k === field) {
                const val = (errors as any)[k];
                if (Array.isArray(val)) return String(val[0]);
                return String(val);
            }
        }

        return undefined;
    };

    // Example client-side validation stub (expand as you need)
    const validateBeforeSubmit = () => {
        const errs: Record<string, string> = {};
        if (!formData.name || String(formData.name).trim().length < 2) {
            errs["name"] = "Name must be at least 2 characters";
        }
        if (
            !formData.email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.email))
        ) {
            errs["email"] = "Please enter a valid email";
        }
        if (
            formData.password &&
            formData.password.length > 0 &&
            formData.password.length < 6
        ) {
            errs["password"] = "Password must be at least 6 characters";
        }
        setLocalErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalErrors({}); // clear previous local errors

        // run client-side validation; if fails, do not post
        const ok = validateBeforeSubmit();
        if (!ok) return;

        // post to server (useInertiaPost will populate `errors` if 422)
        post(formData);
    };

    return (
        <>
            <CardHeader title="Temple Create" />
            <CardContent>
                <form onSubmit={handleSubmit} noValidate>
                    <StrongText>Basic Details</StrongText>

                    <div className="flex gap-4 flex-col md:grid md:grid-cols-3 md:gap-4 p-8">
                        <div className="flex flex-col">
                            <Input
                                label="Name"
                                value={formData.name}
                                setValue={setFormValue("name")}
                            />
                            {getError("name") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("name")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Temple Email"
                                value={formData.email}
                                setValue={setFormValue("email")}
                            />
                            {getError("email") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("email")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Role"
                                value={formData.role}
                                setValue={setFormValue("role")}
                                disabled={true}
                            />
                            {getError("role") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("role")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Username"
                                value={formData.username}
                                setValue={setFormValue("username")}
                            />
                            {getError("username") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("username")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Password"
                                type="password"
                                value={formData.password}
                                setValue={setFormValue("password")}
                            />
                            {getError("password") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("password")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Confirm Password"
                                type="password"
                                value={formData.confirm_password}
                                setValue={setFormValue("confirm_password")}
                            />
                            {getError("confirm_password") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("confirm_password")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Phone"
                                value={formData.phone}
                                setValue={setFormValue("phone")}
                            />
                            {getError("phone") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("phone")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Secondary Phone"
                                value={formData.secondary_phone}
                                setValue={setFormValue("secondary_phone")}
                            />
                            {getError("secondary_phone") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("secondary_phone")}
                                </p>
                            )}
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
                            {getError("location") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("location")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <Input
                                label="Google Map Location"
                                value={formData.google_map_location}
                                setValue={setFormValue("google_map_location")}
                            />
                            {getError("google_map_location") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("google_map_location")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col p-6">
                        <TextArea
                            label="Address"
                            value={formData.address}
                            setValue={setFormValue("address")}
                        />
                        {getError("address") && (
                            <p className="text-sm text-red-600 mt-1">
                                {getError("address")}
                            </p>
                        )}
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
                            {getError("prathishta_month") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("prathishta_month")}
                                </p>
                            )}
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
                            {getError("prathishta_star") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("prathishta_star")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="md:grid md:grid-cols-2 gap-4 px-8 pt-4">
                        <div className="flex flex-col">
                            <DatePicker
                                label="Ulsavam Start Month"
                                value={formData.ulsavam_start_month}
                                setValue={setFormValue("ulsavam_start_month")}
                            />
                            {getError("ulsavam_start_month") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("ulsavam_start_month")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <DatePicker
                                label="Ulsavam End Month"
                                value={formData.ulsavam_end_month}
                                setValue={setFormValue("ulsavam_end_month")}
                            />
                            {getError("ulsavam_end_month") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("ulsavam_end_month")}
                                </p>
                            )}
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
                            {getError("ulsavam_start_star") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("ulsavam_start_star")}
                                </p>
                            )}
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
                            {getError("ulsavam_end_star") && (
                                <p className="text-sm text-red-600 mt-1">
                                    {getError("ulsavam_end_star")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <Button
                                type="submit"
                                label={loading ? "Submitting..." : "Submit"}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 border rounded text-sm"
                                onClick={() => {
                                    // simple reset — your useCustomForm might expose reset method if needed.
                                    window.location.reload();
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </>
    );
}
