import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";

import { Tooltip } from "@mui/material";
import { CadastroFormButton } from "../cadastroFuncionario/cadastro.funcionario.styles";
import React from "react";
import {
  CadastrarProcedimento,
  CadastrarProcedimentoFooter,
} from "./cadastrarProcedimento.styles";

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
      <CadastrarProcedimento>
        <div>
          <label>Nome do Procedimento</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setNomeProcedimento(e.target.value)}
          />
        </div>

        <div>
          <label>Tipo do Procedimento</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setTipoProcedimento(e.target.value)}
          />
        </div>

        <div>
          <label>Duração media do Procedimento</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setDuracaoProcedimento(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição da Imagem</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setDescricaoProcedimento(e.target.value)}
          />
        </div>

        {/* https://live.staticflickr.com/65535/52739160496_0e6536e04c_z.jpg */}
        <div>
          <label>
            URL da
            <Tooltip title="Fazer o upload da imagem no site X">
              <a> Imagem</a>
            </Tooltip>
          </label>
        </div>
        <div>
          <input type="text" onChange={(e) => setUrlImagem(e.target.value)} />
        </div>
      </CadastrarProcedimento>

      <CadastrarProcedimentoFooter>
        <CadastroFormButton onClick={handleSendProc}>
          {" "}
          Cadastrar
        </CadastroFormButton>
        <CadastroFormButton onClick={handleCloseModal}>
          {" "}
          Cancelar
        </CadastroFormButton>
      </CadastrarProcedimentoFooter>
    </>
  );
};
export default CadProcedimento;
