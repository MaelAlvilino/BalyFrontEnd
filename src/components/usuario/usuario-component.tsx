import axios from "axios";
import { useEffect, useState } from "react";
import { mockBackend } from "../../services/mockBackend";
import Estetica from "../../assets/Estetica.jpg";
import { Modal } from "../homeModal";
import TopBar from "../top-bar/top-bar.component";
import "../usuario/usuario-component.styles.css";
import bannerEstetica from "../../assets/estetica-banner.jpg";
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

  const imgs = document.querySelectorAll(
    ".slider img"
  ) as NodeListOf<HTMLElement>;

  const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLSpanElement>;

  let currentImg = 0;
  const interval = 3000;
  let timer = setInterval(changeSlide, interval);

  function changeSlide(n?: number) {
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].style) {
        imgs[i].style.opacity = "0%";
      }
      dots[i].classList.remove("active");
    }

    currentImg = (currentImg + 1) % imgs.length;

    if (n !== undefined) {
      clearInterval(timer);
      timer = setInterval(changeSlide, interval);
      currentImg = n;
    }

    if (imgs[currentImg] && dots[currentImg]) {
      imgs[currentImg].style.opacity = "100%";
      dots[currentImg].classList.add("active");
    }
  }

  return (
    <div className="home-container">
      <div className="slider">
        <img id="img-1" src={bannerEstetica1} alt="Image 1" />
        <img id="img-2" src={bannerEstetica} alt="Image 2" />
      </div>
      <div className="navigation-button">
        <span className="dot active" onClick={() => changeSlide(0)}></span>
        <span className="dot" onClick={() => changeSlide(1)}></span>
      </div>
      <h1>sub title</h1>
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
