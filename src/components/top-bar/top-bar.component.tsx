import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../modal/dialog.component";
import Agendar from "../agendaFuncionario/agenda";
import "./styles-teste.scss";
import CadProcedimento from "../cadProcedimento/cadProcedimento";
import { isAuthenticated } from "../../routes/auth";
import { useAuth } from "../../hook/useAuth";


export default function TopBar() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);


  const {
    user: { email: user },
  } = useAuth();

  const signOut = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };
  const login = () => {
    navigate("/login");
  }
  const AbrirDialog = () => {
    setShowDialog(true);
  };
  const AbrirDialog1 = () => {
    setShowDialog1(true);
  };

  return (
    <>
      <header className="header">
        <Dialog
          id="txt"
          size="30%"
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          title="Agendamento" >
          <Agendar modal={setShowDialog} nome_proc={""} comentario_form={""} cpfParam={""} dataHor="" />
        </Dialog>
        <Dialog
          id="txt"
          size="30%"
          showDialog={showDialog1}
          setShowDialog={setShowDialog1}
          title="Cadastrar Procedimento" >
          <CadProcedimento modal={setShowDialog1} />
        </Dialog>
        <div className="header__content">
          <p className="header__content__logo">Baly</p>
          <nav className={`${"header__content__nav"}`}>
            <ul>
              {!isAuthenticated() ? (
                <>
                  <li>
                    <Link to={"/home"}>Pagina inicial</Link>
                  </li>
                  <button onClick={login}>Login</button>{" "}
                </>
              ) : (
                <>
                  {user === "admin@admin.com" && (
                    <>
                      <li>
                        <Link to={"/home"}>Pagina inicial</Link>
                      </li>
                      <li>
                        <Link to={"/forms"}>Formulários</Link>
                      </li>
                      <li>
                        <Link to="/cadastrarFuncionario">Cadastrar Funcionário</Link>
                      </li>
                      <li>
                        <Link onClick={AbrirDialog} to={""}>
                          Agendar
                        </Link>
                      </li>
                      <li>
                        <Link onClick={AbrirDialog1} to="">
                          Cadastrar Procedimento
                        </Link>
                      </li>
                      <li>Bem-vindo(a), {user} </li>
                      <button onClick={signOut}>Sair</button>{" "}
                    </>
                  )}
                  {user === "user_funcionario" && (
                    <>
                      <li>
                        <Link to={"/home"}>Pagina inicial</Link>
                      </li>
                      <li>
                        <Link onClick={AbrirDialog} to={""}>
                          Agendamento
                        </Link>
                      </li>
                      <li>
                        <Link to={"/forms"}>Formulários</Link>
                      </li>
                      <li>
                        <Link to={"/consulta"}>Consultar</Link>
                      </li>
                      <li>
                        <Link to={"/historicoConsulta"}>Historico</Link>
                      </li>

                      <li>
                        <Link onClick={AbrirDialog1} to="">
                          Cadastrar Procedimentos
                        </Link>
                      </li>
                      <li>Bem-vindo(a), {user} </li>
                      <button onClick={signOut}>Sair</button>{" "}
                    </>
                  )}
                  {user === "user_cliente" && (
                    <>
                      <li>
                        <Link to={"/home"}>Pagina inicial</Link>
                      </li>
                      <li>Bem-vindo(a), {user} </li>
                      <button onClick={signOut}>Sair</button>{" "}
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </header></>
  );
}
