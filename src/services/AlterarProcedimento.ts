import axios from "axios";

export const AlterarProcedimento = async () => {
  try {
    const response = await axios.patch(
      "http://127.0.0.1:5000/atualizarProcedimento"
    );

    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
