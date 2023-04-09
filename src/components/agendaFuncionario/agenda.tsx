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
}
const Agendar: React.FC<PropsType> = ({ modal }) => {
  const [value, onChange] = useState(new Date());
  const [emailFuncionario, setEmailFuncionario] = useState("");
  const [cpf, setCpfPaciente] = useState("");

  const handleSendAgendamento = (e: any) => {
    let Data = ConverterData(value);
    console.log(Data);
    const agendamento = {
      email: emailFuncionario,
      cpf: cpf,
      data_hora: Data,
    };

    e.preventDefault();
    axios
      .post("http://localhost:5000/cadastrarAgendamento", agendamento)
      .then(() => {
        console.log("deu certo");
        modal(false);
        Swal.fire({
          icon: "success",
          text: `Agendamento criado com sucesso.`,
        });
      })
      .catch(() => {
        console.log("deu erro");
      });

    console.log(agendamento);
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
      <Calendar onChange={onChange} value={value} />
      <CadastrarAgendamento>
        <>
          <label>Insira o seu E-mail</label>
          <input
            type="text"
            onChange={(e) => setEmailFuncionario(e.target.value)}
          />
          <label>Insira o CPF do Paciente</label>
          <input type="text" onChange={(e) => setCpfPaciente(e.target.value)} />
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
