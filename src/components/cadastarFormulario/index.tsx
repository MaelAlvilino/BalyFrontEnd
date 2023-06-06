import { Outlet, useNavigate, useParams } from "react-router-dom";
import Banner from "../bannerComponente";
import Dialog from "../modal/dialog.component";
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
import Agendar from "../agendaFuncionario/agenda";
type T = {
  id_Formulario: string;
  nome: string
  email: string
  alergia: string
  cpfUSer: string
  data_hora: string
  comentario: string
  nome_procedimento: string
  cpf: number
}
export function Forms() {
  const {
    user: { email: user },
  } = useAuth();

  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [comentario, setComentario] = useState("")
  const [nome_proc, setNomeProc] = useState("")

  const [procedimentos, setProced] = useState<any>([]);

  const [nome, setNome] = useState('')
  const [nomeProcedimento, setNomeProcedimento] = useState('')
  const [cpfUSer, setCpfUser] = useState('')
  const [email, setEmail] = useState('')
  const [alergia, setAlergia] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [datahora, setDataHora] = useState('')
  const [cpf, setCpf] = useState("")
  const [data_hora, setData_hora] = useState("")

  function handleData() {
    const data = {
      data_hora: datahora,
      nome,
      cpf: cpfUSer,
      nome_procedimento: nomeProcedimento,
      comentario,
      alergia
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
  const handleConfirm = (comentario: string, nomeProcedimento: string, cpf: string, data_hora: string) => {
    openDialog(comentario, nomeProcedimento, cpf, data_hora)
  }

  const openDialog = (comentarios: string, nome_proc: string, cpf: string, data_hora: string) => {
    console.log(comentarios, nome_proc, cpf, "OPENDIEALOGS")
    setShowDialog(true);
    setComentarios(comentarios);
    setNomeProc(nome_proc);
    setCpf(cpf)
    setData_hora(data_hora)


  };

  const handleCancel = (hora: string, cpf: string, nome: string, comentario: string) => {

    const cancel = {
      data_hora: hora,
      email,
      cpf,
      nome_proc: nome,
      comentario_form: comentario
    }
    console.log(cancel)
    axios
      .post("http://localhost:5000/recusarFormulario", cancel)
      .then(() => {
        Swal.fire({
          icon: "success",
          text: `Formulário recusado com sucesso..`,
        });
      })
      .catch(() => {
        console.log("deu erro");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro interno :-(',
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

      <Dialog
        id="txt"
        size="30%"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        title="Agendamento"
      >
        <Agendar modal={setShowDialog} nome_proc={nome_proc}
          comentario_form={comentarios} cpfParam={cpf} dataHor={data_hora} />
      </Dialog>
      <CommonOnly>
        <CadastroFormContainer>
          <h1>Cadastrar Formulario </h1>
          <section className="form-container">
            <label>Nome</label>
            <input type="text" onChange={(e) => setNome(e.target.value)} />
            <label>Nome do Procedimento</label>
            <input type="text" onChange={(e) => setNomeProcedimento(e.target.value)} />
            <label>cpf</label>
            <input type="text" onChange={(e) => setCpfUser(e.target.value)} />
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
                  <p>{proced.cpf}</p>
                  <p>{proced.data_hora}</p>
                  <p>{proced.comentario}</p>
                  <button onClick={() => handleConfirm(proced.comentario, proced.nome_procedimento, String(proced.cpf), proced.data_hora)}>confirm</button>
                  <button onClick={() => handleCancel(proced.data_hora, String(proced.cpf), proced.nome_procedimento, proced.comentario)}>cancel</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AdminEmployee>
    </>
  );
}
