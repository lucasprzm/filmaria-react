import "./filme.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get(`/r-api/?api=filmes/${id}`);

      if (response.data.length === 0) {
        // Tentou acessar com um ID que não existe, navego ele para home!
        navigate("/");
      }

      setFilme(response.data);
      setLoading(false);
    }
    loadFilme();
  }, [navigate, id]);
  function salvaFilme() {
    const minhaLista = localStorage.getItem("filmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    // Se tiver algum filme salvo com o mesmo id precisa ignorar...
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );
    if (hasFilme) {
      toast.info("Você já possui esse filme salvo!");
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando seu filme...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      <p> {filme.sinopse} </p>
      <div className="botoes">
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}
            rel="noreferrer"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
