import axios from "axios";

export const AlterarProcedimento = async (param: object) => {
  try {
    const response = await axios.put(
      "http://127.0.0.1:5000/atualizarProcedimento",
      param
    );

    return response.data;
  } catch (err: any) {
    return err.response;
  }
};
