import axios from "axios";
import { useEffect, useState } from "react";
import { mockBackend } from "../../services/mockBackend";
import Estetica from "../../assets/Estetica.jpg";
import { Modal } from "../homeModal";
import TopBar from "../top-bar/top-bar.component";
import "../usuario/usuario-component.styles.css";
import bannerEstetica from "../../assets/estetica-banner.jpg";
import bannerEstetica1 from "../../assets/estetica-banner1.jpg";

type Card = {
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
    const response = mockBackend;
    if (response && response.length > 0) {
      setCardList(response);
    }
  }, []);

  function openModal(item: Card) {
    setCurrentCard(item);
    setShowModal(true);
  }
  function emptyFunc(params: any) {
    console.log("error");
  }

  let imgs = document.querySelectorAll(".slider img");
  let dots = document.querySelectorAll(".dot");
  let currentImg = 0; // index of the first image
  const interval = 3000; // duration(speed) of the slide
  let timer = setInterval(changeSlide, interval);

  function changeSlide(n: number) {
    for (let i = 0; i < imgs.length; i++) {
      (imgs[i] as HTMLElement).style.opacity = "0%";
      dots[i].className = dots[i].className.replace(" active", "");
    }

    currentImg = (currentImg + 1) % imgs.length;

    if (n != undefined) {
      clearInterval(timer);
      timer = setInterval(changeSlide, interval);
      currentImg = n;
    }

    (imgs[currentImg] as HTMLElement).style.opacity = "100%";
    dots[currentImg].className += " active";
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
                <img src={Estetica}></img>
                <h4>{item.subTitle}</h4>
                <span>{item.description} </span>
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
            <img src={Estetica}></img>
            <h4>{currentCard?.subTitle}</h4>
            <span>{currentCard.subDescription} </span>
            <span>{currentCard.value}</span>
            <a>{currentCard.description} </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Usuario;
