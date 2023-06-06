import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Buttons,
  CadastrarAgendamento,
  CadastrarAgendamentoFooter,
} from "./agenda.styles";
interface PropsType {
  modal: Function;
  nome_proc: string;
  comentario_form: string;
  cpfParam: string;
  dataHor: string;
}
const Agendar: React.FC<PropsType> = ({ modal, nome_proc, comentario_form, cpfParam, dataHor }) => {
  const [value, setHora] = useState(new Date());
  const [emailFuncionario, setEmailFuncionario] = useState("");

  const handleSendAgendamento = (e: any) => {
    let hor = new Date();

    const agendamento = {
      email: emailFuncionario,
      cpf: cpfParam,
      data_hora: dataHor,
      nome_proc,
      comentario_form
    };
    console.log(agendamento);


    e.preventDefault();
    axios
      .post("http://localhost:5000/cadastrarAgendamento", agendamento)
      .then(() => {
        modal(false);
        Swal.fire({
          icon: "success",
          text: `Agendamento criado com sucesso.`,
        });
      })
      .catch(() => {
        console.log("deu erro");
      });

  };
  const handleCloseModal = () => {
    modal(false);
  };

  function ConverterData(value: Date) {
    let data = String(value).substring(4, 15);
    return data;
  }

  return (
    <>
      {/* <Calendar onChange={setHora} value={value} /> */}
      <CadastrarAgendamento>
        <>
          <label>Insira o seu E-mail</label>
          <input
            type="text"
            onChange={(e) => setEmailFuncionario(e.target.value)}
          />
          <label>CPF do Paciente</label>
          <input type="text" defaultValue={cpfParam} />
        </>
      </CadastrarAgendamento>
      <CadastrarAgendamentoFooter>
        <Buttons onClick={handleSendAgendamento}>Agendar</Buttons>
        <Buttons onClick={handleCloseModal}>Cancelar</Buttons>
      </CadastrarAgendamentoFooter>
    </>
  );
};
export default Agendar;
