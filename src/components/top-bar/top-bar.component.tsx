import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../modal/dialog.component";
import Agendar from "../agendaFuncionario/agenda";
import "./styles-teste.scss";
import CadProcedimento from "../cadProcedimento/cadProcedimento";
import { procurarDados } from "../../services/ProcurarDados";

export default function TopBar() {
  const [auth, setAuth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Usuario = localStorage.getItem("email");
    if (Usuario) {
      setAuth(Usuario);
    }
  });

  const signOut = () => {
    localStorage.removeItem("email");
    navigate("/login");
    //setAuth(null);
  };

  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);

  const [data, setData] = useState("");

  const receberDados = async () => {
    var usuario = localStorage.getItem("email");
    if (usuario) {
      const response = await procurarDados(usuario);
      if (response) {
        setData(response.data);
      } else {
        console.log("error");
      }
    }
  };
  const AbrirDialog = () => {
    setShowDialog(true);
  };
  const AbrirDialog1 = () => {
    setShowDialog1(true);
  };
  useEffect(() => {
    // receberDados();
    setData("admin@admin.com");
  }, []);
  return (
    <header className="header">
      <Dialog
        id="txt"
        size="30%"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        title="Agendamento"
      >
        <Agendar modal={setShowDialog} />
      </Dialog>
      <Dialog
        id="txt"
        size="30%"
        showDialog={showDialog1}
        setShowDialog={setShowDialog1}
        title="Cadastrar Procedimento"
      >
        <CadProcedimento modal={setShowDialog1} />
      </Dialog>
      <div className="header__content">
        <p className="header__content__logo">Baly</p>
        <nav className={`${"header__content__nav"}`}>
          <ul>
            <li>
              <Link to={"/home"}>Home Page</Link>
            </li>
            {data === "admin@admin.com" && (
              <>
                <li>
                  <Link to="/cadastrarFuncionario">Cadastrar Funcionario</Link>
                </li>
                <li>
                  <Link onClick={AbrirDialog} to={""}>
                    Realizar Agendamento
                  </Link>
                </li>
                <li>
                  <Link onClick={AbrirDialog1} to="">
                    Cadastrar Procedimento
                  </Link>
                </li>
                <li>Bem vindo(a),{data} </li>
                <button onClick={signOut}>Sair</button>{" "}
              </>
            )}
            {data === "user_funcionario" && (
              <>
                <li>
                  <Link onClick={AbrirDialog} to={""}>
                    Realizar Agendamento
                  </Link>
                </li>
                <li>
                  <Link onClick={AbrirDialog1} to="">
                    Cadastrar Procedimento
                  </Link>
                </li>
                <li>Bem vindo(a),{data} </li>
                <button onClick={signOut}>Sair</button>{" "}
              </>
            )}
            {data === "user_cliente" && (
              <>
                <li>Bem vindo(a), {data} </li>
                <button onClick={signOut}>Sair</button>{" "}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
