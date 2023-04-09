import { useEffect, useState } from "react";
import { Modal } from "../homeModal";
import "../usuario/usuario-component.styles.css";
import bannerEstetica1 from "../../assets/estetica-banner1.jpg";
import { ListarProcedimentos } from "../../services/ListarProcedimentos";

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
};
function Usuario() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  useEffect(() => {
    chamar_procedimento();
  }, []);

  async function chamar_procedimento() {
    const response = await ListarProcedimentos();
    if (response) {
      setCardList(response);
    } else {
      console.log("Procedimentos não encontrados");
    }
  }

  function openModal(item: Card) {
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
            cardList.map((item: Card, key: number) => (
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
          <div className="home-auction-card">
            <img src={currentCard?.imagem}></img>
            <h4>{currentCard?.procedimento}</h4>
            <span>{currentCard.subDescription} </span>
            <span>{currentCard.value}</span>
            <a>{currentCard.descricao} </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Usuario;
