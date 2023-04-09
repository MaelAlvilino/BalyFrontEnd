import axios from "axios";

export const procurarDados = async (param: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/usuarios/${param}`);

    return response;
  } catch (err: any) {
    return err.response.data;
  }
};
