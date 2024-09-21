import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  //declara a variavel para recever os registros retornados da api.
  const [data, setData] = useState([]);
  //declara a variavel para recever o numero de paginas
  const [page, setPage] = useState("");
  //declara a variavel para recever o numero da ultima pagina
  const [lastPage, setLastPage] = useState("");
  //declara a variavel para receber a mensagem
  const [message, setMessage] = useState("");

  //cria a função com requisiçao para api recuperar usuarios
  const getUsers = async (page) => {
    //verifica se o parametro é indefinido, caso seja, atribuir a pagina 1.
    if (page === undefined) {
      page = 1;
    }
    setPage(page);

    //realiza a requisição para api com axios para a rota listar usuarios.
    await axios
      .get("http://localhost:8080/users?page=" + page)
      //acessa o then quando a api retornar status 200
      .then((response) => {
        //atribui os registros no state data
        setData(response.data.users);
        //atribui a ultima pagina
        setLastPage(response.data.pagination.lastPage);
      })
      //acessa  o catch quando a api retornar erro
      .catch((err) => {
        if (err.response) {
          //atribui a mensagem no state message

          setMessage(err.response.data.mensagem);
        } else {
          //atribui a mensagem no state message
          setMessage("Erro: tente mais tarde.");
        }
      });
  };

  //useEffect é usado para lidar com efeitos colaterais em um componente. por exemplo, o estado do componetente, fazer chamada a apis, manipular eventos entre outros.
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href={"/cadastrar"}>
          <button type="button">Cadastrar</button>
        </Link>
        <h2>Listar Usuário</h2>
        {message ? <p>{message}</p> : ""}
        {data.map((user) => (
          <div key={user.id}>
            <spam>ID: {user.id}</spam>
            <br />
            <spam>Nome: {user.name}</spam>
            <br />
            <spam>E-mail: {user.email}</spam>
            <br />
            <Link href={`/visualizar/${user.id}`}>
              <button type="button">Visualizar</button>
            </Link>{" "}
            <Link href={`/editar/${user.id}`}>
              <button type="button">Editar</button>
            </Link>{" "}
            <button type="button">Apagar</button> <hr />
            <br />
            <hr />
          </div>
        ))}
        {page !== 1 ? (
          <button type="button" onClick={() => getUsers(1)}>
            Primeira
          </button>
        ) : (
          <button type="button" disabled>
            Primeira
          </button>
        )}{" "}
        {page !== 1 ? (
          <button type="button" onClick={() => getUsers(page - 1)}>
            {page - 1}
          </button>
        ) : (
          ""
        )}{" "}
        <button type="button" disabled>
          {page}
        </button>{" "}
        {page + 1 <= lastPage ? (
          <button type="button" onClick={() => getUsers(page + 1)}>
            {page + 1}
          </button>
        ) : (
          ""
        )}{" "}
        {page !== lastPage ? (
          <button type="button" onClick={() => getUsers(lastPage)}>
            Última
          </button>
        ) : (
          <button type="button" disabled>
            Última
          </button>
        )}{" "}
        <br />
        <br />
      </main>
    </>
  );
}
