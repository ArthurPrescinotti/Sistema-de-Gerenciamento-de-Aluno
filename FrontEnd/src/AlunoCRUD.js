import * as React from "react";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import "./AlunoStyle.css";
import { Tooltip } from "@mui/material";

function AlunoCRUD() {
  //Estado para armazena os alunos
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
  });
  //Estado para editar aluno
  const [editando, setEditando] = useState(null);
  //Estado para gerenciar erro de requisição
  const [error, setError] = useState(false);
  //Estado para mostrar o carregamento
  const [loading, setLoading] = useState(true);
  //Erro no textfield
  const [errors, setErrors] = useState({
    nome: false,
    telefone: false,
    email: false,
    endereco: false,
  });
  //Paginacao
  const [quantidadePaginas, setquantidadePaginas] = useState(1);
  const [linhasPorPagina] = useState(9);

  //Requisicao da API
  const fetchAluno = async () => {
    try {
      //fazendo a requisicao api
      const response = await fetch(
        "http://localhost:8090/projeto/api/v1/alunoConsulta"
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar os alunos");
      }

      //convertendo a resposta para JSON
      const data = await response.json();

      //Atualizando o estado com os dados dos alunos
      setAlunos(data);
    } catch (error) {
      //Se ocorrer algum erro, armazena o erro no estado
      setError(error.message);
    } finally {
      //Apos a requisicao (independente de sucesso ou erro), definimos o loading como false
      setLoading(false);
    }
  };

  //chamndo a funcao da API quando o componente for montado
  useEffect(() => {
    //chamando a funcao que faz requisicao
    fetchAluno();
  }, []); // O array vazio [] significa que o useEffect será chamado apenas uma vez, quando o componente for montado

  //Funcao de criacao ou edicao de aluno
  const handleSubmit = async () => {
    if (!aluno.nome || !aluno.telefone || !aluno.email || !aluno.endereco) {
      const NovoErrors = {
        nome: !aluno.nome,
        telefone: !aluno.telefone,
        email: !aluno.email,
        endereco: !aluno.endereco,
      };

      alert("Campo em vermelho não está preenchido Corretamente !!!");

      setErrors(NovoErrors);
      return;
    } else {
      alert("Aluno cadastrado com Sucesso !!!");
    }

    const novoAluno = aluno;
    const method = editando ? "PUT" : "POST";
    const url = `http://localhost:8090/projeto/api/v1/alunoCadastro`;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAluno),
    });

    if (response.ok) {
      fetchAluno();
      setAlunos(
        editando
          ? alunos.map((a) => (a.id === editando ? novoAluno : a))
          : [...alunos, novoAluno]
      );
      setAluno({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
      });
      setEditando(null);
    }
  };

  //Funcao de busca o aluno
  const handleEdit = (estudante) => {
    setAluno(estudante);
    setEditando(estudante.id);
  };

  //Funcao de deletar o aluno
  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:8090/projeto/api/v1/alunoCadastro/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      fetchAluno();
      setAlunos(alunos.filter((a) => a.id !== id));
    }
  };

  const indexUltimaLinha = quantidadePaginas * linhasPorPagina;
  const indexPrimeiraLinha = indexUltimaLinha - linhasPorPagina;
  const alunosPaginaAtual = alunos.slice(indexPrimeiraLinha, indexUltimaLinha);

  const handleProximaPagina = () => {
    if (quantidadePaginas < Math.ceil(alunos.length / linhasPorPagina)) {
      setquantidadePaginas(quantidadePaginas + 1);
    }
  };

  const handleAnteriorPagina = () => {
    if (quantidadePaginas > 1) {
      setquantidadePaginas(quantidadePaginas - 1);
    }
  };

  return (
    <div className="container">
      <div>
        {/*Titulo*/}
        <h1 className="textboxTitle">👨🏻‍🎓 Gerenciamento de Alunos 👩🏻‍🎓</h1>

        {/*Formulario*/}
        <div className="textbox">
          <div className="textbox">
            <TextField
              className="textbox"
              label="Nome do Aluno"
              variant="outlined"
              value={aluno.nome}
              onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
              maxLength={50}
              error={errors.nome}
              helperText={errors.nome && "Nome é obrigatório"}
            ></TextField>
            <TextField
              className="textbox"
              label="Telefone do Aluno"
              variant="outlined"
              value={aluno.telefone}
              onChange={(e) => setAluno({ ...aluno, telefone: e.target.value })}
              maxLength={15}
              error={errors.telefone}
              helperText={errors.telefone && "Telefone é obrigatório"}
            ></TextField>
            <TextField
              className="textbox"
              label="Email do Aluno"
              variant="outlined"
              value={aluno.email}
              onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
              maxLength={100}
              error={errors.email}
              helperText={errors.email && "Email é obrigatório"}
            ></TextField>
            <TextField
              className="textbox"
              label="Endereço do Aluno"
              variant="outlined"
              value={aluno.endereco}
              onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
              maxLength={200}
              error={errors.endereco}
              helperText={errors.endereco && "Endereço é obrigatório"}
            ></TextField>

            <Tooltip
              title={editando ? "Atualizar Aluno" : "Adicionar Aluno"}
              placement="top"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -12],
                      },
                    },
                  ],
                },
              }}
            >
              <button onClick={handleSubmit} className="buttonAdicionar">
                {editando ? "Atualizar Aluno" : "Adicionar Aluno"}
              </button>
            </Tooltip>
          </div>
        </div>

        {/*Tabela*/}
        {!loading && !error && (
          <table className="table">
            <thead className="textbox">
              <tr>
                <th className="textboxMostra">Nome</th>
                <th className="textboxMostra">Telefone</th>
                <th className="textboxMostra">Email</th>
                <th className="textboxMostra">Endereço</th>
                <th className="textboxMostra">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosPaginaAtual.map((estudante) => (
                <tr key={estudante.id} className="textboxMostra">
                  <Tooltip
                    title={estudante.nome}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -40],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <td className="textboxMostra">{estudante.nome}</td>
                  </Tooltip>
                  <Tooltip
                    title={estudante.telefone}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -40],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <td className="textboxMostra">{estudante.telefone}</td>
                  </Tooltip>

                  <Tooltip
                    title={estudante.email}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -40],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <td className="textboxMostra">{estudante.email}</td>
                  </Tooltip>

                  <Tooltip
                    title={estudante.endereco}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -40],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <td className="textboxMostra">{estudante.endereco}</td>
                  </Tooltip>

                  <td className="textboxMostra">
                    <Tooltip
                      title="Editar"
                      placement="top"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -12],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <button
                        onClick={() => handleEdit(estudante)}
                        className="button"
                      >
                        <img src="./Edit.png" className="image" alt=""></img>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Deletar"
                      placement="top"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -12],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <button
                        onClick={() => handleDelete(estudante.id)}
                        className="button"
                      >
                        <img src="./Delete.png" className="image" alt=""></img>
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Controle de Pagina */}
        <Tooltip
          title="Anterior"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -12],
                  },
                },
              ],
            },
          }}
        >
          <button
            className="buttonPaginacao"
            onClick={handleAnteriorPagina}
            disabled={quantidadePaginas === 1}
          >
            <img src="./seta-esquerda.png" className="image" alt=""></img>
          </button>
        </Tooltip>

        <span className="textPaginacao">{`Página ${quantidadePaginas} de ${Math.ceil(
          alunos.length / linhasPorPagina
        )}`}</span>

        <Tooltip
          title="Próximo"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0],
                  },
                },
              ],
            },
          }}
        >
          {" "}
          <button
            className="buttonPaginacao"
            onClick={handleProximaPagina}
            disabled={
              quantidadePaginas === Math.ceil(alunos.length / linhasPorPagina)
            }
          >
            <img src="./seta-direita.png" className="image" alt=""></img>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default AlunoCRUD;
