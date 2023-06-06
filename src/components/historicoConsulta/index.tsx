import { Outlet } from "react-router";
import Banner from "../bannerComponente";
import { useEffect, useState, } from "react";
import { ListarHistoricoAgendamento } from "../../services/historicoConsulta";


type T = {
    comentario_form: string;
    cpf_cliente: number;
    data_hora: string
    email_func: string;
    id_Consulta: number
    nome_proc: string;
    status: string;
}


export default function HistoricoConsulta() {
    const [consultas, setConsultas] = useState<any>([]);

    const buscarAgendamentos = async () => {


        const response = await ListarHistoricoAgendamento()
        console.log(response)
        if (response) {
            setConsultas(response)
        }
        console.log("##### BUSCANDO HISTORICO CONSULTA ###### ")
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
                        <div key={c.id_Consulta} className="post">
                            <div className="post-content">
                                <h1>{c.nome_proc}</h1>
                                <h2>{c.email_func}</h2>
                                <p>{c.cpf_cliente}</p>
                                <p>{c.comentario_form}</p>
                                <p>{c.data_hora}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
        </>
    )
}