import { Outlet, useNavigate, useParams } from "react-router-dom";
import Banner from "../bannerComponente";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListarFormularios } from "../../services/ListarFormularios";
import './styles.css';
import { useAuth } from "../../hook/useAuth";
import { CadastroFormContainer } from "../cadastroFuncionario/cadastro.funcionario.styles";
import { MOCK_BACKEND_FORMULARIO } from "../../services/mockBackend";
import { AdminEmployee } from "../commonOnly/admin_employee_common";
import { CommonOnly } from "../commonOnly/user_common";
import Swal from "sweetalert2";
// import * as S from "./styles";
type T = {
  id_Formulario: string;
  nome: string
  email: string
  alergia: string
  telefone: string
  data_hora: string
  comentario: string
}
export function Forms() {
  const {
    user: { email: user },
  } = useAuth();

  const navigate = useNavigate();

  const [procedimentos, setProced] = useState<any>([]);

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [alergia, setAlergia] = useState('')
  const [comentario, setComentario] = useState('')
  const [datahora, setDataHora] = useState('')

  function handleData() {
    const data = {
      nome,
      sobrenome,
      telefone,
      alergia,
      comentario,
      data_hora: datahora,
    }

    axios
      .post(`http://127.0.0.1:5000/cadastrarFormulario/${email}`, data)
      .then(() => {
        Swal.fire({
          title: 'Formulario enviado com Sucesso!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        }).then((result) => {
          navigate("/home");
        })
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao enviar o Formulario.',
        })
      });
  }

  async function handleGetData() {
    let usuario = localStorage.getItem("email");
    if (usuario) {
      setEmail(usuario)
    }
    const mock = MOCK_BACKEND_FORMULARIO
    const response = await ListarFormularios()
    if (response) {
      setProced(response);
    } else {
      setProced(mock);
      console.log("Procedimentos não encontrados");
    }
  }
  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <>
      <Outlet />
      <Banner />
      {/* <S.Root>
          <S.Trigger>Um botão</S.Trigger>
          <S.Portal>
            <S.Overlay />
            <S.Content>
              <S.Title>Title</S.Title>
              <S.Description>Description</S.Description>
              <S.Close>X</S.Close>
              <button>Confirmar</button>
            </S.Content>
          </S.Portal>
        </S.Root> */}
      <CommonOnly>
        <CadastroFormContainer>
          <h1>Cadastrar Formulario </h1>
          <section className="form-container">
            <label>Nome</label>
            <input type="text" onChange={(e) => setNome(e.target.value)} />
            <label>Sobrenome</label>
            <input type="text" onChange={(e) => setSobrenome(e.target.value)} />
            <label>telefone</label>
            <input type="text" onChange={(e) => setTelefone(e.target.value)} />
            <label>alergia</label>
            <input type="text" onChange={(e) => setAlergia(e.target.value)} />
            <label>comentario</label>
            <input type="text" onChange={(e) => setComentario(e.target.value)} />
            <label>data/hora</label>
            <input type="text" onChange={(e) => setDataHora(e.target.value)} />
            <div>
              <button className="button" onClick={handleData}>Enviar</button>
            </div>
          </section>
        </CadastroFormContainer>
      </CommonOnly>
      <AdminEmployee>
        <section className="container">
          <div className="posts">
            {procedimentos.map((proced: T) => (
              <div key={proced.id_Formulario} className="post">
                <div className="post-content">
                  <h1>{proced.nome}</h1>
                  <h2>{proced.alergia}</h2>
                  <p>{proced.telefone}</p>
                  <p>{proced.data_hora}</p>
                  <p>{proced.comentario}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AdminEmployee>
    </>
  );
}
