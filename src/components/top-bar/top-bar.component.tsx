import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buttons } from "./styles";
import React from "react";
import axios from "axios";
import Usuario from "../usuario/usuario-component";
import Dialog from "../modal/dialog.component";
import Agendar from "../agendaFuncionario/agenda";
import "./styles-teste.scss";
import CadProcedimento from "../cadProcedimento/cadProcedimento";

type Card = {
  title: string;
  subTitle: string;
  image: string;
  description: string;
  subDescription: string;
  value: string;
};

export default function TopBar() {
  const [showModa, setShowModa] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [auth, setAuth] = useState("");
  const [cardList, setCardList] = useState<Card[]>([]);
  const [teste, setTeste] = useState("");

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);
  /* useEffect(() => {
    const user: any = sessionStorage.getItem("auth");
    console.log(user);
    if (user) {
      setAuth(JSON.parse(user));
    }
  }, []); */

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

  const procurarDados = async (param: any) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/usuarios/${param}`
      );

      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const receberDados = async () => {
    var usuario = localStorage.getItem("email");

    const response = await procurarDados(usuario);

    if (response) {
      console.log(response);
      setData(response.data);
    } else {
      console.log("error");
    }
  };
  const AbrirDialog = () => {
    setShowDialog(true);
  };
  const AbrirDialog1 = () => {
    setShowDialog1(true);
  };
  useEffect(() => {
    receberDados();
    //setData("user_cliente");
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
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
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
                <span>Bem vindo(a),{data} </span>
                <Buttons onClick={signOut}>Sair</Buttons>{" "}
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
                <span>Bem vindo(a),{data} </span>
                <Buttons onClick={signOut}>Sair</Buttons>{" "}
              </>
            )}
            {data === "user_cliente" && (
              <>
                <span>Bem vindo(a), {data} </span>
                <Buttons onClick={signOut}>Sair</Buttons>{" "}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
