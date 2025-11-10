import { User } from "@/interfaces/data_interfaces";

export default function ProfileShowPage({ user }: { user: User }) {
    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    );
}
