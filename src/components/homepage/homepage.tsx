import { useEffect, useState } from "react";
import TopBar from "../top-bar/top-bar.component";
import Usuario from "../usuario/usuario-component";

function Homepage() {
  const [user, setUser] = useState("");

  const receberDados = async () => {
    let usuario = localStorage.getItem("email");
    console.log(usuario);

    if (usuario) {
      setUser(usuario);
      //setUser("user_cliente");
    } else {
      console.log("Usuario sem autenticação");
    }
  };
  useEffect(() => {
    receberDados();
  }, []);
  return (
    <>
      <TopBar />
      <Usuario user={user} />
    </>
  );
}
export default Homepage;
