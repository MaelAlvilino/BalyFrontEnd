import axios from "axios";

export const ListarFormularios = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/listar_Formularios");

    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
