import { useEffect, useState } from "react";
import "./AlunoStyle.css";

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
      alert("Todos os campos devem ser preenchidos!");
      return;
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

  return (
    <div className="container">
      <div>
        {/*Titulo*/}
        <h1 className="textboxTitle">👨🏻‍🎓 Gerenciamento de Alunos 👩🏻‍🎓</h1>

        {/*Formulario*/}
        <div className="textbox">
          <div className="textbox">
            <input
              className="textbox"
              placeholder="Nome do Aluno"
              value={aluno.nome}
              onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
              maxLength={50}
            ></input>
            <input
              className="textbox"
              placeholder="Telefone do Aluno"
              value={aluno.telefone}
              onChange={(e) => setAluno({ ...aluno, telefone: e.target.value })}
              maxLength={15}
            ></input>
            <input
              className="textbox"
              placeholder="Email do Aluno"
              value={aluno.email}
              onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
              maxLength={100}
            ></input>
            <input
              className="textbox"
              placeholder="Endereço do Aluno"
              value={aluno.endereco}
              onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
              maxLength={200}
            ></input>
            <button onClick={handleSubmit} className="buttonAdicionar">
              {editando ? "Atualizar Aluno" : "Adicionar Aluno"}
            </button>
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
              {alunos.map((estudante) => (
                <tr key={estudante.id} className="textboxMostra">
                  <td className="textboxMostra">{estudante.nome}</td>
                  <td className="textboxMostra">{estudante.telefone}</td>
                  <td className="textboxMostra">{estudante.email}</td>
                  <td className="textboxMostra">{estudante.endereco}</td>
                  <td className="textboxMostra">
                    <button
                      onClick={() => handleEdit(estudante)}
                      className="button"
                    >
                      <img src="./Edit.png" className="image" alt=""></img>
                    </button>
                    <button
                      onClick={() => handleDelete(estudante.id)}
                      className="button"
                    >
                      <img src="./Delete.png" className="image" alt=""></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AlunoCRUD;
