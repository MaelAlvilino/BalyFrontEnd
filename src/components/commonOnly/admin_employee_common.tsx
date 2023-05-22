import { ReactNode } from "react";
import { useAuth } from "../../hook/useAuth";

type CommonOnlyProps = {
    children: ReactNode;
};

export function AdminEmployee({ children }: CommonOnlyProps) {
    const {
        user: { email: user },
    } = useAuth();

    if (user === "admin@admin.com" || user === "user_funcionario") {
        return <>{children}</>;
    }

    return null;
}
