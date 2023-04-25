import { useEffect, useState } from "react";
import TopBar from "../top-bar/top-bar.component";
import Usuario from "../usuario/usuario-component";
import { procurarDados } from "../../services/ProcurarDados";

function Homepage() {
  const [user, setUser] = useState("");

  const receberDados = async () => {
    let usuario = localStorage.getItem("email");
    console.log(usuario);
    if(usuario){
      const response = await procurarDados(usuario);
      if(response){
        setUser(response.data) 
      }
    }
  console.log(user);

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
