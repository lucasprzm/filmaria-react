import "./filme.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

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
        <button onClick={() => {}}>Salvar</button>
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
