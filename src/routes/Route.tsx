import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Form,
  Outlet,
} from "react-router-dom";
import Agendar from "../components/agendaFuncionario/agenda";
import CadastroFuncionario from "../components/cadastroFuncionario/cadastro.funcionario";
import Cadastro from "../components/cadastroUsuario/cadastro";
import Homepage from "../components/homepage/homepage";
import Login from "../components/login/login";
import { Forms } from "../components/cadastarFormulario/form";
import TopBar from "../components/top-bar/top-bar.component";

export default function Rotinhas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={"/login"} />} />
        <Route path="/cadastroUsuario" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cadastrarFuncionario" element={<CadastroFuncionario />} />
        <Route path="/agenda" element={<Agendar />} />
        <Route path="/:id" element={<Forms />}>
          <Route path="/:id/agendar" element={<TopBar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
