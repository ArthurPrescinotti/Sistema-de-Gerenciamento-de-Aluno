import { useEffect, useState } from "react";

export default function AlunoList() {
  //Estado para armazenar os usuarios
  const [alunos, setAlunos] = useState([]);
  //Estado para gerenciar erro de requisição
  const [error, setError] = useState(false);
  //Estado para mostrar o carregamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //funcao para buscar os dados da api
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

    //chamando a funcao que faz requisicao
    fetchAluno();
  }, []); //o array vazio [] significa que o useEffect sera chamado apenas um vaz, quando o componente for montado

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Alunos</h1>

      {/*Exibicao de erro caso haja*/}
      {error && <p className="text-red-500">Erro: {error}</p>}

      {/*Exibicao de carregamento enquanto os dados nao sao carregados*/}
      {loading && <p>Carregando...</p>}

      {/*Exibicao dos dados apos o carregamento*/}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{aluno.nome}</td>
                <td className="p-3">{aluno.telefone}</td>
                <td className="p-3">{aluno.email}</td>
                <td className="p-3">{aluno.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
