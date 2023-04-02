import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";
interface PropsType {
  modal: Function;
}
const CadProcedimento: React.FC<PropsType> = ({ modal }) => {
  const handleCloseModal = () => {
    modal(false);
  };

  return (
    <>
      <h1>HELLO WORLD!!</h1>
      <button onClick={handleCloseModal}> close modal</button>
    </>
  );
};
export default CadProcedimento;
