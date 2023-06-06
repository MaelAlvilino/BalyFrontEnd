import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Agendar from "../components/agendaFuncionario/agenda";
import CadastroFuncionario from "../components/cadastroFuncionario/cadastro.funcionario";
import Cadastro from "../components/cadastroUsuario/cadastro";
import Homepage from "../components/homepage/homepage";
import Login from "../components/login/login";
import { Forms } from "../components/cadastarFormulario";
import TopBar from "../components/top-bar/top-bar.component";
import { isAuthenticated } from "./auth";
import Consulta from "../components/realizarConsulta";
import HistoricoConsulta from "../components/historicoConsulta";
// import { ProcedimentosForm } from "../components/ListarProcedimento";

export default function Rotas() {
  const history = createBrowserHistory()
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={"/home"} />} />

        {!isAuthenticated() ? (
          <>
            <Route path="*" element={<Navigate to={"/home"} />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastroUsuario" element={<Cadastro />} />
            {history.location.pathname !== "/cadastro" && (
              <Route path="/login" element={<Login />} />
            )}
          </>
        ) : (
          <>
            <Route path="/home" element={<Homepage />} />
            <Route path="/cadastrarFuncionario" element={<CadastroFuncionario />} />
            <Route path="/agenda" element={<Agendar />} />
            <Route path="/forms" element={<Forms />}>
              <Route path="/forms" element={<TopBar />} />
            </Route>
            <Route path="/consulta" element={<Consulta />}>
              <Route path="/consulta" element={<TopBar />} />
            </Route>
            <Route path="/historicoConsulta" element={<HistoricoConsulta />}>
              <Route path="/historicoConsulta" element={<TopBar />} />
            </Route>
          </>
        )}

      </Routes>
    </Router>
  );
}