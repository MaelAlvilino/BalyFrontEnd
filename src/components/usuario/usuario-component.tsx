import { useEffect, useState } from "react";
import { Modal } from "../homeModal";
import "../usuario/usuario-component.styles.css";
import { ListarProcedimentos } from "../../services/ListarProcedimentos";
import { mockBackend } from "../../services/mockBackend";
import { AlterarProcedimentos } from "./AlterarProcedimentos";
import { AlterarProcedimento } from "../../services/AlterarProcedimento";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/useAuth";
import { CommonOnly } from "../commonOnly/user_common";
import { useNavigate } from "react-router-dom";
import Banner from "../bannerComponente";
import { isAuthenticated } from "../../routes/auth";

type Card = {
  procedimento: string;
  descricao: string;
  imagem: string;
  title: string;
  subTitle: string;
  image: string;
  description: string;
  subDescription: string;
  value: string;
  id_Procedimento: string;
};
const Usuario: React.FC = () => {
  const {
    user: { email: user },
  } = useAuth();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  // const [currentCard, setCurrentCard] = useState<any | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  // const [cardList, setCardList] = useState<any>([]);
  const [cardList, setCardList] = useState<Card[]>([]);

  const [alterarImg, setAlterarImg] = useState("");
  const [alterarNome, setAlterarNome] = useState("");
  const [alterarDesc, setAlterarDesc] = useState("");
  const [alterarValue, setAlterarValue] = useState("");
  const [subDescript, setSubDescript] = useState("");

  useEffect(() => {
    chamar_procedimento();
  }, []);

  async function chamar_procedimento(): Promise<void> {
    const response = await ListarProcedimentos();
    // const resposta = mockBackend;
    // setCardList(resposta);
    if (response) {
      setCardList(response);
    } else {
      console.log("Procedimentos não encontrados");
    }
  }

  async function alterarProcedimento(e: any): Promise<void> {
    const ATUALIZAR_PROCEDIMENTO = {
      id_Procedimento: String(currentCard?.id_Procedimento),
      nome: alterarNome,
      tipo: alterarValue,
      Duração_mendia: "",
      descricao: alterarDesc,
      imagem: alterarImg,
    };

    const response = await AlterarProcedimento(ATUALIZAR_PROCEDIMENTO);
    if (response) {
      Swal.fire({
        icon: "success",
        text: `Agendamento criado com sucesso.`,
      });
    }
  }
  function AgendarProcedimento() {
    if (!isAuthenticated()) {
      Swal.fire({
        icon: "error",
        text: `Faça login para agendar.`,
      });
    } else {
      navigate("/forms");
    }
  }

  function openModal(item: any) {
    setCurrentCard(item);
    setShowModal(true);
  }

  return (
    <div className="home-container">
      <Banner />
      <div className="title">
        <span>Conheça</span>
        <span className="title_main">Nossos Serviços</span>
      </div>
      <div className="home-content">
        <div className="home-content-auction">
          {cardList &&
            cardList.length > 0 &&
            cardList.map((item: any, key: number) => (
              <div
                key={key}
                onClick={() => openModal(item)}
                className="home-auction-card"
              >
                <img src={item.imagem}></img>
                <h4>{item.procedimento}</h4>
                <span>{item.value} </span>
                <span>{item.value}</span>
              </div>
            ))}
        </div>
      </div>
      {showModal && currentCard && (
        <Modal
          header={currentCard?.title}
          setShowModal={setShowModal}
          cancelFunction={() => { }}
          confirmFunction={
            user === "admin@admin.com" || user === "user_funcionario"
              ? alterarProcedimento
              : AgendarProcedimento
          }
          loadingModal=""
          confirmText={
            user === "admin@admin.com" || user === "user_funcionario"
              ? "Atualizar Procedimento"
              : "Agendar Procedimento"
          }
        >
          {user === "admin@admin.com" || user === "user_funcionario" && (
            <AlterarProcedimentos>
              <div className="home-auction-card">
                <img src={currentCard?.imagem}></img>
                <label>Alterar Imagem</label>
                <input onChange={(e) => setAlterarImg(e.target.value)} />

                <label> Alterar nome do procedimento</label>
                <input onChange={(e) => setAlterarNome(e.target.value)} />
                <label>Alterar a descrição</label>
                <input onChange={(e) => setAlterarDesc(e.target.value)} />

                <label>Alterar o tipo</label>
                <input onChange={(e) => setAlterarValue(e.target.value)} />

                <label>Alterar a sub-descrição</label>
                <input onChange={(e) => setSubDescript(e.target.value)} />
              </div>
            </AlterarProcedimentos>
          )}
          <CommonOnly>
            <div className="home-auction-card">
              <img src={currentCard?.imagem}></img>
              <h4>{currentCard?.procedimento}</h4>
              <span>{currentCard.subDescription} </span>
              <span>{currentCard.value}</span>
              <a>{currentCard.descricao} </a>
            </div>
          </CommonOnly>
        </Modal>
      )}
    </div>
  );
};
export default Usuario;
