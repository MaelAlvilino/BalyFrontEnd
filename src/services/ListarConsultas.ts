import axios from "axios";

export const ListarConsultas = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/listar_Agendamentos"
    );
    console.log(response.data);

    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
