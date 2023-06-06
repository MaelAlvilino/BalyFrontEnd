import TopBar from "../top-bar/top-bar.component";
import Usuario from "../usuario/usuario-component";
import { AuthProvider } from "../../contexts/AuthContext";
import Consulta from "../realizarConsulta";

function Homepage() {
  return (
    <AuthProvider>
      <TopBar />
      <Usuario />
    </AuthProvider>
  );
}
export default Homepage;
