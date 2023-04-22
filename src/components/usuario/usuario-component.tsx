import { useEffect, useState } from "react";
import { Modal } from "../homeModal";
import "../usuario/usuario-component.styles.css";
import bannerEstetica1 from "../../assets/estetica-banner1.jpg";
import { ListarProcedimentos } from "../../services/ListarProcedimentos";
import { mockBackend } from "../../services/mockBackend";
import { AlterarProcedimentos } from "./AlterarProcedimentos";
import { AlterarProcedimento } from "../../services/AlterarProcedimento";

// type Card = {
//   procedimento: string;
//   descricao: string;
//   imagem: string;
//   title: string;
//   subTitle: string;
//   image: string;
//   description: string;
//   subDescription: string;
//   value: string;
// };
interface T {
  user: string;
}
const Usuario: React.FC<T> = ({ user }) => {
  // const [cardList, setCardList] = useState<Card[]>([]);
  const [cardList, setCardList] = useState<any>([]);

  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState<any | null>(null);
  // const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const [subDescript, setSubDescript] = useState("");

  useEffect(() => {
    chamar_procedimento();
  }, []);

  async function chamar_procedimento(): Promise<void> {
    const response = await ListarProcedimentos();
    const resposta = mockBackend;
    setCardList(resposta);
    if (response) {
      setCardList(response);
    } else {
      console.log("Procedimentos não encontrados");
    }
  }

  //todo implementar função e alterar css
  async function alterarProcedimento(): Promise<void> {
    const response = await AlterarProcedimento();
  }

  function openModal(item: any) {
    setCurrentCard(item);
    setShowModal(true);
  }
  return (
    <div className="home-container">
      <div className="slider">
        <img id="img-1" src={bannerEstetica1} alt="Image 1" />
      </div>
      <h1>sub title to do</h1>
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
          cancelFunction={() => {}}
          confirmFunction={() => {}}
          loadingModal=""
          confirmText="Agendar Procedimento"
        >
          {user === "admin@admin.com" && (
            <>
              <AlterarProcedimentos>
                <div className="home-auction-card">
                  <img src={currentCard?.imagem}></img>
                  <label>Alterar Imagem</label>
                  <input />

                  {/* <h4>{currentCard?.procedimento}</h4> */}
                  <label> Alterar nome do Procedimento</label>
                  <input value={currentCard?.procedimento} />

                  {/* <a>{currentCard.descricao} </a> */}
                  <label>Alterar a descrição</label>
                  <input value={currentCard?.descricao} />

                  {/* <span>{currentCard.value}</span> */}
                  <label>Alterar X</label>
                  <input value={currentCard?.value} />

                  {/* <span>{currentCard.subDescription} </span> */}
                  <label>Alterar a SubDescrição</label>
                  <input
                    type="text"
                    value={currentCard?.subDescription}
                    onChange={(e) => setSubDescript(e.target.value)}
                  />
                </div>
              </AlterarProcedimentos>
            </>
          )}
          :{" "}
          {user === "user_cliente" && (
            <div className="home-auction-card">
              <img src={currentCard?.imagem}></img>
              <h4>{currentCard?.procedimento}</h4>
              <span>{currentCard.subDescription} </span>
              <span>{currentCard.value}</span>
              <a>{currentCard.descricao} </a>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
export default Usuario;
