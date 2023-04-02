import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";
interface PropsType {
  modal: Function;
}
const CadProcedimento: React.FC<PropsType> = ({ modal }) => {
  const [nomeProcedimento, setNomeProcedimento] = useState("");
  const [tipoProcedimento, setTipoProcedimento] = useState("");
  const [duracaoProcedimento, setDuracaoProcedimento] = useState("");
  const [descricaoProcedimento, setDescricaoProcedimento] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  const handleCloseModal = () => {
    modal(false);
  };

  const handleSendProc = (e: any) => {
    const procedimento = {
      nome: nomeProcedimento,
      tipo: tipoProcedimento,
      duração_media: duracaoProcedimento,
      descricao: descricaoProcedimento,
      imagem: urlImagem,
    };

    e.preventDefault();
    axios
      .post("http://localhost:5000/cadastroProcedimento", procedimento)
      .then(() => {
        console.log("deu certo");
        modal(false);
        Swal.fire({
          icon: "success",
          text: `Procedimento criado com sucesso.`,
        });
      })
      .catch(() => {
        console.log("deu erro");
      });

    console.log(procedimento);
  };

  return (
    <>
      <h1>HELLO WORLD!!</h1>
      {/* nome do procedimentop */}
      <label>nome</label>
      <input onChange={(e) => setNomeProcedimento(e.target.value)} />
      <br />
      {/* tipo do procedimento */}
      <label>tipo</label>
      <input onChange={(e) => setTipoProcedimento(e.target.value)} />
      <br />

      {/* duração media do procedimento */}
      <label>dura</label>
      <input onChange={(e) => setDuracaoProcedimento(e.target.value)} />
      <br />

      {/* descricao da imagem */}
      <label>descricao</label>
      <input onChange={(e) => setDescricaoProcedimento(e.target.value)} />
      <br />

      {/* url da imagem */}
      {/* https://live.staticflickr.com/65535/52739160496_0e6536e04c_z.jpg */}
      <label>imagem</label>
      <input onChange={(e) => setUrlImagem(e.target.value)} />
      <br />

      <button onClick={handleSendProc}> Enviar Proc</button>
      <button onClick={handleCloseModal}> close modal</button>
    </>
  );
};
export default CadProcedimento;
