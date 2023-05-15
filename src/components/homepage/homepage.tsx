import TopBar from "../top-bar/top-bar.component";
import Usuario from "../usuario/usuario-component";
import { Forms } from "../cadastarFormulario/form";
import { AuthProvider } from "../../contexts/AuthContext";

function Homepage() {
  return (
    <AuthProvider>
      <TopBar />
      <Usuario />
    </AuthProvider>
  );
}
export default Homepage;
