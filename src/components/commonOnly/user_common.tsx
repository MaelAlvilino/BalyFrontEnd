import { ReactNode } from "react";
import { useAuth } from "../../hook/useAuth";

type CommonOnlyProps = {
  children: ReactNode;
};

export function CommonOnly({ children }: CommonOnlyProps) {
  const {
    user: { email: user },
  } = useAuth();

  if (user === "user_cliente" || user === "") {
    return <>{children}</>;
  }

  return null;
}
