import { useEffect, useState, } from "react";
import { Outlet } from "react-router";
import Banner from "../bannerComponente";
import './styles.css';
import { ListarConsultas } from "../../services/ListarConsultas";
import axios from "axios";
import Swal from "sweetalert2";

type T = {
    comentario_form: string;
    cpf_cliente: number;
    data_hora: string
    email_func: string;
    id_Agenda: number
    nome_proc: string;
    status: string;
}

export default function Consulta() {

    const [consultas, setConsultas] = useState<any>([]);


    const handleConfirm = (data_hora: any, email: any, cpf: any, nome_proc: any, comentario_form: any) => {

        const data = {
            data_hora,
            email,
            cpf: String(cpf),
            nome_proc,
            comentario_form
        }
        axios
            .post(`http://127.0.0.1:5000/cadastrarConsulta`, data)
            .then(() => {
                Swal.fire({
                    title: 'Consulta confirmada com sucesso',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK!'
                }).then((result) => {
                    window.location.reload();
                })
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Erro ao confirmar a consulta.',
                })
            });

    }
    const buscarAgendamentos = async () => {

        const response = await ListarConsultas()
        console.log(response)
        if (response) {
            setConsultas(response)
        }
        console.log("##### BUSCANDO AGENDAMENTOS ###### ")
    }

    useEffect(() => {
        buscarAgendamentos();
    }, []);
    return (
        <>
            <Outlet />
            <Banner />
            <section className="container">
                <div className="posts">
                    {consultas.map((c: T) => (
                        <div key={c.id_Agenda} className="post">
                            <div className="post-content">
                                <h1>{c.nome_proc}</h1>
                                <h2>{c.email_func}</h2>
                                <p>{c.cpf_cliente}</p>
                                <p>{c.comentario_form}</p>
                                <p>{c.data_hora}</p>

                                <button onClick={() => handleConfirm(c.data_hora, c.email_func, c.cpf_cliente, c.nome_proc, c.comentario_form)}>confirm</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
        </>
    )
}