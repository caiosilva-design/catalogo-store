"use client";

import { useEffect, useState } from "react";

type Variacao = {
  tamanho: string;
  disponivel: boolean;
};

type Produto = {
  id: number;
  nome: string;
  imagem: string;
  variacoes?: Variacao[];
};

const TAMANHOS = ["P", "M", "G", "GG", "XG"];

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://cs-store-api-production.up.railway.app/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      });
  }, []);

  const formatarTamanhos = (variacoes?: Variacao[]) => {
    const tamanhos =
      variacoes?.filter((v) => v.disponivel).map((v) => v.tamanho) || [];

    if (tamanhos.length === 0) return "Sem estoque";
    if (tamanhos.length === 1) return tamanhos[0];

    return `${tamanhos.slice(0, -1).join(", ")} e ${
      tamanhos[tamanhos.length - 1]
    }`;
  };

  const produtosFiltrados = produtos.filter((p) => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());

    const matchTamanho =
      !tamanhoSelecionado ||
      p.variacoes?.some(
        (v) => v.disponivel && v.tamanho === tamanhoSelecionado
      );

    return matchBusca && matchTamanho;
  });

  return (
    <>
      <style>{`
        body {
          background: #020617;
          font-family: sans-serif;
          color: white;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .search {
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          border: 1px solid #1e293b;
          background: #020617;
          color: white;
          margin-bottom: 20px;
        }

        .filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-btn {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid #1e293b;
          cursor: pointer;
        }

        .active {
          background: #2563eb;
          border-color: #2563eb;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 700px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .card {
          background: #0f172a;
          border-radius: 12px;
          padding: 10px;
        }

        .img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 10px;
        }

        .name {
          margin-top: 10px;
          font-size: 14px;
        }

        .sizes {
          font-size: 12px;
          color: #60a5fa;
          margin-top: 5px;
        }

        .btn {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: #2563eb;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Catálogo</h1>

        <input
          className="search"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {/* 🔥 FILTRO TAMANHO */}
        <div className="filters">
          <button
            onClick={() => setTamanhoSelecionado(null)}
            className={`filter-btn ${tamanhoSelecionado === null ? "active" : ""}`}
          >
            Todos
          </button>

          {TAMANHOS.map((t) => (
            <button
              key={t}
              onClick={() => setTamanhoSelecionado(t)}
              className={`filter-btn ${
                tamanhoSelecionado === t ? "active" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && <p>Carregando...</p>}

        <div className="grid">
          {produtosFiltrados.map((p) => (
            <div key={p.id} className="card">
              <img src={p.imagem} className="img" />

              <p className="name">{p.nome}</p>

              <p className="sizes">
                {formatarTamanhos(p.variacoes)}
              </p>

              <button className="btn">Ver produto</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
