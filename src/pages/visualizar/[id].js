import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Nav, Navbar, Form } from "react-bootstrap";

export default function Visualizar() {
  //declara a variavel para receber o registro retornado da api
  const [data, setData] = useState([]);

  //declara a variavel para receber a mensagem
  const [message, setMessage] = useState("");

  //recebe o parametro enviado na url
  const router = useRouter();
  console.log(router.query.id);
  const [id] = useState(router.query.id);
  //cria a funçao com requisiçao para api
  const getUser = async () => {
    //retornar erro quando nao tiver o id do usuario
    if (id === undefined) {
      setMessage("Erro: Usuário não encontrado!");
      return;
    }
    //realiza a requisiçao para api com axios para a rota recuperar os usuarios
    await axios
      .get("http://localhost:8080/users/" + id)
      //acessa o then quando a api retornar status 200
      .then((response) => {
        //atribuir o registro no state data
        setData(response.data.user);
      })
      //acessa o catch quando a api retornar erro
      .catch((err) => {
        //acessa o if quando a api retornar erro
        if (err.response) {
          //atribui a mensagem no state message
          setMessage(err.response.data.mensagem);
        } else {
          //atribui a mensagem no state message
          setMessage("erro, tente mais tarde");
        }
      });
  };

  //useEffect é usado para lidar com efeitos colaterais em um computador por exemplo, atualizar o estado do componente, fazer a  APIs, manipular eventos entre outros
  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <>
      <Head>
        <title>CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link href={"/"}>
                    <button className="btn btn-primary mx-1" type="button">
                      Listar
                    </button>
                  </Link>

                  <Link href={`/editar/${data.id}`}>
                    <button className="btn btn-primary mx-1" type="button">
                      Editar
                    </button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <Form className="d-flex align-items-center d-flex flex-wrap p-2 ">
              <h2>Detalhes do Usuário</h2>
            </Form>
          </div>
          {message ? <p>{message}</p> : ""}

          <Form
            onSubmit={getUser}
            className="d-flex align-items-center; d-flex flex-wrap p-2 "
          >
            <Form.Label className="border bg-#582900 mx-1">
              ID: {data.id}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              Nome: {data.name}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              E-Mail: {data.email}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              Celular: {data.celular}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              Data de Nascimento: {data.nascimento}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              Endereço: {data.endereco}
            </Form.Label>
            <br />
            <Form.Label className="border bg-#582900 mx-1">
              Sexo: {data.sexo}
            </Form.Label>
            <br />
          </Form>
        </div>
      </main>
    </>
  );
}
