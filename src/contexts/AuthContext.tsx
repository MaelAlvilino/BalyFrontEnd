import { ReactNode, createContext, useEffect, useState } from "react";
import { procurarDados } from "../services/ProcurarDados";

type User = {
  email: string;
};

type TAuthContext = {
  user: User;
};

export const AuthContext = createContext({} as TAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    email: "",
  });

  const receberDados = async () => {
    let usuario = localStorage.getItem("email");
    console.log(usuario);
    if (usuario) {
      const response = await procurarDados(usuario);
      if (response) {
        setUser(response.data);
      }
    }
    console.log(user);
  };

  useEffect(() => {
    // receberDados();
    setUser({
      email: "admin@admin.com",
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
