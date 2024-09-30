import axios from "axios";

export const servDelete = async (url) => {
  var mensagem;

  await axios
    .delete(url)
    .then((response) => {
      mensagem = response.data.mensagem;
    })
    .catch((err) => {
      if (err.response) {
        setMessage(err.response.data.mensagem);
      } else {
        setMessage("Erro: tente novamente mais tarde...");
      }
    });

  return mensagem;
};
